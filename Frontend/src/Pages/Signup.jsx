import React, { useState } from 'react'
import {Link ,  useNavigate } from "react-router-dom"
import { Label, TextInput , Button, Alert, Spinner } from "flowbite-react"
import OAuth from "../Component/OAuth"
const Signup = () => {
  const navigate=useNavigate();
  const[formData,setFormData]=useState({});
  const[errorMessage,setErrorMessage]=useState(null);
  const[loading,setLoading]=useState(false)
  const handleChange=(e)=>{
    setFormData({...formData,[e.target.id]:e.target.value.trim()})
    // console.log(formData)
  }
const handleSubmit=async(e)=>{
  e.preventDefault();
  if(!formData.userName ||!formData.email ||!formData.password ){
    return setErrorMessage("All Fields are required")
  }
  try {
    setLoading(true);
    setErrorMessage(null)
    const res=await fetch("/api/signup",{
    method:"POST",
    headers:{'Content-Type':"application/json"},
    body:JSON.stringify(formData)
    });
    const data=await res.json();
    if(data.success===false){
      setLoading(false);
      return setErrorMessage(data.message);
    }
    setLoading(false);
    if(res.ok){
      navigate('/sign-in');
    }
  } catch (error) {
    setLoading(false);
    return setErrorMessage(error.message)
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
    <p className='text-md mt-5 text-gray-500'>
    Here you'll find a variety of articles and tutorials on  different topics You can use this site in dark mode too, so relax your eyes and enjoy the post ...Don't forget to drop your valuable feedbacks.
          For making a comment , like You have to Login/Sign-IN .
    </p>
    </div>
    {/* For right */}
    <div className='flex-1  '>
      <form  className='flex flex-col gap-4 ' onSubmit={handleSubmit}>
        <div className="">
          <Label value="Your Username"/>
<TextInput type="text " placeholder='Username' id='userName' onChange={handleChange}/>
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
       ):"Sign-Up"}</Button> 
       <OAuth/>
      </form>
      <div className='flex gap-2 text-sm mt-5'>
        <span >Have an account?</span>
       <Link  to="/sign-in" className="text-blue-500">Sign In</Link>
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

export default Signup