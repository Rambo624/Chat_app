import React from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { removeUser } from '../utils/userSlice';
import { Box,Text } from '@chakra-ui/react';


import {  FaSearch } from 'react-icons/fa';

import { Avatar } from "./avatar"
import { useDispatch,useSelector } from 'react-redux';

import ProfileModel from './ProfileModel';
import Drawer from './Drawer';
import { removeChat } from '../utils/chatSlice';
import BelldropDown from './BelldropDown';
function SideDrawer({fetchchat}) {
  const navigate=useNavigate()
const dispatch=useDispatch()
const user=useSelector((store)=>store.user)
const notification=useSelector((store)=>store.notification)
  async function handleLogOut(){
    try {
      const response=await axiosInstance({url:"/logout",method:"POST"})
      if(response.status===200){

navigate("/")
dispatch(removeUser())
dispatch(removeChat())
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
     <Box className='bg-white flex justify-between items-center'>
  
    <button className="hover:bg-gray-300 ml-4 flex items-center ">
      <FaSearch className='w-5'/>
    <Text className='md:block hidden  p-3'><Drawer fetchchat={fetchchat} /></Text>
    </button>

<p className='text-2xl'>Talk-ative</p>
<div className='flex items-center '>
<button>

<BelldropDown/>

</button>

  <details className="dropdown ">
  <summary className="btn m-1 bg-transparent ">  <Avatar  variant="solid" name={user?.name} /></summary>
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
