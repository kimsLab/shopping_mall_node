import express from "express"

const app = express()


app.get("/", (req, res) => {
    res.json({
        icon: "my first api"
    })
})



const port = 8888

app.listen(port, console.log("server started"))


// code build 순서(규칙)
// 1. 위에서 아래로
// 2. = 기준으로 우측에서 좌측으로 치환한다
// 3. .은 하위 매소드를 호출하는 뜻이다
// 4. () 는 함수들의 모음을 뜻한다
// 5. , 는 그리고로 해석
