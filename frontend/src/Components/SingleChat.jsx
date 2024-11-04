import React, { useEffect, useState } from 'react'
import { FaEye } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import SenderModal from './SenderModal'
import axiosInstance from '../utils/axiosInstance'
import ScrollableChat from './ScrollableChat'

function SingleChat() {
    const chat=useSelector((store)=>store.chat)
    const [newMessage,setNewMessage]=useState("")
    const [messages,setMessages]=useState([])
    //console.log(chat)

async function getMessages(){
  try {
   const response= await axiosInstance({url:`/messages/getmessages/${chat?.chatId}`,method:"GET"}) 
  // console.log(response.data)
   if(response.status===200){
    setMessages(response.data.data)
   }
  } catch (error) {
    console.log(error)
  }
}

useEffect(()=>{
getMessages()
},[chat])


    async function handleNewMessage(e){
setNewMessage(e.target.value)
    }

    async function sendMessage(){
      try {
        const data={
          content:newMessage
        }
        const response= await axiosInstance({method:"POST", url:`/messages/sent/${chat?.chatId}`,data:data})
       // console.log(response.data.data)
        if(response.status===200){
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
       <div className='bg-gray-200  h-[500px] m-3'>
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