const express=require("express")
const router=express.Router()
const userController=require("../Controllers/userController")
const chatController=require("../Controllers/chatController")
const {userAuth}=require("../Middlewares/authUser")

router.post("/accesschat/:id",userAuth,chatController.accessChat)
//router.get("/fetchchat",userAuth,chatController.fetchChatofUser)
router.post("/groupchat",userAuth,chatController.CreateGroupChat)

router.put("/rename/:id",userAuth,chatController.renameGroup)

router.put("/groupadd/:id",userAuth,chatController.groupAdd)


router.put("/remove/:id",userAuth,chatController.removeUser)
module.exports=router