import React from 'react'
import ScrollableFeed from 'react-scrollable-feed'
import { isLastMessage, isSameSender } from '../utils/ChatLogic'
import { useDispatch, useSelector } from 'react-redux'
import { isSameSenderMargin } from '../utils/ChatLogic'
import { isSameUser } from '../utils/ChatLogic'
function ScrollableChat({message}) {
    console.log(message)
const user= useSelector((store)=>store.user)
const chat=useSelector((store)=>store.chat)

    if(!message.length) return <h1>Loading....</h1>
  return (
    
    <div>
          <ScrollableFeed>
          {message.length && message.map((m,i)=>(
            <div className='flex' key={m._id}>
              {(isSameSender(message,m,i,user._id)||isLastMessage(message,i,user._id))&&(
                <figure>
                <img className='w-10 h-10 rounded-full' src={m.sender.photo} alt="" />
                </figure>) }
                <p   style={{ marginLeft: isSameSenderMargin(message, m, i, user._id), marginTop: isSameUser(message, m, i, user._id) ? 3 : 10, }} className={`${m.sender._id!==user._id?"bg-blue-200":"bg-green-200"}`}>{m.content}</p>
            </div>
          ))}
      </ScrollableFeed>
    </div>
  )
}

export default ScrollableChat