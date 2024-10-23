import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import axiosInstance from '../utils/axiosInstance'
function RootLayout() {

const navigate=useNavigate()
async function fetchUser(){
    try {
       const response=await axiosInstance({method:"GET",url:"/profile"}) 
       
    } catch (error) {
        navigate("/")
    }
}

useEffect(()=>{
fetchUser()
},[])

  return (
    <div>
<Outlet/>
    </div>
  )
}

export default RootLayout