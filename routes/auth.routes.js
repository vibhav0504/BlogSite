import express from "express";
import { signup , signin ,authenticate } from "../Controllers.js/auth.controller.js";
 
const router=express.Router();
router.post("/signup",signup)
router.post("/signin",signin)
router.post("/google",authenticate)

export default router;