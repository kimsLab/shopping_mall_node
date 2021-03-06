import express from "express"
import bodyParser from "body-parser";
import morgan from "morgan"
import dotEnv from "dotenv"
dotEnv.config()

const app = express()

import connectDB from "./config/datebase.js";

import productRoute from "./routes/product.js"
import orderRoute from "./routes/order.js"
import userRoute from "./routes/user.js"


// datebase 연결
connectDB()

// middleware 설정
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"))
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


// router
app.use("/product", productRoute)
app.use("/order", orderRoute)
app.use("/user", userRoute)




const port = process.env.PORT || 7777

app.listen(port, console.log(`server started at ${port}`))


// code build 순서(규칙)
// 1. 위에서 아래로
// 2. = 기준으로 우측에서 좌측으로 치환한다
// 3. .은 하위 매소드를 호출하는 뜻이다
// 4. () 는 함수들의 모음을 뜻한다
// 5. , 는 그리고로 해석
