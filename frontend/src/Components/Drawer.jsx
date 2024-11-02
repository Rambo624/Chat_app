import React from 'react'
import axiosInstance from '../utils/axiosInstance'
import { useState } from 'react'
import Skeletons from './Skeleton'
import { toast,Bounce } from 'react-toastify'
import UserListItem from './UserListItem'

function Drawer({fetchchat}) {
    const [searchQuery,setSearchQuery]=useState("")
    const [searchResult,setSearchResult]=useState([])
    const [loading,setLoading]=useState(false)
    console.log(searchQuery)
    async function handleSearch(){
        try {
           setLoading(true)
            const response=await axiosInstance({method:"GET",url:`/allusers?search=${searchQuery}`})
            console.log(response)
          
            if(response.status===200){
              setSearchResult(response.data.data)
setLoading(false)
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function handleChat(id){
try {
  console.log(id)
 
  const response= await axiosInstance({url:`/chat/accesschat/${id}`, method:"POST"})
  if(response.status===200){
fetchchat()
  }
} catch (error) {
  console.log(error)
}
    }
  return (
    <div className=''>
        <div className="drawer ">
  <input id="my-drawer" type="checkbox" className="drawer-toggle " />
  <div className="drawer-content p-0">
    {/* Page content here */}
    <label htmlFor="my-drawer" className="btn p-1 hover:bg-transparent border-none bg-transparent drawer-button">Search</label>
  </div>
  <div className="drawer-side">
    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
  
    <div className="menu items-start bg-base-200 shadow-lg text-base-content min-h-full w-80 p-4">
      {/* Sidebar content here */}
      <div className='flex items-start'>
        <h1  className='text-xl font-semibold '>Search User</h1>   
      </div>
      <div className='mt-3'>
      <input onChange={(e)=>{setSearchQuery(e.target.value)}} type="text" placeholder='Search by name' className='p-2 border border-black' />
      <button onClick={handleSearch} className='p-2 bg-gray-200 ml-2 rounded-md'>Go</button>
      </div>
      {loading?<Skeletons/>:searchResult.map((result)=>(
        <div onClick={()=>handleChat(result._id)} key={result._id}>
                <UserListItem   id={result._id} name={result.name} photo={result.photo} email={result.email}/>

        </div>
      ))}
      
    </div>
  </div>
</div>
    </div>
  )
}

export default Drawer