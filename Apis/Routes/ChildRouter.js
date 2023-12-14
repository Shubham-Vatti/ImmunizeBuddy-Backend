const express = require('express');
const ChildRouter = express.Router();
const requireauth = require('../Middleware/auth-middleware');
const childcontroller=require('../Controllers/childcontroller')

ChildRouter.post('/Register',requireauth,childcontroller.child_registration);
ChildRouter.put('/Register/Update-Child',requireauth,childcontroller.child_data_update);
ChildRouter.get('/get-child-details',requireauth,childcontroller.child_details);
ChildRouter.get('/get-child-details/all-child-data',childcontroller.get_all_children_data);


module.exports=ChildRouter;