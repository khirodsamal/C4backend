const jwt=require("jsonwebtoken")

const authenticate=(req,res,next)=>{
    const token =req.headers.authorization
    if(token){
        const decoded=jwt.verify(token,"masai")
        if(decoded){
            req.body.userID=decoded.userID
            next()
        }else{
          return res.status(400).send({"message":"login first"})
        }
    }else{
        return res.status(400).send({"message":"login first"})
    }
}
module.exports={authenticate}