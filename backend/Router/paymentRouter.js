const express=require('express')
const {stripePaymentController}=require('../Controllers/stripeController')
const{isAuth,isCustomer,isAdmin}=require('../middlewares/auth')
const router=express.Router()
router.post('/create-payment-intent',isAuth,isCustomer,stripePaymentController)
module.exports=router