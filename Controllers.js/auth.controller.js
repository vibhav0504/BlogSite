import User from "../Models/user.models.js";
import { errorHandler } from "../utils/error.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
export const signup = async(req,res,next)=>{
const {userName,email,password}=req.body;
if ([userName,email,password].some((e) => e?.trim() === "")) {
  next (errorHandler(400, "All fields are required"));
  }

const userIsExisting = await User.findOne({ $or: [ {userName} ,{ email }] });
if(userIsExisting){
 return next (errorHandler(402,"User Already Exists "))
}
const hashedPassword = await bcrypt.hashSync(password, 10);
const user = await User.create({
    userName,
    email,
    password:hashedPassword,
  });
  const createdUser = await User.findById(user._id);
  if (!createdUser) {
  return  next (errorHandler(500, "Something went Wrong While registering"));
  }
  return res.json(" User Logged In SuccessFully ");
} 
export const signin=async (req,res,next)=>{
  const {  email , password }=req.body;
  if(!email || ! password || !email==="" || !password===""  ){
    return   next (errorHandler(400, "All Fields are required"));
  }
  try {
    const finduser=await User.findOne({email});
    if(!finduser){
      return   next (errorHandler(404, "User Not Found"));
    }
    const validPassword=bcrypt.compareSync(password,finduser.password);
    if(!validPassword){
      return   next (errorHandler(400, "Invalid Password"));
    }
    const token=jwt.sign(
      {id:finduser._id , isAdmin:finduser.isAdmin},process.env.JWT_SECRET)

      const { password:pass ,...rest}=finduser._doc;
      res.status(200).cookie("access_token",token,{
        httpOnly:true}).json(rest);
  } catch (error) {
    next(error);
  }
}
export const authenticate= async (req,res,next)=>{
  const {name,email,imageUrl}=req.body;
  try {
   const user=await User.findOne({email});
   if(user){
    const token=jwt.sign({id:user._id , isAdmin:user.isAdmin},process.env.JWT_SECRET);
    const { password,...rest}=user._doc;
    res.status(200).cookie('access_token',token,{
     httpOnly:true,
   }).json(rest);
   }
   else{
     const generatedPassword=Math.random().toString(36).slice(-8);
     const hashedPassword=bcrypt.hashSync(generatedPassword,10);
     const newUser=new User({
       userName:name.toLowerCase().split(' ').join('')+Math.random().toString(9).slice(-4),
       email,
       password:hashedPassword,
       profilePicture:imageUrl,
     });
     await newUser.save();
     const token=jwt.sign({id:newUser._id, isAdmin:newUser.isAdmin},process.env.JWT_SECRET);
     const{password,...rest}=newUser._doc;
     res.status(200).cookie('access_token',token,{
      httpOnly:true,
    }).json(rest);
   }
  } catch (error) {
   next(error)
  }
}