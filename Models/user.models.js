import mongoose from "mongoose";
const UserModel= new mongoose.Schema(
    {
        userName:{
            type:String,
            required:true,
            unique:true,
        },
       email: {
        type:String,
        required:true,
        unique:true
        },
        password:{
            type:String,
            required:true,
        },
        profilePicture:{
            type:String,
            default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4n9vUNCLmnEJ5pKIl0VUwTPofdPGIXPf2pA&s",
        },
        isAdmin:{
            type:Boolean,
            default:false,
        }
        
    },{timestamps:true});
const User=mongoose.model("User",UserModel)
export default User;