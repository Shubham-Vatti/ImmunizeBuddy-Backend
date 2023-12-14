const express = require('express')
const app= express();
const Userrouter=require('./Apis/Routes/User')
const ParentsRouter=require('./Apis/Routes/ParentsRoute')
const ChildRouter =require('./Apis/Routes/ChildRouter')
// const router=require('./Apis/Routes/products')
// const OrderRoute=require('./Apis/Routes/orders')
const childdoctorroute=require('./Apis/Routes/childdoctorRoute')
const VaccineRouter=require('./Apis/Routes/VaccineRouter')
const morgan=require('morgan');
const cors=require('cors')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Usermailrouter=require('./Apis/Routes/Usermail')
const fileUpload=require('express-fileupload')
const ChildstateRouter=require('./Apis/Routes/childstateRoute');
const blogrouter = require('./Apis/Routes/blogrouter');

app.use(cors())
mongoose.connect('mongodb+srv://immunizebuddy:BjRY5Evy5MaBctH6@immunizebuddy-server.53jq24g.mongodb.net/?retryWrites=true&w=majority')
mongoose.connection.on('connected',()=>{
    console.log("Connected to Mongo")
})
mongoose.connection.on('error',()=>{
    console.log("Connection error")
})
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use('/Auth-User',Userrouter)
app.use(fileUpload({
    useTempFiles:true
}))
app.use('/state-lst',ChildstateRouter)
app.use('/doctor-Store',childdoctorroute)
app.use('/Vaccine-Details-list',VaccineRouter)
app.use('/Child-Api',ChildRouter)
app.use('/Blogs-Api',blogrouter)
app.use('/Parents-Api',ParentsRouter)
app.use('/UserAuth/Email',Usermailrouter)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With,Content-Type,Authorization,Accept');
    if(res.method==='OPTIONS')
    {
        res.header('Access-Control-Allow-Methods', 'PUT,POST,DELETE,PATCH,GET');
        res.status(200).json({})
    }
    next()
})

app.use((req, res, next) => {
    res.status(400).json({
        status:400,
        Error:"Bad Request"
    })
})


module.exports=app;