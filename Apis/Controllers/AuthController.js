const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');
const mongoose = require('mongoose');
const Usermail = require('../Models/Usermail')
const bycrypt = require('bcryptjs');
// const mongoose = require('mongoose');
const validator = require('validator');
// const jwt = require('jsonwebtoken');
const dotenv=require('dotenv')
dotenv.config()
const CLIENT_ID = '109957920481336318662'; // Replace with your Google OAuth client ID
const client = new OAuth2Client(CLIENT_ID);

module.exports.Google_OauthLogin=async(req,res)=>{
    const { idToken } = req.body;
    console.log('--id--',idToken)
    try {
        const ticket = await client.verifyIdToken({
            idToken,
            audience: '905844466672-vshm1uvfm1d6sfplg11v0hp6plqv6a6h.apps.googleusercontent.com', // Specify the expected audience
        });

        const payload = ticket.getPayload();
        const userDetails={
            sub: payload.sub,
            email: payload.email,
            name: payload.name,
            role:"user"
        };
        const Usermodal=new User({
          _id:new mongoose.Types.ObjectId(),
          name: payload.name,
          email:payload.email,
          is_parentregistered:false,
          is_childregistered:false,
          role:"user"
        })
        const token = jwt.sign(userDetails,
            process.env.PRIVATE_SECRET_KEY
            ,{expiresIn:'48h'},{"alg": "HS256"});
        User.find({email:payload.email})
        .then((resu)=>{
            if(resu.length>=1)
            {
                res.status(200).json({
                    status: 200,
                    type: "sucessfully logged in!",
                    user_data: resu[0],
                    auth_token: token
                })
            }
            else{
                Usermodal.save()
                .then((result)=>{
                    res.status(200).json({
                        status: 200,
                        type: "sucessfully logged in!",
                        user_data: result,
                        auth_token: token
                    })
                })
            }
        })
    }
    catch (err) {
        console.log(err)
        res.status(401).json({
            status:401,
            Error:err.message,
            error: 'Invalid Google ID token',
         });
    }

}


module.exports.Update_Google_Oauth_Login=async(req,res)=>{
    const data = req.params.id;
    // const _id=data.sub;
    console.log(typeof(data),'--',data)
    User.findByIdAndUpdate(data,req.body)
    .then((result)=>{
        res.status(200).json({
            status: 200,
            type:"sucessfully Data saved",
            updated_data:result
        })
    })
    .catch((err)=>{
        console.log(err)
    })
    // const updatedata=await User.findByIdAndUpdate(_id,req.body)
    //     res.status(200).json({
    //         status:200,
    //         type:"User Profile Status updated",
    //         Result:updatedata
    // })
}




module.exports.Useremail_Register=(req,res)=>{
    Usermail.find({ email: req.body.email })
        .then((result) => {
            if (result.length >= 1) {
                res.status(400).json({
                    status: 400,
                    type: "Email id already exists!"
                })
            }
            else {
                bycrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        res.status(400).json({
                            status: 400,
                            type: "please enter password!",
                            Error: err.message
                        })
                    }
                    else {
                        const Usermodal = new Usermail({
                            _id: new mongoose.Types.ObjectId,
                            role: "user",
                            email: req.body.email,
                            password: hash,
                            is_parent_registered:0,
                            is_child_registered:0,
                        });
                        if (validator.isEmail(req.body.email)) {
                            if (req.body.password.length >= 8) {
                                Usermodal.save()
                                    .then((resdata) => {
                                        res.status(200).json({
                                            status: 200,
                                            type: "Sucessfully Registered!",
                                            role: "user",
                                            user_details: resdata
                                        })
                                    })
                            }
                            else {
                                res.status(400).json({
                                    status: 400,
                                    type: "your password is too short, enter atleast 8 characters"
                                })
                            }
                        }
                        else {
                            res.status(400).json({
                                status: 400,
                                type: "Please enter valid email address"
                            })
                        }
                    }
                })
            }
        })
        .catch((err) => {
            console.error(err)
        })

}


module.exports.Useremail_Login=(req,res)=>{
    Usermail.find({ email: req.body.email })
        .then((result) => {
            if (validator.isEmail(req.body.email)) {
                if (result.length >= 1) {
                    bycrypt.compare(req.body.password, result[0].password, (err, resul) => {
                        console.log(err,resul)
                        if (resul) {
                            const token = jwt.sign({
                                uid: result[0]._id,
                                email: result[0].email
                            }, 'secret', { expiresIn: '48h' })
                            res.status(200).json({
                                status: 200,
                                type: "sucessfully logged in!",
                                user_data: result[0],
                                auth_token: token

                            })
                        }
                        else{
                            res.status(400).json({
                                status: 400,
                                type: "invalid password, enter correct!"
                            })
                        }
                    })
                }
                else {
                    res.status(400).json({
                        status: 400,
                        type: "user does not exist's pelease register yourself!"
                    })
                }
            }
            else {
                res.status(400).json({
                    status: 400,
                    type: "please enter a valid email address!"
                })
            }
        })
        .catch((err) => {
            res.status(400).json({
                status: 400,
                type:"please enter a valid email address!"
            })
        })
}