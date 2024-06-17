import express from "express"
import { createComment , getComments , likeComment , editComment ,deleteComment , getAllComments} from "../Controllers.js/comment.controller.js"
import {verifyToken} from "../utils/verifyUser.js"
const  router=express.Router()
router.post("/createcomment",verifyToken,createComment);
router.get("/getcomments/:postId",getComments)
router.get("/getallcomments",verifyToken,getAllComments);
router.put('/likecomment/:commentId',verifyToken,likeComment)
router.put('/editcomment/:commentId',verifyToken,editComment)
router.delete('/deletecomment/:commentId',verifyToken,deleteComment)

export default router;