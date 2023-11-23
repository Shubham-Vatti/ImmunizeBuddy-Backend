const mongoose=require('mongoose');

const parentsmodel=new mongoose.Schema({
    your_gender:{type:String, required:true},
    your_name:{type:String, required:true},
    partner_name:{type:String, required:true},
    address:{type:String, required:true},
    mobile_no:{type:Number, required:true},
    email_id:{type:String, required:true},  
});


module.exports=mongoose.model("parentsmodel",parentsmodel)