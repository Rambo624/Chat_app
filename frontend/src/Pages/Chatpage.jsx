import React, { useEffect, useState } from 'react'
import axiosInstance from '../utils/axiosInstance'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { removeUser } from '../utils/userSlice'
import { Box } from "@chakra-ui/react"
import SideDrawer from '../Components/SideDrawer'
import GroupChatModal from '../Components/GroupChatModal'
import ChatBox from '../Components/ChatBox'
import { addChat } from '../utils/chatSlice'


function Chatpage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
const [fetchchat,setFetchchat]=useState([])
const [fetchAgain,setFetchAgain]=useState(false)
const loggedinUser= useSelector((store)=>store.user)
async function fetchChat(){
  try {
    const response= await axiosInstance({method:"GET",url:"/fetchchat"})
   // console.log(response.data.data)
    if(response.status===200){
setFetchchat(response.data.data)
    }
  } catch (error) {
    console.log(error)
  }
}

  useEffect(()=>{
fetchChat()
  },[fetchAgain])

function handleChat(chat){
  //console.log(fetchchat,"chat")
  if(chat.isGroupChat){
    dispatch(addChat(chat))
  }
  else{
   const otherUser=chat.users.find((user)=>user._id!==loggedinUser._id)
const otherUserWithChatId={
  ...otherUser,
  chatId:chat._id,
  lastMessage:chat?.latestMessage?.content

}
    dispatch(addChat(otherUserWithChatId))
  }

}

  return (
    <div className='bg-[url(https://www.rabstol.net/uploads/gallery/main/648/rabstol_net_god_of_war_12.jpg)] bg-cover bg-center h-screen'>


      <div>
        <SideDrawer fetchchat={fetchChat}/>

      </div>

      <div className='flex h-[650px]'>
        <div className='w-4/12 m-5 bg-white rounded-lg shadow-lg'>
          <div className=' flex justify-between items-center'>
            <h1 className='text-xl font-semibold ml-5'>Mychats</h1>
            <button className='p-2  m-2'><GroupChatModal/></button>
          </div>
          <div>
            {fetchchat.map((chats)=>(
              <div onClick={()=>handleChat(chats)}  key={chats._id} className='bg-gray-100 justify-between flex items-center p-1 m-4 rounded-md hover:bg-green-600 hover:text-white'>
                  <h1   className=' '>{chats.isGroupChat?chats.chatname:chats.users.find((user)=>user._id!==loggedinUser._id)?.name}</h1>
<h1>{chats?.latestMessage?.content}</h1>
              </div>
            ))}
          
          </div>

        </div>
        <div className='w-8/12  bg-white  rounded-md  shadow-lg m-5'>
        <div className=''>
        <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>
        </div>
        
          
        </div>

      </div>


    </div>
  )
}

export default Chatpage