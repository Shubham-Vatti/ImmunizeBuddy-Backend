const express = require('express');
const ParentsRouter = express.Router();
const parentcontroller =require('../Controllers/parentscontroller');
const requireauth = require('../Middleware/auth-middleware');
ParentsRouter.post('/Register',requireauth,parentcontroller.parents_registration)
ParentsRouter.put('/Register/update-details',requireauth,parentcontroller.parents_details_update)
ParentsRouter.get('/Get-data',requireauth,parentcontroller.parents_data)
ParentsRouter.get('/Get-all-parents-data',parentcontroller.get_all_parents_data)
module.exports=ParentsRouter;