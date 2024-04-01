const express=require('express');
const cookieParser = require('cookie-parser');
const app=express();
app.use(express.json());
app.use(cookieParser())
const apirouter=require('./routers/apirouter');
const mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/log-reg');








app.use(apirouter);
app.use(express.static('public'));
app.listen(5000,()=>{console.log("server is running on port 5000")});





