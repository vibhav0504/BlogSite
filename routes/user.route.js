import express from "express"
import {  updateUser , deleteUser , signout ,getUser ,getAllUser} from "../Controllers.js/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
const router=express.Router();
router.get("/getusers",verifyToken,getAllUser);
router.get("/user/:userId",getUser)
router.put("/update/:userId", verifyToken,updateUser)
router.delete("/delete/:userId", verifyToken,deleteUser)
router.post("/signout",signout)


export default router;