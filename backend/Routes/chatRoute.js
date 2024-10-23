const express=require("express")
const router=express.Router()
const userController=require("../Controllers/userController")
const {userAuth}=require("../Middlewares/authUser")

router.get("/chat",(req,res)=>{
    console.log("hello")
})

module.exports=router