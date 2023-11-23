const express = require('express');
const Userrouter = express.Router();
const AuthController=require('../Controllers/AuthController')

Userrouter.post('/Signup',AuthController.Google_OauthLogin)



module.exports = Userrouter;