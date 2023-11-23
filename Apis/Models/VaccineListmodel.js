const mongoose=require('mongoose');

const VaccineListmodel=new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    vaccine_name:String,
    vaccine_details:String,
    when_to_give_vaccine:String,
    vaccine_side_effect:Array,
    vaccine_route:String,
    vaccine_dose:String,
    vaccine_site:String,
    data_to:String
})

module.exports=mongoose.model('VaccineListmodel',VaccineListmodel)