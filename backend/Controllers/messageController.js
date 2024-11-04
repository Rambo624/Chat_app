const Message=require("../Models/messageSchema")
const Chat=require("../Models/chatSchema")
const User=require("../Models/userSchema")

const sendMessage=async(req,res)=>{
try {
   const user=req.user 
   const {id}=req.params
   const {content}=req.body
   if(!content||!id){
    return res.status(404).json("No chat or content found")
   }
var newMessage={
 sender:user,
 content:content,
 chat:id   
}

var message= await Message.create(newMessage)
message=await message.populate("sender","name photo")
message=await message.populate("chat")
message= await User.populate(message,{
   path:"chat.users",
   select:"name photo"
})

await Chat.findByIdAndUpdate(id,{latestMessage:message})
res.status(200).json({data:message})
} catch (error) {
    res.status(500).json({message:error.message})
}
}

const getMessages=async(req,res)=>{
try {
   const user=req.user
   const {id}=req.params
   const message= await Message.find({chat:id}).populate("sender","name photo").populate("chat")
 //  console.log(message)
   res.status(200).json({data:message})
} catch (error) {
   res.status(500).json({message:error.message})
}
}


module.exports={sendMessage,getMessages}