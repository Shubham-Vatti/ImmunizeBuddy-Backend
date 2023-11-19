const express = require('express')
const app= express();
const Userrouter=require('./Apis/Routes/User')
// const router=require('./Apis/Routes/products')
// const OrderRoute=require('./Apis/Routes/orders')
const morgan=require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://immunizebuddy:BjRY5Evy5MaBctH6@immunizebuddy-server.53jq24g.mongodb.net/?retryWrites=true&w=majority')
mongoose.connection.on('connected',()=>{
    console.log("Connected to Mongo")
})
mongoose.connection.on('error',()=>{
    console.log("Connection error")
})
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use('/Auth-User',Userrouter)
// app.use('/Orders',OrderRoute)
// app.use('/User-Auth',Userrouter)
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