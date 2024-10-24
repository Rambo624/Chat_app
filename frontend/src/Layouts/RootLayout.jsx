import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice';
import NavBar from '../Components/NavBar';

function RootLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  async function fetchUser() {
    try {
    
      if (!user) {
    
        const response = await axiosInstance({ method: "GET", url: "/profile" });

        if (response.status === 200) {
          dispatch(addUser(response.data.data));
          console.log("HELLO")
        }
      }
    } catch (error) {
      console.error(error); // Log error for debugging
      navigate("/");
    }
  }

  useEffect(() => {
    fetchUser();
  }, [user]); 

  return (
  
    <div>
        <NavBar/>
      <Outlet />
    </div>
  );
}

export default RootLayout;
