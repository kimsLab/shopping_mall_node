import express from "express";

const router = express.Router()

// order 데이터를 가져오는 api
router.get("/", (req,res) => {
    res.json({
        msg: "order get"
    })
})

// order 데이터를 등록하는 api
router.post("/", (req,res) => {

    const newOrder = {
        number: req.body.number,
        color: req.body.color,
        title: req.body.title,
        description: req.body.desc
    }



    res.json({
        msg: "order post",
        orderInfo: newOrder
    })
})

// order 데이터를 수정하는 api
router.put("/", (req, res) => {
    res.json({
        msg: "updated order"
    })
})

// order 데이터를 삭제하는 api
router.delete("/", (req, res) => {
    res.json({
        msg: "deleted oreder"
    })
})




export default router
