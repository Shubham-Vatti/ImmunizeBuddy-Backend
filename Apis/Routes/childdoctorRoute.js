const express = require('express');
const childdoctorroute = express.Router();
const childdoctormodel=require('../Models/childdoctormodel');
const mongoose = require('mongoose');
const cloudinary=require('cloudinary').v2
// import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: 'dl9ezkm0g', 
  api_key: '418237271262539', 
  api_secret: '9H5iRm23AyYRFNPiXDCqxCGz_ng' 
});


// const requireauth = require('../Middleware/auth-middleware');
// const childcontroller=require('../Controllers/childcontroller')
// ChildRouter.post('/Register',requireauth,childcontroller.child_registration)

childdoctorroute.post('/doctor-registration',(req,res)=>{
    const files=req.files.photos;
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
        const childoctordata=new childdoctormodel({
            _id:new mongoose.Types.ObjectId(),
            doctor_name:req.body.name,
            doctor_bio:req.body.bio,
            doctor_address:req.body.address,
            doctor_fees:req.body.fees,
            doctor_gender:req.body.gender,
            doctor_mobileno:req.body.mobileno,
            doctor_specialist:req.body.specialist,
            doctor_pic:result.secure_url,
            country_code:req.body.country_code,
            doctor_city:req.body.city,
            doctor_state:req.body.state,
            dr_experience:req.body.experience,
            dr_rating:req.body.rating,
            patient_checked:req.body.checked
        })
        childoctordata.save().then((resul)=>{
          res.status(200).json({
            status:200,
            type:"Sucessfully added child doctor",
            doctor_data:resul
          })
        }).catch((eror)=>{
          res.status(400).json({
            status:400,
            type:"Failed to add child doctor",
            Error:eror.message
          })
        })
        // console.log()
      }
        // console.log(result,err)
    })
})




childdoctorroute.get('/doctor-details',(req,res)=>{
  childdoctormodel.find().then((result)=>{
    res.status(200).json({
      status:200,
      count:result.length,
      type:"Sucessfully get doctors list",
      doctor_data:result
    })
  })
  .catch((err)=>{
    res.status(400).json({
      status:400,
      type:"Error while getting Doctor Lists",
      Error:err
    })
  })
})



childdoctorroute.get('/doctor-details/GetbyId/:id',(req,res)=>{
  childdoctormodel.find({_id:req.params.id}).then((result)=>{
    res.status(200).json({
      status:200,
      type:"Sucessfully get doctors data",
      doctor_data:result[0]
    })
  })
  .catch((err)=>{
    res.status(400).json({
      status:400,
      type:"Error while getting Doctor data",
      Error:err
    })
  })
})




module.exports=childdoctorroute;