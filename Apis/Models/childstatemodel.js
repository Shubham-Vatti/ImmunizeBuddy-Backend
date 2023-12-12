const mongoose=require('mongoose');

const childstatemodel=new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:{type:String,require:[true,'state name required']}
});


module.exports=mongoose.model("childstatemodel",childstatemodel)