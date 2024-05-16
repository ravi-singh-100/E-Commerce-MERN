const mongoose=require('mongoose')

const cartSchema=new mongoose.Schema({
    items:{
type:[Object]
    },
    totalQuantity:{
type:Number,
required:true
    },
    price:{
        type:Number,
 required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    address:{
        type:mongoose.Schema.Types.Mixed,
        required:true
    },

    createdAt:{
        type:Date,
        default:Date.now()
    },status:{
        type:String,
        enum:['ordered','dispatched','delivered','cancelled'],
        default:'ordered'
    },
    paymentMode:{
        type:String,
        // enum:['cash','online'],
        required:true
    }
})
module.exports=mongoose.model('Cart',cartSchema)