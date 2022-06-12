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

    const {name, price, brand, category} = req.body

    const newProduct = new productModel({
        name,
        price,
        brand,
        category,
    })

    await newProduct.save()

    res.json({
        msg: "created product",
        newProduct
    })
})

const updateProduct = asyncHandler(async (req, res) => {
    const id = req.params.productid
    const {name, price, brand, category} = req.body
    await productModel.findByIdAndUpdate(id, {
        name,
        price,
        brand,
        category
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