const express = require('express');
const Usermailrouter = express.Router();
const Usermail = require('../Models/Usermail')
const bycrypt = require('bcrypt');
const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const AuthController=require('../Controllers/AuthController')

Usermailrouter.post("/Register",AuthController.Useremail_Register)


Usermailrouter.post('/Login',AuthController.Useremail_Login)

module.exports = Usermailrouter;