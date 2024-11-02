import React, { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice';

function RootLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((store) => store.user);

  async function fetchUser() {
    try {
      const response = await axiosInstance({ method: 'GET', url: '/profile' });
      if (response.status === 200) {
        dispatch(addUser(response.data.data));
      //  console.log('HELLO');
      }
    } catch (error) {
      console.error(error);
      navigate('/');
    }
  }

  useEffect(() => {
    fetchUser();
  }, [location.pathname]); // re-run when location changes

  return (
    <div>
      <Outlet />
    </div>
  );
}

export default RootLayout;
