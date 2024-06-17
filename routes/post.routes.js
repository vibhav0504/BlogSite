import express from "express"
import {verifyToken} from "../utils/verifyUser.js"
const  router=express.Router()
import { create , getPosts , deletePost , updatePost } from "../Controllers.js/post.controller.js"
router.post("/create",verifyToken,create);
router.get("/getposts",getPosts)
router.delete("/deletepost/:postId/:userId",verifyToken,deletePost)
router.put("/updatepost/:postId/:userId",verifyToken,updatePost)

export default router;