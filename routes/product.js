import express from "express";
import asyncHandler from "express-async-handler";
import productModel from "../model/product.js"

const router = express.Router()


// CRUD create, read, update, delete 뜻하는 용어

// 전체 product 데이터 가져오는 api
router.get("/", asyncHandler(async (req, res) => {

    const products = await productModel.find()

    res.json({
        msg: "product get",
        count: products.length,
        products: products
    })
}))

// 상세 product 데이터 가져오는 api
router.get("/:productId", asyncHandler(async (req, res) => {
    const id = req.params.productId
    const product = await productModel.findById(id)
    res.json(product)

}))


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
router.put("/:productid", asyncHandler(async (req, res) => {
    const id = req.params.productid
    await productModel.findByIdAndUpdate(id, {
        name: req.body.name,
        price: req.body.price,
        brand: req.body.brand,
        category: req.body.category
    })

    res.json({
        msg: "updated product"
    })
}))

// 상세 product 데이터를 삭제하는 api
router.delete("/:productid", asyncHandler(async (req, res) => {
   const id = req.params.productid
    await productModel.findByIdAndRemove(id)
    res.json({
        msg: "deleted product"
    })
}))

// 전체 product 데이터를 삭제하는 api
router.delete("/", asyncHandler(async (req, res) => {
    await productModel.deleteMany()
    res.json({
        msg: "deleted product model"
    })



}))
export default router