module.exports = {
    create_inst: (req, res, next) => {
        const dbInstance = req.app.get('db');
        const { inst_school_id, inst_type, serial_num,
            make, model, inst_year, purchase_price } = req.body;
        // console.log('create')
        // console.log(req.body)
        dbInstance.add_inst([inst_school_id, inst_type, serial_num,
            make, model, inst_year, purchase_price])
            .then(() => res.status(200).send())
            .catch((e) => { console.log(e); res.sendStatus(500)});
    },
    view_inst: (req, res, next) => {
        const dbInstance = req.app.get('db');
        const { params } = req;
        // console.log(req.body)
        dbInstance.view_inst([params.id])
            .then((inst) => res.status(200).send(inst))
            .catch((e) => { console.log(e); res.sendStatus(500)});
    },
    view_all_inst: (req, res, next) => {
        const dbInstance = req.app.get('db');
        // console.log(req.body)
        dbInstance.view_all_inst()
            .then((insts) => res.status(200).send(insts))
            .catch((e) => { console.log(e); res.sendStatus(500)});
    },
    update_inst: (req, res, next) => {
        const dbInstance = req.app.get('db');
        const { inst_school_id, inst_type, serial_num,
            make, model, inst_year, purchase_price } = req.body;
        const { params } = req;
        // console.log(req.body)
        dbInstance.update_inst([inst_school_id, inst_type, serial_num,
            make, model, inst_year, purchase_price, params.id])
            .then(() => res.status(200).send())
            .catch((e) => { console.log(e); res.sendStatus(500)});
    },
    delete_inst: (req, res, next) => {
        const dbInstance = req.app.get('db');
        const { params } = req;
        dbInstance.delete_inst([params.id])
            .then(() => {
                dbInstance.view_all_inst().then(instruments=>{
                    res.status(200).send(instruments)
                })
            }).catch((e) => { console.log(e); res.sendStatus(500)});
    },
    assign_inst: (req, res, next) => {
        const dbInstance = req.app.get('db');
        const {student_id, checkout_date, due_date, return_date} = req.body
        const {params} = req;
        dbInstance.assign_inst([params.id, student_id, checkout_date, due_date, return_date])
        .then(() => res.status(200).send())
        .catch((e) => { console.log(e); res.sendStatus(500)});
    }
};