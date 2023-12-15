const mongoose = require('mongoose');
const parentsmodel = require('../Models/parentsmodel');
const User = require('../Models/User');
// const BSON =require('bson')
const Objectid=require('mongodb').ObjectId
const cloudinary=require('cloudinary').v2
// import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: 'dl9ezkm0g', 
  api_key: '418237271262539', 
  api_secret: '9H5iRm23AyYRFNPiXDCqxCGz_ng' 
});


const HandleError = (err) => {
    if (err.message.includes('parentsmodel validation failed')) {
        Object.values(err.errors).forEach((errors) => {
            console.log('--properties--', errors)
        })
    }
    // console.log(err.message,err.code);
}

module.exports.parents_registration = (req, res) => {
    try {
        const files=req.files.profile_pic;
        console.log(files)
        const data=req.UserData;
        console.log('--user id--',typeof(data.sub))
        parentsmodel.find({user_id:data.sub}).then((resul)=>{
            console.log('--result--',resul)
            if(!resul.length>0)
            {
                cloudinary.uploader.upload(files.tempFilePath,(err,result)=>{
                  if(err)
                  {
                    res.status(420).json({
                      status:420,
                      type:err.message
                    })
                  }
                  else if(result)
                  {
                    const parents_form = new parentsmodel({
                        _id: new mongoose.Types.ObjectId,
                        profile_pic:result.secure_url,
                        user_id: data.sub,
                        your_gender: req.body.your_gender,
                        your_name: req.body.your_name,
                        partner_name: req.body.partner_name,
                        address: req.body.address,
                        mobile_no: req.body.mobile_no,
                        email_id: req.body.email_id
                    });
                    parents_form.save()
                        .then((result) => {
                            res.status(200).json({
                                status: 200,
                                type: "Parents data added successfully",
                                parent_data: result
                            })
                        })
                        .catch((err) => {
                            // HandleError(err)
                            res.status(500).json({
                                status: 500,
                                Error: err.message,
                                type: "error while adding Parents data in registration"
                            })
                        })
                  }})

            }
            else{
                res.status(500).json({
                    status: 500,
                    // Error: err,
                    type: "Already Parents data added"
                // })
            })
            }
        })
        .catch((err)=>{
            console.log(err)
            res.status(500).json({
                status: 500,
                Error: err.message,
                type: "error while adding Parents data middle"
            })
        })
    }
    catch (Err) {
        console.log(Err)
        res.status(500).json({
            status: 500,
            Error: Err.message,
            files,
            type: "error while adding Parents data outside"
        })
    }
}


module.exports.parents_details_update=(req,res)=>{
    try{
        const files=req.files.profile_pic;
        console.log(files)
        cloudinary.uploader.upload(files.tempFilePath,(err,result)=>{
          if(err)
          {
            res.status(420).json({
              status:420,
              type:err.message
            })
          }
          else if(result)
          {
            const data=req.UserData;
            console.log('--user id--',data.sub)
            parentsmodel.findOneAndUpdate({user_id:data.sub},{
                $set:{
                    // _id: new mongoose.Types.ObjectId,
                    profile_pic:result.secure_url,
                    user_id: data.sub,
                    your_gender: req.body.your_gender,
                    your_name: req.body.your_name,
                    partner_name: req.body.partner_name,
                    address: req.body.address,
                    mobile_no: req.body.mobile_no,
                    email_id: req.body.email_id
                }
            })
            .then((result)=>{
                res.status(200).json({
                    status:200,
                    type:"Successfully updated parents details",
                    updated_details:result
                })
            })
            .catch((err)=>{
                console.log(err)
                res.status(500).json({
                    status: 500,
                    type: "error while updating Parents data"
                })
            })
          }})
    }
    catch(err)
    {
        console.log(err)
        res.status(500).json({
            status: 500,
            type: "error while updating Parents data"
        })

    }
}


module.exports.parents_data = (req, res) => {
    const data=req.UserData;
    console.log('--user id--',data.sub)
    parentsmodel.find({user_id:data.sub})
        .then((Result) => {
            if(Result.length>=1)
            {
            res.status(200).json({
                status:200,
                type:"successfully get parents data",
                parent_data: Result[0]
            })
        }
        else{
            res.status(400).json({
              status:400,
              type:"Parens data not found"
            })

        }
        })
        .catch((rere) => {
            console.log(rere)
            res.status(200).json({
                msg: "Error processing parents data"
            })
        })
}


module.exports.get_all_parents_data=(req, res) => {
    try{
        parentsmodel.find()
        .then((result)=>{
            res.status(200).json({
                status:200,
                type:"successfully get parents data",
                count:result.length,
                parents_list:result
            })
        })
    }
    catch(err)
    {
        res.status(500).json({
            status:500,
            type:"Error while getting parents data"
        })
    }
}
