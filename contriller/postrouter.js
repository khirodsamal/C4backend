const  express=require("express")
const postRouter=express.Router()
const {postModel}=require("../model/posts.model")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const {authenticate}=require("../middlewere/auth")
const { userModel } = require("../model/user.model")


// create
postRouter.post("/add",authenticate,async(req,res)=>{
     try {
        const post=new postModel(req.body)
        await post.save()
        res.status(200).send({"message":"post added"})
     } catch (error) {
        res.status(500).send({"message":"something went wrong"})
        console.log(error)
     }
})

// get posts

postRouter.get("/",authenticate,async(req,res)=>{
    try {
        const posts=await postModel.find({userID:req.body.userID})
        if(posts.length!==0){
            res.status(200).send(posts)
        }else{
            res.status(400).send({"message":"not found"})
        }
    } catch (error) {
        res.status(500).send({"message":"somethingwent wrong"})
        console.log(error)
    }
})
// update
postRouter.patch("/update/:postID",authenticate,async(req,res)=>{
    const payload=req.body
    const postId=req.params.postID
    try {
        const post=await userModel.find({postId})
        console.log(post)
        const data=await postModel.findByIdAndUpdate({_id:postId,userID:req.body.userID},payload)
        res.status(200).send({"message":"update successfull"})
    } catch (error) {
        res.status(500).send({"message":"something went wrong"})
        console.log(error)
    }
})
// delet
postRouter.delete("/delete/:postID",authenticate,async(req,res)=>{
    const postID=req.params.postID
    try {
       
        
        await postModel.findByIdAndDelete({_id:postID,userID:req.body.userID})
        res.status(200).send({"message":"delete succesfull"})
    } catch (error) {
        res.status(500).send({"message":"something went wrong"})
        console.log(error)
    }
})
module.exports={postRouter}