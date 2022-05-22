import express from "express";
import asyncHandler from "express-async-handler";
import productModel from "../model/product.js"

const router = express.Router()


// CRUD create, read, update, delete 뜻하는 용어

// product 데이터 가져오는 api
router.get("/", (req, res) => {
    res.json({
        msg: "product get"
    })
})

// product 데이터를 등록해주는 api
router.post("/", asyncHandler(async (req, res) => {


    const newProduct = new productModel({
        name: req.body.name,
        price: req.body.price,
        brand: req.body.brand,
        category: req.body.cate,
    })

    await newProduct.save()

    res.json({
        msg: "created product",
        productInfo: newProduct
    })
}))

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