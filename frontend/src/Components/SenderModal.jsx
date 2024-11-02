import React from 'react'
import { FaEye } from 'react-icons/fa'
function SenderModal({name,photo,groupChat,users}) {
    
  return (
    <div>
        {/* You can open the modal using document.getElementById('ID').showModal() method */}
<button className="btn" onClick={()=>document.getElementById('my_modal_3').showModal()}><FaEye/></button>
<dialog id="my_modal_3" className="modal">
  <div className="modal-box">
    <form method="dialog">
      {/* if there is a button in form, it will close the modal */}
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    {name? <h3 className="font-bold text-lg">{name}</h3>:<div>
    <h1 className='font-bold text-xl mb-3'>{groupChat}</h1>
    <div>
    <input type="text" placeholder='Update Chatname' className='border p-1 w-[80%] mr-2 bg-gray-100'/>
    <button className='p-1 bg-green-400 rounded-md text-white'>Update</button>
    </div>
{users.map((user)=><span className="badge">{user.name}</span>)}
<input onChange={(e)=>handleAddUser(e.target.value)} type="text" placeholder='Add User to group' className='border p-1 w-[85%] mr-2 bg-gray-100' />
        </div>}
   <figure>
    <img src={photo} alt="" />
   </figure>
  </div>
</dialog>
    </div>
  )
}

export default SenderModal