import React, { useState } from 'react'
import {Link ,  useNavigate } from "react-router-dom"
import { Label , TextInput , Button , Alert , Spinner } from "flowbite-react"
import { signInStart,signInSucess,signInFailure } from '../redux/User/userSlice'
import { useDispatch , useSelector } from 'react-redux'
import OAuth from '../Component/OAuth'
const Signin =() => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const {loading, error:errorMessage}=useSelector(state=>state.user);
  const[formData,setFormData]=useState({});
 
  const handleChange=(e)=>{
    setFormData({...formData,[e.target.id]:e.target.value.trim()})
    // console.log(formData)
  }
const handleSubmit=async(e)=>{
  e.preventDefault();
  if(!formData.email ||!formData.password ){
    return dispatch(signInFailure("All Fields are required"))
  }
  try {
    dispatch(signInStart());
    const res=await fetch("/api/signin",{
    method:"POST",
    headers:{'Content-Type':"application/json"},
    body:JSON.stringify(formData)
    });
    const data=await res.json();
    if(data.success===false){
      dispatch(signInFailure(data.message))
    }
    if(res.ok){
      dispatch(signInSucess(data));
      navigate('/')
    }
  } catch (error) {
    dispatch(signInFailure(error.message))
  }
}
  
  return (
    <div className='min-h-screen mt-20 '>
    <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
{/* For left */}
    <div className='flex-1'>
    <Link to="/" className=' font-bold dark:text-white text-4xl'>
        <span className="rounded-lg text-pink-500 px-1  py-1 bg-gradient-to-r from-indigo-500 to-white">My</span>
        Blog
    </Link>
    <p className='text-md mt-5 text-gray-400'>
    Here you'll find a variety of articles and tutorials on  different topics You can use this site in dark mode too, so relax your eyes and enjoy the post ...Don't forget to drop your valuable feedbacks.
          For making a comment , like You have to Sign Up .
    </p>
    </div>
    {/* For right */}
    <div className='flex-1  '>
      <form  className='flex flex-col gap-4 ' onSubmit={handleSubmit}>
        <div className="">
          <Label value="Your email"/>
<TextInput type="email " placeholder='name@company.com' id='email' onChange={handleChange}/>
          <Label value="Your password"/>
<TextInput type = "password" placeholder='Password' id='password' onChange={handleChange}/>
        </div>
       <Button gradientDuoTone='purpleToPink' type="submit" disabled={loading} >{loading? (
       <>
       <Spinner size='sm'/>
       <span>Loading..</span>
       </>
       ):"Sign-In"}</Button> 
      <OAuth/>
      </form>
      <div className='flex gap-2 text-sm mt-5'>
        <span > Don't Have an account?</span>
       <Link  to="/sign-up" className="text-blue-500">Sign up</Link>
      </div>
      {
        errorMessage && (
          <Alert className='mt-5' color='failure'>{errorMessage}</Alert>
        )
      }
    </div>
    </div>
    </div>
  )
}

export default Signin