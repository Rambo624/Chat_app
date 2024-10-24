
import React, { useState } from 'react'
import { useRef } from 'react'
import axiosInstance from '../utils/axiosInstance'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'
function Login() {
  const emaillogin=useRef()
  const passwordlogin=useRef()
  const email=useRef()
  const password=useRef()
  const photo=useRef()
  const name=useRef()
  const navigate=useNavigate()
  const [successMsg,setSuccessmsg]=useState("")
const dispatch=useDispatch()
async function handleSignup(){
  try {
    const data={
      name:name.current.value,
      email:email.current.value,
      password:password.current.value,
      photo:photo.current.value
    }
    const response= await axiosInstance({method:"POST",url:"/signup",data:data})
if(response.status===200){
  setSuccessmsg("User created Successfully")
  setTimeout(() => {
    setSuccessmsg("")
  }, 5000);
}
  } catch (error) {
    console.log(error)
  }
}

async function handleLogin(){
  try {
    const data={
      email:emaillogin.current.value,
      password:passwordlogin.current.value,
    }
    const response= await axiosInstance({method:"POST",url:"/login",data:data})
    console.log(response)
if(response.status===200){
  console.log(response.data)
  dispatch(addUser(response.data.data))
  
navigate("/home")
}
  } catch (error) {
    console.log(error)
  }
}

  return (
    <div className="flex flex-col bg-[url(https://www.rabstol.net/uploads/gallery/main/648/rabstol_net_god_of_war_12.jpg)] bg-cover bg-center h-screen">
      <div className='mx-auto bg-white w-[50%] p-3 rounded-lg text-center mt-10'>
        <h1 className='text-3xl'>Talk-ative</h1>
      </div>
      <div className='mx-auto bg-white  w-[50%] p-3 rounded-lg  mt-5'>


        <div role="tablist" className="tabs tabs-bordered ">
          
          <input type="radio" name="my_tabs_1" role="tab" className="tab " aria-label="Signup" />
          <div role="tabpanel" className="tab-content p-10">
            <div className=' text-center'>
              <label htmlFor="" className='text-left'>Name</label><br />
              <input ref={name} className='border border-gray-200 p-2 rounded-md' type="text" placeholder='Enter Name' /><br />
              <label htmlFor="">Email</label> <br />
              <input ref={email} className='border border-gray-200 p-2 rounded-md' type="text" placeholder='Enter Email' /><br />
              <label htmlFor="">Password</label><br />
              <input ref={password} className='border border-gray-200 p-2 rounded-md' type="password" placeholder='Enter password' /><br />
              <label htmlFor="">Profile Photo</label><br />
              <input ref={photo} className='border border-gray-200 p-2 rounded-md' type="text" placeholder='Enter photo Url' /><br />
              <button onClick={handleSignup} className='p-2 bg-blue-500 text-white rounded-lg mt-5' >Signup</button>
              <p className='text-green-400'>{successMsg}</p>
            </div>
          </div>

          <input
            type="radio"
            name="my_tabs_1"
            role="tab"
            className="tab"
            aria-label="Login"
            defaultChecked />
          <div role="tabpanel" className="tab-content p-10">
          <div className=''>
              
              <label  htmlFor="">Email</label> <br />
              <input ref={emaillogin} className='border border-gray-200 p-2 rounded-md' type="text" placeholder='Enter Email' /><br />
              <label htmlFor="">Password</label><br />
              <input ref={passwordlogin} className='border border-gray-200 p-2 rounded-md' type="password" placeholder='Enter password' /><br />
           
              <button onClick={handleLogin} className='p-2 bg-blue-500 text-white rounded-lg mt-5' >Login</button>
            </div>
          </div>



        </div>

      </div>
    </div>
  )
}

export default Login