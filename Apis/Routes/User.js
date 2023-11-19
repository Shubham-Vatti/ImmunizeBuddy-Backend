const express = require('express');
const Userrouter = express.Router();
// const crypto =require('crypto')
// const secretKey = crypto.randomBytes(32).toString('hex');
// console.log('Generated Secret Key:', secretKey);
// const { OAuth2Client } = require('google-auth-library');
// const admin = require('firebase-admin');
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');
const mongoose = require('mongoose');

const CLIENT_ID = '109957920481336318662'; // Replace with your Google OAuth client ID
const client = new OAuth2Client(CLIENT_ID);
// Initialize Firebase Admin SDK
// const serviceAccount = require('../../immunizebuddy-18891-firebase-adminsdk-xs9qe-5b791cdd58.json');
// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount)
//     //   databaseURL: 'https://your-project-id.firebaseio.com',
// });

// Initialize Google Auth client
// const client = new OAuth2Client('905844466672-vshm1uvfm1d6sfplg11v0hp6plqv6a6h.apps.googleusercontent.com');

Userrouter.post('/Signup', async (req, res, next) => {
    const { idToken } = req.body;
    // console.log(idToken)
    try {
        const ticket = await client.verifyIdToken({
            idToken,
            audience: '905844466672-vshm1uvfm1d6sfplg11v0hp6plqv6a6h.apps.googleusercontent.com', // Specify the expected audience
        });

        const payload = ticket.getPayload();
        const userDetails={
            uid: payload.sub,
            email: payload.email,
            name: payload.name
        };
        // const Usermodal=new User({
        //   _id: new mongoose.Types.ObjectId,
        //   uid:payload.uid,
        //   name: payload.name,
        //   email:payload.email,
        //   role:"user"
        // })
        // Usermodal.save()
        // .then(()=>{})
        const token = jwt.sign(userDetails,
            "c1e79ab27f7da8e4e9a7dbb83283c2a7e2270aab34d66915df3247ec0c3b91d1"
            ,{expiresIn:'48h'})
        res.status(200).json({
            status:200,
            type:"Logged in",
            userData:userDetails,
            role:"user",
            auth_token:token,
        })
    }
    catch (err) {
        res.status(401).json({
            status:401,
            error: 'Invalid Google ID token'
         });
    }
})



module.exports = Userrouter;