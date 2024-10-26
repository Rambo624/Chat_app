import React from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { removeUser } from '../utils/userSlice';
import { Box,Text } from '@chakra-ui/react';
import { Tooltip } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { FaChevronDown, FaSearch } from 'react-icons/fa';
import { FaBell } from 'react-icons/fa';
import { HStack } from "@chakra-ui/react"
import { Avatar } from "@/components/ui/avatar"
import { useDispatch } from 'react-redux';
import ProfileModel from './ProfileModel';
import Drawer from './Drawer';
function SideDrawer() {
  const navigate=useNavigate()
const dispatch=useDispatch()
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
    <>
     <Box className='bg-red-100 flex justify-between items-center'>
    <Tooltip content="Search users to chat" >
    <Button className="hover:bg-gray-300 ml-4 ">
      <FaSearch className='w-5'/>
    <Text className='md:block hidden  p-3'><Drawer /></Text>
    </Button>
</Tooltip>
<p className='text-2xl'>Talk-ative</p>
<div className='flex items-center '>
  <FaBell className='mr-2 text-2xl'/>
  
  <details className="dropdown ">
  <summary className="btn m-1 bg-transparent ">  <Avatar  variant="solid" name="AKSHAY KUMAR" /></summary>
  <ul className="menu   dropdown-content gap-3 bg-base-100 rounded-box z-[1] w-20   shadow">
    <li className=" hover:bg-gray-200 p-2"><ProfileModel/></li>
    <li className=" hover:bg-gray-200 p-2" onClick={handleLogOut}>Logout</li>
  </ul>
</details>


</div>
    </Box>
    
    </>
   
  );
}

export default SideDrawer;
