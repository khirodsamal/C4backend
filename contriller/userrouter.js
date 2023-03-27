const  express=require("express")
const userRouter=express.Router()
const {userModel}=require("../model/user.model")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

// register router
userRouter.post("/register",async(req,res)=>{
    const {name,email,gender,password,age,city,is_married}=req.body
    try {
        const existemail=await userModel.findOne({email})
        console.log(existemail)
        if(existemail){
           return res.status(400).send({"message":"User already exist, please login"})
        }
        bcrypt.hash(password,7,async(error,hash)=>{
            if(error){
                return res.status(500).send({"message":"something went wrong"})
                console.log("bcpterr",error)
            }
            const user= new userModel({name,email,gender,password:hash,age,city,is_married})
             await user.save()
             res.status(200).send({"message":"register seccessfully"})
        })
    } catch (error) {
        res.status(500).send({"message":"something went wrong"})
        console.log(error)
    }
})

// login router

   userRouter.post("/login",async(req,res)=>{
   const {email,password}=req.body
   
   try {
    const user= await userModel.findOne({email})
    if(user){
        bcrypt.compare(password,user.password,(err,result)=>{
            if(result){
                const token= jwt.sign({"userID":user._id},"masai",{expiresIn:"1h"})
                res.status(200).send({"message":"login successfull","token":token})
            }else{
                return res.status(400).send({"message":"wrong password"})
            }
        })
    }else{
        res.status(400).send({"message":"put correct emailid"})
    }
   } catch (error) {
    res.status(500).send({"message":"something went wrong"})
    console.log(error)
   }

   })

module.exports={userRouter}