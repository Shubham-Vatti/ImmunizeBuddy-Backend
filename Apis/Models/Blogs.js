const mongoose=require('mongoose');

const Blogs=new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    blog_img:String,
    blog_tittle:String,
    short_Description:String,
    blog_Description:String
})

module.exports=mongoose.model('Blogs',Blogs)