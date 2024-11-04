const express=require("express")
const router=express.Router()
const messageController=require("../Controllers/messageController")
const { userAuth } = require("../Middlewares/authUser")


router.post("/sent/:id",userAuth, messageController.sendMessage)
router.get("/getmessages/:id",userAuth, messageController.getMessages)






module.exports=router

