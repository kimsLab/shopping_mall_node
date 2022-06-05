import express from "express";
import asyncHandler from "express-async-handler";
import userModel from "../model/user.js"
import bcrypt from "bcryptjs"
import gravatar from "gravatar"

const router = express.Router()

//CRUD
//회원가입
router.post("/signup", asyncHandler(async (req, res) => {

    // email 유무 체크 -> 패스워드 암호화 -> 프로필 이미지 자동 생성

    const user = await userModel.findOne({email: req.body.email})

    if (user) {
        return res.json({
            msg: "email existed"
        })

    } else {

        // 패스워드 암호화
        const hashedPassword = await bcrypt.hash(req.body.password, 10)

        // 프로필 이미지 제너레이터
        const profileImg = await gravatar.url(req.body.email, {
            s: `200`,
            r: `pg`,
            d: `mm`,
            protocol: `https`
        })


        const newUser = new userModel({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            profileImg: profileImg
        })

        await newUser.save()

        res.json({
            msg: "created user",
            userInfo: newUser
        })

    }


}))


//로그인
router.post("/login", asyncHandler(async (req, res) => {
    // email 유무 체크 -> 패스워드 복호화(패스워드 매칭)
    const user = await userModel.findOne({email: req.body.email})

    if (!user) {
        return res.json({
            msg: "register not user"
        })
    } else {

        const isMatched = await bcrypt.compare(req.body.password, user.password)

        if (!isMatched) {
            return res.json({
                msg: "password is not matched"
            })
        } else {
            res.json(user)
        }
    }
}))










export default router