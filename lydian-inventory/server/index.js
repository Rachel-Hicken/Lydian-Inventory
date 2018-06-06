require('dotenv').config()
const express = require('express'),
      bodyParser = require('body-parser'),
      massive = require('massive'),
      session = require('express-session'),
      passport = require('passport'),
      Auth0Strategy = require('passport-auth0'),
      nodemailer = require('nodemailer'),
      stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const ic = require('./instrument_controller'),
      sc = require('./student_controller');



const {
    SERVER_PORT,
    SESSION_SECRET,
    DOMAIN,
    CLIENT_ID,
    CLIENT_SECRET,
    CALLBACK_URL,
    CONNECTION_STRING,
    TRANSPORT_EMAIL,
    TRANSPORT_PASSWORD
}= process.env;

const app = express();



//massive
massive(CONNECTION_STRING).then((db)=>{
    console.log('connected to db');
    app.set('db',db);
})

app.use(bodyParser.json());
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

//sessions
app.use(passport.initialize());

app.use(passport.session());
passport.use(new Auth0Strategy({
    domain: DOMAIN,
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: CALLBACK_URL,
    scope: 'openid profile'
},(accessToken, refreshToken, extraParams, profile, done)=>{
    let db = app.get('db');
    let {displayName, picture, id}=profile;
    db.find_user([id]).then((foundUser)=>{
        if (foundUser[0]){
            done(null, foundUser[0].id)
        }else{
            db.create_user([displayName, picture, id]).then((user)=>{
                done(null, user[0].id)
            })
        }
    })
}))

passport.serializeUser((id, done)=>{
    done(null, id);
})

passport.deserializeUser((id, done)=>{
    app.get('db').find_session_user([id]).then((user)=>{
        done(null, user[0])
    })
})

//Endpoints for login/authentication
app.get('/login', passport.authenticate('auth0'));
app.get('/auth/callback', passport.authenticate('auth0',{
    successRedirect: 'http://localhost:3000/#/private'
}))
app.get('/auth/me', function(req,res){
    if (req.user){
        res.status(200).send(req.user);
    }else{
        res.status(401).send('Denied!')
    }
})

//ENDPOINTS FOR INSTRUMENTS
//create a new instrument
app.post('/instrument/add', ic.create_inst);
//assign
app.put('/instrument/assign/:id', ic.assign_inst);
//update instrument
app.put('/instrument/update/:id', ic.update_inst);
//delete an instrument
app.delete('/instrument/delete/:id', ic.delete_inst);
//view all instruments
app.get('/instruments/view', ic.view_all_inst);
//view one instrument
app.get('/instrument/view/:id', ic.view_inst);
//view checked out instruments
app.get('/instruments/out', ic.out_inst);
//view available instruments
app.get('/instruments/available', ic.available_inst);
//retur inst
app.put('/instrument/return', ic.return_inst);

//ENDPOINTS FOR STUDENTS
//create new student
app.post('/student/add', sc.create_student);
//update student
app.put('/student/update/:id', sc.update_student);
//delete student
app.delete('/student/delete/:id', sc.delete_student);
//view all students
app.get('/students/view', sc.view_all_students);
//view one student
app.get('/student/view/:id', sc.view_student);

//endpoint for email
app.post('/email', sc.send_email);

/////////////////////////Stripe//////////////////////////////
app.post('/api/payment', function(req, res, next){
    // convert amount to pennies
    const amountArray = req.body.amount.toString().split('');
    const pennies = [];
    for (var i = 0; i < amountArray.length; i++) {
      if(amountArray[i] === ".") {
        if (typeof amountArray[i + 1] === "string") {
          pennies.push(amountArray[i + 1]);
        } else {
          pennies.push("0");
        }
        if (typeof amountArray[i + 2] === "string") {
          pennies.push(amountArray[i + 2]);
        } else {
          pennies.push("0");
        }
          break;
      } else {
          pennies.push(amountArray[i])
      }
    }
    const convertedAmt = parseInt(pennies.join(''));
  
    const charge = stripe.charges.create({
        amount: convertedAmt, // amount in cents, again
        currency: 'usd',
        source: req.body.token.id,
        description: 'Test charge from react app'
    }, function(err, charge) {
        if (err) return res.sendStatus(500)
        return res.sendStatus(200);
        // if (err && err.type === 'StripeCardError') {
        //   // The card has been declined
        // }
    });
  });
  //////////////////////END STRIPE////////////////////////////



app.listen(SERVER_PORT, ()=>{
    console.log(`Listening to port ${SERVER_PORT}`)})
