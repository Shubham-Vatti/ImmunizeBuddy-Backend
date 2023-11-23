const express = require('express');
const ParentsRouter = express.Router();
const parentcontroller =require('../Controllers/parentscontroller')
ParentsRouter.post('/Register',parentcontroller.parents_registration)

module.exports=ParentsRouter;