const express = require('express');
const blogrouter = express.Router();
const Blogs=require('../Models/Blogs')
const mongoose = require('mongoose');
const cloudinary=require('cloudinary').v2
cloudinary.config({ 
  cloud_name: 'dl9ezkm0g', 
  api_key: '418237271262539', 
  api_secret: '9H5iRm23AyYRFNPiXDCqxCGz_ng' 
});


blogrouter.post('/blogs',(req,res)=>{
    try{
        const files=req.files.blog_pic;
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
            const Blogdata=new Blogs({
                _id:new mongoose.Types.ObjectId(),
                blog_img:result.secure_url,
                blog_tittle:req.body.tittle,
                short_Description:req.body.short_description,
                blog_Description:req.body.description

            })
            Blogdata.save().then((resu)=>{
                res.status(200).json({
                    status:200,
                    type:"Successfully Added Blog",
                    Blog:resu
                })
            }).catch((errr)=>{
                res.status(400).json({
                  status:400,
                  type:"Failed to add blogs",
                  Error:errr
                })
            })
          }
        })
    }
    catch(err)
    {
        res.status(400).json({
          status:400,
          type:"Failed to add blogs",
          Error:err
        })
    }
})


blogrouter.get('/blogs-data',(req,res)=>{
    try{
        Blogs.find().then((result)=>{
            res.status(200).json({
                status:200,
                count:result.length,
                Blogs_Data:result
            })
        })
        .catch((error)=>{
            res.status(400).json({
              status:400,
              type:"Failed to add blogs",
              Error:error
            })
        })
    }
    catch(Err)
    {
        res.status(400).json({
          status:400,
          type:"Failed to add blogs",
          Error:Err
        })

    }
})


module.exports=blogrouter;