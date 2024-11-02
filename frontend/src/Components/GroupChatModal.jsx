import React, { useRef, useState } from 'react'
import axiosInstance from "../utils/axiosInstance"
import UserListItem from './UserListItem'
function GroupChatModal() {
const chatName=useRef()
const [users,setUsers]=useState([])

const [searchResult,setSearchResult]=useState("")
const [error,setError]=useState("")
const [success,setSuccess]=useState("")
  async function handleCreateGroupChat(){
    try {
const data={
  chatname:chatName.current.value,
  users:users
}

       const response= await axiosInstance({method:"POST", url:"/chat/groupchat",data:data})
       console.log(response)
       if(response.status==200){
setSuccess("Group Created Successfully")
setTimeout(() => {
  setSuccess("")
}, 5000);
       }
    } catch (error) {
      console.log(error)
    }
    
  }

  async function handleSearch(query){
    try {
      const response= await axiosInstance({method:"GET", url:`/allusers?search=${query}`})
      console.log(response.data.data)
      setSearchResult(response.data.data)
    } catch (error) {
      
    }
  }

  async function handleGroup(user){
    try {
      if(users.includes(user)){
setError("User already exists in the group")
setTimeout(() => {
  setError("")
}, 10000);
      }
      else{
        setUsers([...users,user])
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function handleRemoveUser(userToRemove){
    try {
  setUsers(users.filter((user)=>user._id!==userToRemove._id))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
        {/* Open the modal using document.getElementById('ID').showModal() method */}
<button className="btn" onClick={()=>document.getElementById('my_modal_2').showModal()}>New Group Chat</button>
<dialog id="my_modal_2" className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Group Chat</h3>
    <input ref={chatName} type="text" className='border border-gray-200 p-2 mb-4 w-[80%]' placeholder='Enter Chat name' /><br />
    <input onChange={(e)=>handleSearch(e.target.value)} className='border border-gray-200 p-2 w-[80%]' type="text" placeholder='Add members to the group' /><br/>
    {users.map((user)=>(<span key={user._id} className="badge">{user.name}<button onClick={()=>handleRemoveUser(user)} className='text-xs ml-2'>X</button></span>))}
    {searchResult && searchResult.slice(0,4).map((result)=>( <UserListItem key={result._id} name={result.name} photo={result.photo} email={result.email} handlefunction={()=>handleGroup(result)} />))}
   
   
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button onClick={handleCreateGroupChat} className='"btn mr-4 bg-blue-600 text-white p-2 rounded-md'>Create</button>
        <button className="btn">Close</button>
        <p className='text-red-600'>{error}</p>
      </form>
    </div>
  </div>
</dialog>
    </div>
  )
}

export default GroupChatModal