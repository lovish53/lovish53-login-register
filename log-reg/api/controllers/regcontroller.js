const Reg=require('../models/reg')
const bcrypt=require('bcrypt')
const jwt= require('jsonwebtoken')
const cookieparser=require('cookie-parser')

exports.registerpage=async(req,res)=>{
    try{
   const{userName,email,date,password}=req.body
   const passwordconverted= await bcrypt.hash(password,10)
       const usercheck=await Reg.findOne({Email:email})
       if(usercheck==null){
       
   const record=new Reg({UserName:userName,BirthDate:date,Email:email,Password:passwordconverted})
   const token= jwt.sign(
    {id:record._id, email},
    'lovish',
    {
        expiresIn:"2h"
    }
);
record.token=token
   record.save()
   res.json({
    status:201,
    apiData:record,
    message:"Successfully Registered"
   })
       }else{
           res.json({
            status:400,
            message:"Email is already taken"
           })
       }
    }catch(error){
        res.json({
            status:400,
            message:error.message
        })
    }
}

exports.loginpage=async(req,res)=>{
    try{
      const {userName,password}=req.body
     const record=await Reg.findOne({Email:userName})
     const match = await bcrypt.compare(password, record.Password)
     if(record!==null){
        if(match){
            const token= jwt.sign(
                {id:record._id},
                'lovish',
                {
                    expiresIn:"2h"
                }
            );
            record.token=token
            const options={
                expires:new Date(Date.now() + 3*24*60*60*1000),
                httpOnly:true
            };
            res.cookie('token',token,options).json({
                status:200,
                success:true,
                token,
                apiData:record,
            })
        }else{
            res.json({
                status:400,
                message:'Wrong Credentials'
            })
        }
     }else{
        res.json({
            status:400,
            message:'Wrong Credentials'
        })
     }
    }catch(error){
        res.json({
            status:400,
            message:error.message
        })
    }
}

exports.details=async(req,res)=>{
    try{
        const record= await Reg.find()
        res.json({
         status:200,
         apiData:record
        })
       }catch(error){
         res.json({
           status:500,
           message:error.message
         })
       }
}

exports.singledata=async(req,res)=>{
    try{
       const id=req.params.id
      const record= await Reg.findById(id)
      res.json({
        status:200,
        apiData:record
      })
  }catch(error){
    res.json({
      status:500,
      error:error.message
    })
  }
  } 
  
  exports.updateform=async(req,res)=>{
    const id=req.params.id
    const{userName,email,date}=req.body
   try{
    await Reg.findByIdAndUpdate(id,{UserName:userName,Email:email,BirthDate:date})
     res.json({
      status:200,
      message:"Successfully Updated"
     })
    }catch(error){
      res.json({
        status:500,
        message:error.message
      })
    }
  }