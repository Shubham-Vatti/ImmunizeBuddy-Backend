const mongoose=require('mongoose');

const childdoctormodel=new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    doctor_pic:{type:String},
    doctor_name:{type:String, required:[true,'doctor name required']},
    doctor_gender:{type:String, required:[true,'doctor gender required']},
    doctor_address:{type:String, required:[true,'doctor address required']},
    doctor_specialist:{type:String, required:[true,'doctor specialist required']},
    doctor_fees:{type:Number, required:[true,'fees required']},
    country_code:{type:String, required:[true,'country code required']},
    doctor_mobileno:{type:Number, required:[true,'doctor contact required']},
    doctor_city:{type:String, required:[true,'doctor city required']},
    doctor_state:{type:String, required:[true,'doctor state required']},
    doctor_bio:{type:String,required:[true]}
});


module.exports=mongoose.model("childdoctormodel",childdoctormodel)