import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet , Navigate } from 'react-router-dom'
const Privateroute = () => {
    const {currentUser} = useSelector(state=>state.user);
  return currentUser ? <Outlet /> : <Navigate to="/sign-in"/>;
  }

export default Privateroute
