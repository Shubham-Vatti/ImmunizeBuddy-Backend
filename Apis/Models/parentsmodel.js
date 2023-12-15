const mongoose=require('mongoose');

const parentsmodel=new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    // profile_pic:{type:String},
    user_id:{type:String, required:[true,'uid required'],ref:'User'},
    your_gender:{type:String, required:[true,'your gender required']},
    your_name:{type:String, required:[true,'your name required']},
    partner_name:{type:String, required:[true,'your partner name required']},
    address:{type:String, required:[true,'your address required']},
    mobile_no:{type:Number, required:[true,'your mobile number required']},
    email_id:{type:String, required:[true,'your email id required']},  
});


module.exports=mongoose.model("parentsmodel",parentsmodel)