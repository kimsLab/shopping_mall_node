import express from "express";
import asyncHandler from "express-async-handler";
import orderModel from "../model/order.js"
import protect from "../middleware/authMiddleware.js";

const router = express.Router()

// 전체 order 데이터를 가져오는 api
router.get("/", asyncHandler(async (req,res) => {
    const orders = await orderModel.find().populate('product', ['name', 'price', 'brand'])
    res.json({
        msg: "order get",
        orders: orders
    })
}))

// 상세 order 데이터를 가져오는 api
router.get("/:orderId", asyncHandler(async (req, res) => {
    const id = req.params.orderId
    const order = await orderModel.findById(id).populate('product')
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

// order 데이터를 수정하는 api
router.put("/:orderId", asyncHandler(async (req, res) => {
    const id = req.params.orderId
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
