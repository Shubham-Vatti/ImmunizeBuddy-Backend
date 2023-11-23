const mongoose=require('mongoose');

const User=new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    uid:String,
    name:String,
    email:String,
    role:String,
    is_parent_registered:{type:Number,default:0},
    is_child_registered:{type:Number,default:0}
})

module.exports=mongoose.model('User',User)