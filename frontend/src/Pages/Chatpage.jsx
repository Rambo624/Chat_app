import React from 'react'
import axiosInstance from '../utils/axiosInstance'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { removeUser } from '../utils/userSlice'
import { Box } from "@chakra-ui/react"

import SideDrawer from '../Components/SideDrawer'
function Chatpage() {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  async function handleLogOut(){
    try {
      const response=await axiosInstance({url:"/logout",method:"POST"})
      if(response.status===200){

navigate("/")
dispatch(removeUser())
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>

      <button className='bg-red-500 text-white p-2' onClick={handleLogOut}>Log Out</button>
      <div>
      <SideDrawer/>
     
      </div>
     
  <Box className='flex justify-between'>
  <h1>Mychats</h1>
    <h1>chatbox</h1>
  </Box>
      
    
    </div>
  )
}

export default Chatpage