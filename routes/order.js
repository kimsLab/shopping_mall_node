import express from "express";
import asyncHandler from "express-async-handler";
import orderModel from "../model/order.js"
import protect from "../middleware/authMiddleware.js";

const router = express.Router()

// 전체 order 데이터를 가져오는 api
router.get("/", protect, asyncHandler(async (req,res) => {
    console.log(req.user)
    if (req.user.role !== "admin") {
        return res.json({
            msg: "your is not admin"
        })
    }
    const orders = await orderModel.find().populate('product', ['name', 'price', 'brand'])
    res.json({
        msg: "order get",
        orders: orders
    })
}))

// 상세 order 데이터를 가져오는 api
router.get("/:orderId", protect, asyncHandler(async (req, res) => {
    const id = req.params.orderId
    const order = await orderModel.findById(id).populate('product')
    if (order.user !== req.user._id) {
        return res.json({
            msg: " this order is not yours"
        })
    }
    res.json(order)
}))


// order 데이터를 등록하는 api
router.post("/", protect, asyncHandler(async (req,res) => {

    const newOrder = new orderModel({
       product : req.body.product,
        user : req.user._id,
        qty : req.body.qty,
    })

    await newOrder.save()


    res.json({
        msg: "order post",
        orderInfo: newOrder
    })
}))

// order 데이터를 수정하는 api(에러 수정 필요)
router.put("/:orderId", protect, asyncHandler(async (req, res) => {

    const id = req.params.orderId
    const order = await orderModel.findById(req.params.orderId)
    console.log(order)
    if (order.user !== req.user._id) {
        return res.json({
            msg: "this order is not yours"
        })
    }
    await orderModel.findByIdAndUpdate(id,{
        product: req.body.porduct,
        qty: req.body.qty,
    })

    res.json({
        msg: "updated order"
    })
}))

// 상세 order 데이터를 삭제하는 api
router.delete("/:orderId", asyncHandler(async (req, res) => {
    const id = req.params.orderId
    await orderModel.findByIdAndRemove(id)
    res.json({
        msg: "deleted oreder"
    })
}))

// 전체 order 데이터를 삭제하는 api
router.delete("/", asyncHandler(async (req, res) => {
    await orderModel.deleteMany()
    res.json({
        msg: "deleted order model"
    })



}))



export default router
