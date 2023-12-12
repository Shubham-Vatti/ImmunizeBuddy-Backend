const jwt=require('jsonwebtoken');


const requireauth=(req,res,next)=>{
    // const token=req.headers.authorization.split(' ')[1];
    // console.log('--token--',token);
    // if(token)
    // {
    //     jwt.verify(token,process.env.PRIVATE_SECRET_KEY,(err)=>{
    //         if(err)
    //         {
    //             console.log(err)
    //         }
    //         else{
    //             next()
    //         }
    //     })
    // }
    // else{
    //     res.status(500).json({
    //         msg:"Unauthenticated"
    //     })
    // }
    try
    {
        const Auth_Token=req.headers.authorization.split(' ')[1];
        const decode=jwt.verify(Auth_Token,process.env.PRIVATE_SECRET_KEY)
        req.UserData=decode;
        next();
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            status:500,
            msg:"Authentication Error"
        })
    }
}

module.exports=requireauth;