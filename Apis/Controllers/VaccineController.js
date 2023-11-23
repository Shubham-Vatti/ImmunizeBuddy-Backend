const VaccineListmodel = require('../Models/VaccineListmodel');
const mongoose = require('mongoose');


module.exports.Vaccine_list_register = (req, res) => {
    const VaccineModal = new VaccineListmodel({
        _id: new mongoose.Types.ObjectId,
        vaccine_name: req.body.vaccine_name,
        vaccine_details: req.body.vaccine_details,
        vaccine_dose: req.body.vaccine_dose,
        vaccine_route: req.body.vaccine_route,
        vaccine_side_effect: req.body.vaccine_side_effect,
        vaccine_site: req.body.vaccine_site,
        when_to_give_vaccine: req.body.when_to_give_vaccine,
        data_to: req.body.data_to,
    });
    VaccineModal.save()
        .then((result) => {
            res.status(200).json({
                type: "added",
                vaccine_data: result
            })
        })
        .catch((err) => {
            res.status(500).json({
                type: "Error on adding",
                Error: err.message
            })
        })
}


module.exports.Vaccine_list_generatelst = (req, res) => {
    VaccineListmodel.find()
        .then((result) => {
            res.status(200).json({
                status: 200,
                count: result.length,
                type: "get vaccine data list!",
                vaccine_data: result
            })
        })
        .catch((err) => {
            res.status(500).json({
                status: 500,
                type: "Error on getting data list"
            })
        })
}


module.exports.Vaccine_list_generate_by_id = (req, res) => {
    VaccineListmodel.find({ _id: req.params.id })
        .then((result) => {
            if (result.length >= 1) {
                res.status(200).json({
                    status: 200,
                    type: "Vaccine detail!",
                    vaccine_data: result[0],
                })
            }
            else {
                res.status(400).json({
                    status: 400,
                    type: "Cant find Vaccine details"
                })
            }
        })
        .catch((error) => {
            res.status(400).json({
                status: 400,
                type: "Cant find Vaccine details"
            })
        })
}


module.exports.Vaccine_list_generate_data_belongs_to = (req, res) => {
    VaccineListmodel.find(req.query)
        .then((result) => {
            if (result.length >= 1) {
                res.status((200))
                    .json({
                        status: 200,
                        type: "Vaccine details!",
                        count: result.length,
                        vaccine_data: result
                    })
            }
            else {
                res.status((400))
                    .json({
                        status: 400,
                        type: "not found vaccine details!"
                    })

            }
        })
        .catch((erer) => {
            console.log(erer)
            res.status(500).json({
                msg: "not passed"
            })
        })
}