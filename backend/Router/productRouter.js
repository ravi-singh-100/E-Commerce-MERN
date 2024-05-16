const express=require('express')
const {getAllHomePageProducts,getAllFilters,getAllSortOptions,getProductDetail} =require('../Controllers/productController')
const router=express.Router()
router.get('/getAllProducts',getAllHomePageProducts)

router.get('/products/filters',getAllFilters)
router.get('/products/allsortoptions',getAllSortOptions)
router.get('/product/:id',getProductDetail)
module.exports=router