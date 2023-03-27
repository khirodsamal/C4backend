const express=require("express")
const app=express()
app.use(express.json())
const {connection}=require("./database/db")
require("dotenv").config()

app.get("/",async(req,res)=>{
   
    res.send("wellcome")
})

const {userRouter}=require("./contriller/userrouter")
app.use("/users",userRouter)

const {postRouter}=require("./contriller/postrouter")
app.use("/posts",postRouter)

app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("connect  to db")
    } catch (error) {
        console.log("connection failed")
        console.log(error)

    }
    console.log(`server is running at port ${process.env.port}`)
})