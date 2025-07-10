import express from "express";
import { authMiddleware } from '../middleware/auth.middlewar.js'
import { getAllUserUrls } from "../controller/user.controller.js";
const router = express.Router();

router.post("/urls", authMiddleware, getAllUserUrls)


export default router;