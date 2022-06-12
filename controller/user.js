import asyncHandler from "express-async-handler";
import userModel from "../model/user.js";
import bcrypt from "bcryptjs";
import gravatar from "gravatar";
import jwt from "jsonwebtoken";

const getUsers = asyncHandler(async (req, res) => {
    if (req.user.role !== "admin") {
        return res.json({
            msg: "user is not admin"
        })
    }
    const users = await userModel.find()
    res.json(users)
})

const signup = asyncHandler(async (req, res) => {

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


})

const login = asyncHandler(async (req, res) => {
    // email 유무 체크 -> 패스워드 복호화(패스워드 매칭) -> jwt 생성 -> return jwt
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
            // jwt 생성
            const token = await jwt.sign(
                { id: user._id , name: user.name },
                "appletom",
                { expiresIn: "10000000000" }
            )
            res.json({token})
        }
    }
})

const getUserinfo = asyncHandler(async (req, res) => {
    res.json(req.user)

})


export {
    getUsers,
    signup,
    login,
    getUserinfo
}