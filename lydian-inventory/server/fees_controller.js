module.exports = {
    fee_view_student: (req, res, next) => {
        const dbInstance = req.app.get('db');
        const { params } = req;
        // console.log(req.body)
        dbInstance.fee_view_student([params.id])
            .then((student) => res.status(200).send(student))
            .catch((e) => { console.log(e); res.sendStatus(500) });
    },
    fee_student_list: (req, res, next) => {
        const dbInstance = req.app.get('db');
        const {params} = req;
        // console.log(req.body)
        // console.log(params.id)
        dbInstance.fee_student_list([params.id])
            .then((assignments) => res.status(200).send(assignments))
            .catch((e) => { console.log(e); res.status(500).send() });
    },
    update_payment: (req, res, next) => {
        const dbInstance = req.app.get('db');
        const { params } = req;
        console.log(params.id)
        dbInstance.update_payment([params.id])
        .then(() => res.status(200).send())
        .catch((e) => { console.log(e); res.status(500).send("Couldn't update payment date in db")});
    }
}