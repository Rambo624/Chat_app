const express=require("express")
const router=express.Router()
const messageController=require("../Controllers/messageController")
const { userAuth } = require("../Middlewares/authUser")


router.post("/sent",userAuth, messageController.sendMessage)






module.exports=router

