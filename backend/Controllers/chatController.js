
const Chat=require("../Models/chatSchema")
const User=require("../Models/userSchema")


const accessChat=async(req,res)=>{
try {
    
    const user=req.user
   
    const {id}=req.params
   
    const otherUser= await User.findById(id)
    if(!otherUser){
        return res.status(400).json({message:"User not foud"})
    }
    var isChat= await Chat.find({isGroupChat:false,$and:[{users:{$elemMatch:{$eq:user._id}}},{users:{$elemMatch:{$eq:id}}}]}).populate("users","-password").populate("latestMessage")
    isChat=await User.populate(isChat,{
    path:"latestMessage.sender"  ,
    select:"name photo email"  
    })
  //  console.log(isChat,"ischat")
if(isChat.length>0){
    res.send(isChat[0])
}else{
    var chatData={
        chatname:"sender",
        isGroupChat:false,
        users:[user._id,id]
    }
   // console.log(chatData)
    const createdChat=await Chat.create(chatData)
    const fullChat=await Chat.findOne({_id:createdChat._id}).populate("users","-password")
    res.status(200).json({data:fullChat})
}

} catch (error) {
    return res.status(500).json({message:error.message})
}
}


const fetchChatofUser=async(req,res)=>{
    try {
        
        const user=req.user
        const chats= await Chat.find({users:{$elemMatch:{$eq:user._id}}}).populate("users","-password").populate("latestMessage")
       // console.log(chats)
        if(!chats){
            return res.status(403).json({message:"No chats Found"})
        }
        res.status(200).json({data:chats})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}


const CreateGroupChat=async(req,res)=>{
    try {
        const user=req.user
        if(!req.body.users||!req.body.chatname){
return res.status(404).json("All fields are required")
        }
        const users=req.body.users
        if(users.length<2){
            return res.status(500).json("Atleast 2 members are required for groupchat")
        }
        users.push(user)
        const groupChat= new Chat({
            isGroupChat:true,
            admin:user,
            users:users,
            chatname:req.body.chatname
        })

        await groupChat.save()
        res.status(200).json({message:"group chat created",data:groupChat})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
    
}

const renameGroup=async(req,res)=>{
try {
    const user=req.user
    const {id}=req.params
    const chat= await Chat.findById(id)
    if(chat.isGroupChat){
chat.chatname=req.body.chatname
await chat.save()
    }
    res.status(200).json("Name changed successfully")
} catch (error) {
    return res.status(500).json({message:error.message})
}
}

const groupAdd=async(req,res)=>{
    try {
        
        const user=req.user
        const {users}=req.body
        const {id}=req.params
        const chat=await Chat.findById(id)
        if(!chat){
            return res.status(404).json("No chat Found")
        }
        if(chat.isGroupChat){
chat.users.push(...users)
await chat.save()
res.status(200).json({message:"user added",data:chat})
        }
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

const removeUser=async(req,res)=>{
    try {
        const user=req.user
        const {id}=req.params
        const removedUser=req.body.user
        const chat=await Chat.findById(id)
        if(!chat){
            return res.status(404).json("No chat Found")
        }
        if(chat.isGroupChat){
            chat.users.pull(removedUser)
            await chat.save()
            res.status(200).json({message:"user removed",data:chat})
        }
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}


module.exports={accessChat,fetchChatofUser,CreateGroupChat,renameGroup,groupAdd,removeUser}