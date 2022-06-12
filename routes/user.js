import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
    getUsers,
    signup,
    login,
    getUserinfo
} from "../controller/user.js";


const router = express.Router()



//CRUD

// 전체 유저 리스트(관리자만)
router.get("/list", protect, getUsers)





//회원가입

router.post("/signup", signup)


//로그인
router.post("/login", login)

// 로그인한 사람의 정보 불러오기
router.get("/", protect, getUserinfo)









export default router