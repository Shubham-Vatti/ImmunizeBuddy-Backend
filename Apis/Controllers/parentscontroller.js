const mongoose=require('mongoose');
const parentsmodel=require('../Models/parentsmodel');

module.exports.parents_registration = (req,res)=>{
    try{
        const parents_form=new parentsmodel({
            your_gender:req.body.your_gender,
            your_name:req.body.your_name,
            partner_name:req.body.partner_name,
            address:req.body.address,
            mobile_no:req.body.mobile_no,
            email_id:req.body.email_id
        });
        parents_form.save()
        .then((result)=>{
            res.status(200).json({
                status:200,
                type:"Parents data added successfully",
                parent_data:result
            })
        })
        .catch((err)=>{
            res.status(500).json({
                status:500,
                type:"error while adding Parents data"
            })
        })
    }
    catch(Err)
    {
        res.status(500).json({
            status:500,
            type:"error while adding Parents data"
        })
    }
}