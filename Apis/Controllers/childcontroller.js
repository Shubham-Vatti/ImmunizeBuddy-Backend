const childmodel=require('../Models/childmodel');


module.exports.child_registration=(req,res)=>{
    try{
        const data=req.UserData;
        childmodel.find({user_id:data.sub})
        .then((result)=>{
            if(result.length==0)
            {
            // const data=req.UserData;
            const child_form=new childmodel({
                user_id:data.sub,
                child_name:req.body.child_name,
                child_DOB:req.body.child_DOB,
                child_TOB:req.body.child_TOB,
                child_gender:req.body.child_gender,
                child_weight:req.body.child_weight,
                birth_place:req.body.birth_place
            });
            // console.log(child_form)
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
        }else{
            res.status(400).json({
                status:400,
                type:"Already child registered"
            })
        }
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


module.exports.child_details=(req,res)=>{
    try{
        const data=req.UserData;
        childmodel.find({user_id:data.sub})
        .then((result)=>{
            if(result.length>0)
            {
                res.status(200).json({
                    status:200,
                    type:"successfully get child data",
                    child_data:result[0]  
                })
            }
            else{
                res.status(500).json({
                    status:500,
                    type:"child detail not found"
                })
            }
        })
    }
    catch(err)
    {
        res.status(500).json({
            status:500,
            type:"cannot get child data"
        })
    }
}

module.exports.get_all_children_data=(req,res)=>{
    try{
        childmodel.find()
        .then((result)=>{
            res.status(200).json({
                status:200,
                type:"successfully get child data",
                count:result.length,
                child_list:result
            })
        })
        .catch((error)=>{
            res.status(400).json({
                status:400,
                type:"Error while getting child data",
                Error:error
            })
        })
    }
    catch(err)
    {
        res.status(500).json({
            status:500,
            type:"Error while getting child data"
        })
    }
}