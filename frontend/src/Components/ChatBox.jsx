import React, { useState } from 'react'
import SingleChat from './SingleChat'
import { useSelector } from 'react-redux'

function ChatBox() {
   
    const chat=useSelector((store)=>store.chat)
  return (
    <div>
   {chat?<><SingleChat/></>:  <div className=''>
     
     <div className=' mt-[30%]' >
        <h1 className='text-2xl  ml-[30%] text-gray-400'>Click on a User to start chatting</h1>
        </div>
        </div>}

    </div>
 
   
  )
}

export default ChatBox