module.exports={
    view_all_students: (req, res, next)=>{
        const dbInstance = req.app.get('db');
        console.log(req.body)
        dbInstance.view_all_students()
        .then( (student) => res.status(200).send(student) )
        .catch( (e) =>{console.log(e); res.status(500).send() });
    }
}