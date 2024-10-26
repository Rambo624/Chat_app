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

  return (
    <div>

      
      <div>
      <SideDrawer/>
     
      </div>
     
  <Box className='flex justify-between'>
  <h1>Mychats</h1>
    <h1 className='mr-4'>chatbox</h1>
  </Box>
      
    
    </div>
  )
}

export default Chatpage