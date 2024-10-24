const jwt=require("jsonwebtoken")
const User=require("../Models/userSchema")
const userAuth=async(req,res,next)=>{
    try {
      //console.log("HELLO USER")
     const {token}=req.cookies
     if(!token){
        return res.status(401).json({message:"User not authorised"})
       
        
             }
     const decodedToken=await jwt.verify(token, process.env.JWT_KEY);
   
     const user= await User.findById(decodedToken.id).select("-password")
  req.user=user
  
     next()
    } catch (error) {
     return res.status(400).json({message:"User not authorised"})
    }
}

module.exports={userAuth}