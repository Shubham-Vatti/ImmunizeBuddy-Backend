const mongoose = require('mongoose');
const parentsmodel = require('../Models/parentsmodel');
const User = require('../Models/User');
// const BSON =require('bson')
const Objectid=require('mongodb').ObjectId

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
        const data=req.UserData;
        console.log('--user id--',typeof(data.sub))
        parentsmodel.find({user_id:data.sub}).then((resul)=>{
            console.log(resul)
            if(!resul.length>0)
            {
                const parents_form = new parentsmodel({
                    _id: new mongoose.Types.ObjectId,
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
                            Error: err,
                            type: "error while adding Parents data"
                        })
                    })
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
                type: "error while adding Parents data"
            })
        })
    }
    catch (Err) {
        console.log(Err)
        res.status(500).json({
            status: 500,
            type: "error while adding Parents data"
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
