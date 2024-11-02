import React from 'react'
import { FaEye } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import SenderModal from './SenderModal'

function SingleChat() {
    const chat=useSelector((store)=>store.chat)
    console.log(chat)
  return (
    <div className=''>
        <div className='flex justify-between'>
        <h1 className='text-2xl m-2'>{chat.name||chat?.chatname}</h1>
        <button className='mr-3'><SenderModal key={chat?._id} id={chat?._id} users={chat?.users} name={chat.name} photo={chat.photo} groupChat={chat?.chatname}/></button>
        </div>
       <div className='bg-gray-200  h-[500px] m-3'>

       </div>
    <div className='flex'>
        <input type="text" placeholder='Type Message' className='border ml-3 mr-2 w-[92%] bg-gray-100' />
        <button className='p-1 bg-green-500 text-white rounded-md mr-2'>Send</button>
    </div>
        </div>
  )
}

export default SingleChat