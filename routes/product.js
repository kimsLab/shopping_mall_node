import express from "express";

const router = express.Router()


// CRUD create, read, update, delete 뜻하는 용어

// product 데이터 가져오는 api
router.get("/", (req, res) => {
    res.json({
        msg: "product get"
    })
})

// product 데이터를 등록해주는 api
router.post("/", (req, res) => {
    res.json({
        msg: "created product"
    })
})

// product 데이터를 수정하는 api
router.put("/", (req, res) => {
    res.json({
        msg: "updated product"
    })
})

// product 데이터를 삭제하는 api
router.delete("/", (req, res) => {
    res.json({
        msg: "deleted product"
    })
})

export default router