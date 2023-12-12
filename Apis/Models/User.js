const mongoose=require('mongoose');

const User=new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:String,
    email:String,
    role:String,
    is_parentregistered:Boolean,
    is_childregistered:Boolean
})

module.exports=mongoose.model('User',User)