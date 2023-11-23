const express = require('express');
const ChildRouter = express.Router();
const childcontroller=require('../Controllers/childcontroller')
ChildRouter.post('/Register',childcontroller.child_registration)


module.exports=ChildRouter;