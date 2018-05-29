module.exports={
    create_student: (req, res, next) => {
        const dbInstance = req.app.get('db');
        const { student_school_id, student_first, student_last, 
            student_email, student_phone, student_address, 
            student_city, student_state, student_zip } = req.body;
        // console.log('create')
        // console.log(req.body)
        dbInstance.add_student([student_school_id, student_first, student_last, 
            student_email, student_phone, student_address, 
            student_city, student_state, student_zip])
            .then(() => res.status(200).send())
            .catch((e) => { console.log(e); res.sendStatus(500)});
    },
    view_all_students: (req, res, next)=>{
        const dbInstance = req.app.get('db');
        console.log(req.body)
        dbInstance.view_all_students()
        .then( (students) => res.status(200).send(students) )
        .catch( (e) =>{console.log(e); res.status(500).send() });
    },
    view_student: (req, res, next) => {
        const dbInstance = req.app.get('db');
        const { params } = req;
        // console.log(req.body)
        dbInstance.view_student([params.id])
            .then((student) => res.status(200).send(student))
            .catch((e) => { console.log(e); res.sendStatus(500)});
    },
    update_student: (req, res, next) => {
        const dbInstance = req.app.get('db');
        const { student_school_id, student_first, student_last, 
            student_email, student_phone, student_address, 
            student_city, student_state, student_zip } = req.body;
        const { params } = req;
        // console.log(req.body)
        dbInstance.update_inst([student_school_id, student_first, student_last, 
            student_email, student_phone, student_address, 
            student_city, student_state, student_zip, params.id])
            .then(() => res.status(200).send())
            .catch((e) => { console.log(e); res.sendStatus(500)});
    },
    delete_student: (req, res, next) => {
        const dbInstance = req.app.get('db');
        const { params } = req;
        dbInstance.delete_student([params.id])
            .then(() => {
                dbInstance.view_all_students().then(students=>{
                    res.status(200).send(students)
                })
            }).catch((e) => { console.log(e); res.sendStatus(500)});
    }
}