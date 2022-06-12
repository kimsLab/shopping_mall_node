import express from "express";
import {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProducts,
    deleteProduct
} from "../controller/product.js";

const router = express.Router()


// CRUD create, read, update, delete 뜻하는 용어

// 전체 product 데이터 가져오는 api
router.get("/", getProducts)

// 상세 product 데이터 가져오는 api
router.get("/:productId", getProduct)

// product 데이터를 등록해주는 api
router.post("/", createProduct)

// product 데이터를 수정하는 api
router.put("/:productid", updateProduct)

// 상세 product 데이터를 삭제하는 api
router.delete("/:productid", deleteProduct)

// 전체 product 데이터를 삭제하는 api
router.delete("/", deleteProducts)



export default router