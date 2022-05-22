import express from "express"

const app = express()




const port = 8888

app.listen(port, console.log("server started"))


// code build 순서(규칙)
// 1. 위에서 아래로
// 2. = 기준으로 우측에서 좌측으로 치환한다
