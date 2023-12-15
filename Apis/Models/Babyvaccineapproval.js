const mongoose=require('mongoose');

const Babyvaccineapproval=new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    Vaccine_name:String,
    Vaccine_Details:String,
    Assigned_user:[{
        userId:String,
        url:String
    }]

})

module.exports=mongoose.model('Babyvaccineapproval',Babyvaccineapproval)