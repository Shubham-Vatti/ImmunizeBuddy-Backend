const express = require('express');
const babyvaccineapprovalroute = express.Router();
const Babyvaccineapproval = require('../Models/Babyvaccineapproval')
const mongoose = require('mongoose');
const requireauth = require('../Middleware/auth-middleware');
const cloudinary = require('cloudinary').v2
// import {v2 as cloudinary} from 'cloudinary';

cloudinary.config({
    cloud_name: 'dl9ezkm0g',
    api_key: '418237271262539',
    api_secret: '9H5iRm23AyYRFNPiXDCqxCGz_ng'
});


babyvaccineapprovalroute.post('/Baby-Vaccines-Approval-Data', (req, res) => {
    try {
        const Babydata = new Babyvaccineapproval({
            _id: new mongoose.Types.ObjectId(),
            Vaccine_name: req.body.Vaccine_name,
            Vaccine_Details: req.body.Vaccine_Details,
            Assigned_user: []
            // Vaccine_details:"BCG vaccine has a weakened form of the bacteria that cause tuberculosis (TB).The vaccine doesn't cause TB, but helps your baby develop protection (immunity) against the disease.The BCG vaccination is particularly effective in protecting babies and young children against the more rare severe forms of TB such as TB meningitis (swelling of the lining of the brain).",

        });
        Babydata.save()
            .then((resu) => {
                res.status(200).json({
                    msg: "sucessfully saved",
                    data: resu
                })
            })
        // console.log(Babydata)
    }
    catch (err) {
        res.status(400).json({
            status: 400,
            type: "Failed to add Vaccine Aprroval data",
            Error: err.message
        })
    }
})

babyvaccineapprovalroute.get('/get-approval-data', (req, res) => {
    // console.log()
    Babyvaccineapproval.find()
        .then((result) => {
            res.status(200).json({
                status: 200,
                count: result.length,
                type: "Sucessfully Data gets",
                Vaccine_List: result
            })
        })
})


babyvaccineapprovalroute.post('/Update-Aprroval-rejection-data', async (req, res) => {
    const id = req.query.id;
    // const data = req.UserData;
    const files = req.files.pic;
    console.log(files)
    const userid=req.query.uid
    // const data = req.UserData;
    // console.log('--', id, '--', data, '--=--=--', data.sub)
    const vData = await Babyvaccineapproval.findById(id)
    {vData.Assigned_user.length!=0?vData.Assigned_user.map(async (ele) => {
    if (ele.userId == userid) {
        res.status(201).json({
            type: "already assigned"
        });
    }
    else {
    cloudinary.uploader.upload(files.tempFilePath, async (err, result) => {
        if (err) {
            res.status(420).json({
                status: 420,
                type: err.message
            })
        }
        else if (result) {
            vData.Assigned_user.push({
                userId: userid,
                url: result.secure_url
            })
            await vData.save()
            res.status(201).json(vData);
        }
        })
        }
    }):cloudinary.uploader.upload(files.tempFilePath, async (err, result) => {
        if (err) {
            res.status(420).json({
                status: 420,
                type: err.message
            })
        }
        else if (result) {
            vData.Assigned_user.push({
                userId: userid,
                url: result.secure_url
            })
            await vData.save()
            res.status(201).json(vData);
        }
        })}
})


module.exports = babyvaccineapprovalroute;