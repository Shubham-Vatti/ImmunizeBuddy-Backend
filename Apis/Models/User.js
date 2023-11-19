const mongoose=require('mongoose');

const User=new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    uid:String,
    name:String,
    email:String,
    role:String
})

module.exports=mongoose.model('User',User)