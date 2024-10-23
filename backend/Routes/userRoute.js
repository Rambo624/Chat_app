const express=require("express")
const router=express.Router()
const userController=require("../Controllers/userController")
const {userAuth}=require("../Middlewares/authUser")

router.get("/",userController.getData)
router.get("/chat/:id",userController.getChat)
router.post("/signup",userController.signUp)
router.post("/login",userController.login)
router.get("/profile",userAuth,userController.getUser)
router.get("/allusers",userAuth,userController.allUsers)
module.exports=router