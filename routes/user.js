import express from "express";
import asyncHandler from "express-async-handler";
import userModel from "../model/user.js"

const router = express.Router()

//CRUD
//회원가입
router.post("/signup", asyncHandler(async (req, res) => {

}))


//로그인
router.post("/login", asyncHandler(async (req, res) => {

}))










export default router