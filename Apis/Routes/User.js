const express = require('express');
const Userrouter = express.Router();
const AuthController=require('../Controllers/AuthController');
const requireauth = require('../Middleware/auth-middleware');

Userrouter.post('/Signup',AuthController.Google_OauthLogin)
Userrouter.patch('/Update-Oauth-Status/:id',AuthController.Update_Google_Oauth_Login)


module.exports = Userrouter;