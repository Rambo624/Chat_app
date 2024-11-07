import React, { useEffect, useState } from 'react'
import { FaEye } from 'react-icons/fa'
import { useSelector,useDispatch } from 'react-redux'
import SenderModal from './SenderModal'
import axiosInstance from '../utils/axiosInstance'
import ScrollableChat from './ScrollableChat'
import { io } from "socket.io-client";
import { addMessage } from '../utils/notificationSlice'


const ENDPOINT=import.meta.env.VITE_BASE_URL
var socket,selectedChatCompare


function SingleChat({fetchAgain,setFetchAgain}) {
  const dispatch=useDispatch()
  const user=useSelector((store)=>store.user)
  const notif=useSelector((store)=>store.notification)
    const chat=useSelector((store)=>store.chat)
    const [newMessage,setNewMessage]=useState("")
    const [messages,setMessages]=useState([])
    const [socketConnected,setSocketConnected]=useState(false)
    const [notification,setNotification]=useState(notif)
    //console.log(chat)

async function getMessages(){
  try {
   const response= await axiosInstance({url:`/messages/getmessages/${chat?.chatId||chat?._id}`,method:"GET"}) 
  // console.log(response.data)
   if(response.status===200){
    setMessages(response.data.data)
//console.log("hai")
    socket.emit("join chat",chat?.chatId)
  
   }
  } catch (error) {
    console.log(error)
  }
}

useEffect(()=>{
  socket=io(ENDPOINT)
  socket.emit("setup",user)
  socket.on("connection",setSocketConnected(true))
  },[])
  

useEffect(()=>{
getMessages()
selectedChatCompare=chat
},[chat])

//console.log(notification,"new notif")

useEffect(()=>{
  socket.on("message received",(newMessageReceived)=>{
    if(!selectedChatCompare || selectedChatCompare._id!==newMessageReceived.sender._id){
dispatch(addMessage([newMessageReceived,...notification]))
setFetchAgain(!fetchAgain)
    }else{
      setMessages([...messages,newMessageReceived])
    }
  })
})



    async function handleNewMessage(e){
setNewMessage(e.target.value)
    }

    async function sendMessage(){
      try {
        const data={
          content:newMessage
        }
        const response= await axiosInstance({method:"POST", url:`/messages/sent/${chat?.chatId||chat?._id}`,data:data})
        console.log(response.data.data)
        if(response.status===200){
          socket.emit("new message",response.data.data)
          setMessages([...messages,response.data.data])
        }
      } catch (error) {
        console.log(error)
      }
    }
  return (
    <div className=''>
        <div className='flex justify-between'>
        <h1 className='text-2xl m-2'>{chat.name||chat?.chatname}</h1>
        <button className='mr-3'><SenderModal key={chat?._id} id={chat?._id} users={chat?.users} name={chat.name} photo={chat.photo} groupChat={chat?.chatname}/></button>
        </div>
       <div className='bg-gray-200 overflow-scroll h-[500px] m-3'>
<ScrollableChat message={messages}/>
       </div>
    <div className='flex'>
        <input onChange={handleNewMessage}  type="text" placeholder='Type Message' className='border ml-3 mr-2 w-[92%] focus:outline-blue-500 bg-gray-100' />
        <button onClick={sendMessage} className='p-1 bg-green-500 text-white rounded-md mr-2'>Send</button>
    </div>
        </div>
  )
}

export default SingleChat