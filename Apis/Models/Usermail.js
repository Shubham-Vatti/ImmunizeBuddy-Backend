const mongoose=require('mongoose');

const Usermail=new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    role:{type:String, required:true},
    email:{type:String,required:[true,'Email field is required']},
    password:{type:String,required:[true,'Password field is required']},
    is_parent_registered:{type:Number,default:0},
    is_child_registered:{type:Number,default:0}
});

module.exports=mongoose.model('Usermail',Usermail);