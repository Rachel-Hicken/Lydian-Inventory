require('dotenv').config()
const express = require('express'),
      bodyParser = require('body-parser'),
      massive = require('massive'),
      session = require('express-session'),
      passport = require('passport'),
      Auth0Strategy = require('passport-auth0');
const ic = require('./instrument_controller');



const {
    SERVER_PORT,
    SESSION_SECRET,
    DOMAIN,
    CLIENT_ID,
    CLIENT_SECRET,
    CALLBACK_URL,
    CONNECTION_STRING
}= process.env;

const app = express();


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

//Endpoints for instruments
//create a new instrument
app.post('/instrument/add', ic.create_inst);
//assign

//update instrument
app.put('/instrument/update/:id', ic.update_inst);
//delete an instrument
app.delete('/instrument/update/:id', ic.delete_inst);
//view all instruments
app.get('/instruments/view', ic.view_all_inst);
//view one instrument
app.get('/instrument/view/:id', ic.view_inst);

//Endpoints for students





app.listen(SERVER_PORT, ()=>{
    console.log(`Listening to port ${SERVER_PORT}`)})
