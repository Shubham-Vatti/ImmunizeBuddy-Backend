
const childmodel=require('../Models/childmodel');
module.exports.child_registration=(req,res)=>{
    try{
        const child_form=new childmodel({
            child_name:req.body.child_name,
            child_DOB:req.body.child_DOB,
            child_TOB:req.body.child_TOB,
            child_gender:req.body.child_gender,
            child_weight:req.body.child_weight,
            birth_place:req.body.birth_place
        });
        
        child_form.save().then((result)=>{
            res.status(200).json({
                status:200,
                type:"child registration successfully",
                child_data:result
            })
        })
        .catch((err)=>{
            console.log(err)
            res.status(500).json({
                status:500,
                type:"child registration failed"
            })
        })
    }
    catch(err)
    {
        console.log(err)
        res.status(500).json({
            status:500,
            type:"child registration failed"
        })
    }
}