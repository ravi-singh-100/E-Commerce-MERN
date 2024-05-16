const express=require('express')
const { isAuth ,isAdmin,isCustomer} = require('../middlewares/auth')
const {initialCart,updateCart,orderCart, increaseQuantity,getAllCartHistory,removeQuantity}=require('../Controllers/cartController')
const router=express.Router()
router.get('/initial-cart',isAuth,initialCart)

router.put('/update-cart',isAuth,isCustomer,updateCart)
router.post('/order',isAuth,orderCart)
router.get('/getAllCart',isAuth,getAllCartHistory)
router.put('/increase-quantity',isAuth,increaseQuantity)
router.put('/remove-quantity/:id',isAuth,isCustomer,removeQuantity)
module.exports=router