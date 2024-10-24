const {chats}= require("../utils/data")
const jwt=require("jsonwebtoken")
const User=require("../Models/userSchema")
const bcrypt=require("bcrypt")





const getData= (req,res)=>{
    res.send(chats)
}

const signUp=async(req,res)=>{
    try {
       
 
        const {name,email,password,photo}=req.body
       if(!name||!email||!password||!photo){
        return res.status(400).json({message:"ALL FIELDS ARE REQUIRED"})
       } 
const passwordHash=await bcrypt.hash(password, 10);
       const newUser= new User({
        name,password:passwordHash,email,photo
       })
       await newUser.save()
res.status(200).json({message:"Signup Successful"})
    } catch (error) {
       res.status(400).json({message:error.message}) 
    }
}

const login=async (req,res)=>{
    try {
        const {email,password}=req.body
        if(!email||!password){
            return res.status(400).json({message:"ALL FIELDS ARE REQUIRED"})
        }
        const user= await User.findOne({email:email})
        if(!user){
            return res.status(404).json({message:"User not found"})
        }
       const isPasswordValid= await bcrypt.compare(password, user.password);
       
       if(!isPasswordValid){
        return res.status(403).json({message:"INVALID CREDENTIALS"})
       }
       var token = jwt.sign({id:user._id}, process.env.JWT_KEY);
       res.cookie("token", token, {
        httpOnly: true,
        secure: true,  // Cookie is sent over HTTPS only
        sameSite: 'None',  // Allows cross-site cookie usage
        maxAge: 24 * 60 * 60 * 1000 // 1 day expiration time
    });
    const { password: _, ...userWithoutPassword } = user.toObject();
    res.status(200).json({message:"Login Successful",data:userWithoutPassword})
    } catch (error) {
        res.status(400).json({message:error.message})  
    }
}

const getChat= (req,res)=>{
    const id=req.params.id
    const singleChat= chats.find((chat)=>chat._id===id)
    res.send(singleChat)
}

const getUser=async(req,res)=>{
    try {
        const user=req.user
        res.status(200).json({data:user})
    } catch (error) {
        res.status(400).json({message:error.message})  
    }
}

const allUsers=async(req,res)=>{
    try {
        const user=req.user
        const keyword=req.query.search?{$or:[{name:{$regex:req.query.search,$options:"i"}},{email:{$regex:req.query.search,$options:"i"}}]}:{}
        const users=await User.find(keyword).find({_id:{$ne:user._id}}).select("-password")
        res.status(200).json({data:users})
    } catch (error) {
        res.status(400).json({message:error.message})  
    }
}

const logOut=async(req,res)=>{
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: true,  // Cookie is sent over HTTPS only
            sameSite: 'None',  // Allows cross-site cookie usage
          
        });
        res.status(200).json("Log out successful")
    } catch (error) {
        res.status(400).json({message:error.message})  
    }
}

module.exports={getData,getChat,signUp,login,getUser,allUsers,logOut}