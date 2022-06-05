import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import userModel from "../model/user.js"

const protect = asyncHandler(async (req, res, next) => {
    let token
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith(`Bearer`)
    ) {
        try {
            token = req.headers.authorization.split(` `)[1]
            const decoded = jwt.verify(token, `appletom`)
            req.user = await userModel.findById(decoded.id)
            next()
        } catch (err) {
            res.json({
                msg: "invailied token"
            })
        }
    } else {
        res.json({
            msg: "not auth, no token"
        })
    }
})

export default protect