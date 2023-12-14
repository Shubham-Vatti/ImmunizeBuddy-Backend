const childmodel = require('../Models/childmodel');
const cloudinary = require('cloudinary').v2
// import {v2 as cloudinary} from 'cloudinary';
const mongoose = require('mongoose');
cloudinary.config({
    cloud_name: 'dl9ezkm0g',
    api_key: '418237271262539',
    api_secret: '9H5iRm23AyYRFNPiXDCqxCGz_ng'
});


module.exports.child_data_update = (req, res) => {
    try {
        const files = req.files.child_profile_pic;
        console.log(files)
        const data = req.UserData;
        cloudinary.uploader.upload(files.tempFilePath, (err, result) => {
            if (err) {
                res.status(420).json({
                    status: 420,
                    type: err.message
                })
            }
            else if (result) {

                childmodel.findOneAndUpdate({ user_id: data.sub }, {
                    $set: {
                        // user_id:data.sub,
                        child_profile_pic: result.secure_url,
                        child_name: req.body.child_name,
                        child_DOB: req.body.child_DOB,
                        child_TOB: req.body.child_TOB,
                        child_gender: req.body.child_gender,
                        child_weight: req.body.child_weight,
                        birth_place: req.body.birth_place
                    }
                })
                    .then((resuw) => {

                        // if(result.length>0)
                        // {
                        res.status(200).json({
                            status: 200,
                            type: "successfully Updated child data",
                            updated_child_data: resuw
                        })
                        // }
                    })
                    .catch((err) => {

                        console.log(err)
                        res.status(500).json({
                            status: 500,
                            type: "child updation failed"
                        })
                    })


            }
        })

    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            status: 500,
            type: "child updation failed"
        })

    }
}

module.exports.child_registration = (req, res) => {
    try {
        const files = req.files.child_profile_pic;
        console.log(files)
        const data = req.UserData;
        childmodel.find({ user_id: data.sub })
            .then((result) => {
                if (result.length == 0) {
                    cloudinary.uploader.upload(files.tempFilePath, (err, result) => {
                        if (err) {
                            res.status(420).json({
                                status: 420,
                                type: err.message
                            })
                        }
                        else if (result) {
                            // const data=req.UserData;
                            const child_form = new childmodel({
                                user_id: data.sub,
                                child_profile_pic: result.secure_url,
                                child_name: req.body.child_name,
                                child_DOB: req.body.child_DOB,
                                child_TOB: req.body.child_TOB,
                                child_gender: req.body.child_gender,
                                child_weight: req.body.child_weight,
                                birth_place: req.body.birth_place
                            });
                            // console.log(child_form)
                            child_form.save().then((result) => {

                                res.status(200).json({
                                    status: 200,
                                    type: "child registration successfully",
                                    child_data: result
                                })
                            })
                                .catch((err) => {
                                    console.log(err)
                                    res.status(500).json({
                                        status: 500,
                                        type: "child registration failed"
                                    })
                                })

                        }
                    })

                } else {
                    res.status(400).json({
                        status: 400,
                        type: "Already child registered"
                    })
                }
            })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            status: 500,
            type: "child registration failed"
        })
    }
}


module.exports.child_details = (req, res) => {
    try {
        const data = req.UserData;
        childmodel.find({ user_id: data.sub })
            .then((result) => {
                if (result.length > 0) {
                    res.status(200).json({
                        status: 200,
                        type: "successfully get child data",
                        child_data: result[0]
                    })
                }
                else {
                    res.status(500).json({
                        status: 500,
                        type: "child detail not found"
                    })
                }
            })
    }
    catch (err) {
        res.status(500).json({
            status: 500,
            type: "cannot get child data"
        })
    }
}

module.exports.get_all_children_data = (req, res) => {
    try {
        childmodel.find()
            .then((result) => {
                res.status(200).json({
                    status: 200,
                    type: "successfully get child data",
                    count: result.length,
                    child_list: result
                })
            })
            .catch((error) => {
                res.status(400).json({
                    status: 400,
                    type: "Error while getting child data",
                    Error: error
                })
            })
    }
    catch (err) {
        res.status(500).json({
            status: 500,
            type: "Error while getting child data"
        })
    }
}
