import React from 'react'
import { Button } from 'flowbite-react'
import { AiFillGoogleCircle } from 'react-icons/ai'
import { GoogleAuthProvider , getAuth , signInWithPopup } from "firebase/auth"
import { app } from '../firebase'
import { useDispatch} from "react-redux"
import { signInSucess } from '../redux/User/userSlice'
import { useNavigate } from "react-router-dom"

const OAuth = () => {
    const auth=getAuth(app);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const handleGoogleClick= async()=>{
         const provider=new GoogleAuthProvider();
         provider.setCustomParameters({prompt:'select_account'})
         try {
            const resultsfromGoogle = await signInWithPopup(auth,provider);
            const res= await fetch("/api/google",{
             method:'POST',
             headers:{'Content-Type':'application/json'},
             body:JSON.stringify({
             name:resultsfromGoogle.user.displayName,
             email:resultsfromGoogle.user.email,
             imageUrl:resultsfromGoogle.user.photoURL,
        }),
  });
  const data=await res.json();
  if(res.ok){
    dispatch(signInSucess(data))
    navigate('/')
  }
         } catch (error) {
            console.log(error)
         }
    }
  return (
    <Button gradientDuoTone='pinkToOrange' type='button' outline onClick={handleGoogleClick}>
      <AiFillGoogleCircle className='text-3xl mr-2'/><span className='mt-1'>Continue With Google</span>
    </Button>
  )
}

export default OAuth