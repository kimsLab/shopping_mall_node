import asyncHandler from "express-async-handler";
import productModel from "../model/product.js";

const getProducts = asyncHandler(async (req, res) => {

    const products = await productModel.find()

    res.json({
        msg: "product get",
        count: products.length,
        products: products
    })
})

const getProduct = asyncHandler(async (req, res) => {
    const id = req.params.productId
    const product = await productModel.findById(id)
    res.json(product)

})

const createProduct = asyncHandler(async (req, res) => {


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
})

const updateProduct = asyncHandler(async (req, res) => {
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
})

const deleteProducts = asyncHandler(async (req, res) => {
    await productModel.deleteMany()
    res.json({
        msg: "deleted product model"
    })
})

const deleteProduct = asyncHandler(async (req, res) => {
    const id = req.params.productid
    await productModel.findByIdAndRemove(id)
    res.json({
        msg: "deleted product"
    })
})


export {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProducts,
    deleteProduct
}