const express = require('express');
const ChildstateRouter = express.Router();
const childstatemodel = require('../Models/childstatemodel');
const mongoose = require('mongoose');
// const requireauth = require('../Middleware/auth-middleware');
// const childcontroller=require('../Controllers/childcontroller')

ChildstateRouter.post('/register-state-name', (req, res) => {
    const ChildStateData = new childstatemodel({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.state_name
    });
    ChildStateData.save()
        .then((result) => {
            res.status(200).json({
                status: 200,
                type: "Added state Name",
                data: result
            })
        })
        .catch((err) => {
            res.status(400).json({
                status: 400,
                type: "Error while saving state",
                Error: err
            })
        })
})


ChildstateRouter.get('/state-list',(req,res)=>{
    childstatemodel.find().then((result)=>{
        res.status(200).json({
            status: 200,
            type: "State List",
            count:result.length,
            state_names:result
        })
    })
    .catch((error)=>{
        res.status(400).json({
            status: 400,
            type:"Error while loading state",
            Error: error
        })
    })
})

module.exports = ChildstateRouter;