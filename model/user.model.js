const mongoose=require("mongoose")
const userSchema=mongoose.Schema({
    name : String,
email : {
    type:String,
    require:true,
    unique:true
},
gender: String,
password : String,
age: Number,
city : String,
is_married:Boolean
},{
    versionKey:false
})

const  userModel=mongoose.model("user",userSchema)
module.exports={userModel}