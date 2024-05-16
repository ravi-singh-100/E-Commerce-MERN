const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({
    email:{
        type:String,required:true
    },
    password:{
        type:String,
        required:true
    },
    confirmPassword:{
        type:String,
        required:true
    },
    items:{
        type:[Object]
    },
    totalQuantity:{
        type:Number,
        default:0
    },
    price:{
        type:Number,
        default:0
    },
    orderHistory:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Cart'
    }],
    savedAddress:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Address'
    }],
    role:{
        type:String,
        enum:['customer','admin'],
        default:'customer'
    },

})
module.exports=mongoose.model('User',userSchema)