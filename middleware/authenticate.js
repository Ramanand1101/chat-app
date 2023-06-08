const jwt=require("jsonwebtoken")
const authenticate=(req,res,next)=>{
    try{
        let token=req.headers.autthorization
        console.log(token)
        let decoded=jwt.verify(token,"masai")
        if(decoded){
            req.body.userId=decoded.userId;
            next()
        }
        else res.send("login again")
    }
    catch(error){
        res.send(error.message)
    }
}
module.exports={authenticate}