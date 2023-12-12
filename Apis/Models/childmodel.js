const mongoose=require('mongoose');

const childmodel=new mongoose.Schema({
    user_id:{type:String, required:[true,'uid required'],ref:'User'},
    child_gender:{type:String, required:true},
    child_name:{type:String, required:true},
    child_DOB:{type:String, required:true},
    child_TOB:{type:String, required:true},
    child_weight:{type:Number, required:true},
    birth_place:{type:String, required:true},
});


module.exports=mongoose.model("childmodel",childmodel)