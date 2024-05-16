const Cart = require('../Model/Cart')
const Otp = require('../Model/Otp')
const Product=require('../Model/Product')
const User = require('../Model/User')
const otpGenerator=require('otp-generator')
//getAllHomeProducts
// exports.getAllHomeProducts=async(req,res)=>{

// }
//add new product
exports.addNewProduct=async(req,res)=>{
    try{
        const {brand,category,description,discountPercentage,price,rating,stock,title,image1,image2,image3,thumbnail}=req.body
        if(!brand||!category||!description||!discountPercentage||!price||!rating||!stock||!title||!image1||!image2||!image3||!thumbnail){
            return res.status(400).json({
                success:false,
                message:'All fields are required'
            })
    }
    const product=new Product({
        brand,category,description,discountPercentage,price,rating,stock,title,thumbnail,
        images:[image1,image2,image3]
    })
 const savedProduct=await product.save()
 return res.status(200).json({
    message:'New Product added successfully',
    success:true,
    data:savedProduct
 })
    }
    catch(err){
        return res.status(400).json({
            success:false,
            message:err.message
        })  
    }
}
//edit products
exports.editProduct=async(req,res)=>{
    try{

const productId=req.params.id
// const savedProduct=await Product.findById(productId)
// if(!savedProduct){
//     return res.status(400).json({
//         message:'Product does not found',
//         success:false
//     })
// }

const {brand,category,description,discountPercentage,price,rating,stock,title,image1,image3,image2,thumbnail}=req.body
if(!brand||!category||!description||!discountPercentage||!price||!rating||!stock||!title||!image1||!image2||!image3||!thumbnail){
    return res.status(400).json({
        success:false,
        message:'All fields are required'
    })
}
const response=await Product.findByIdAndUpdate(productId,{
    images:[image1,image2,image3],
    category,
  brand,
   description,
   discountPercentage,
   price,rating,stock,title,thumbnail
})

return res.status(200).json({
    success:true,
    message:'Product edit successfully',
    data:response
})
    }
    catch(err){
        return res.status(400).json({
            message:err.message,
            success:false
        })
    }
}
//send otp
exports.sendOTP=async(req,res)=>{
    try{
const {email,confirmPassword,password}=req.body

const exsistingUser=await User.findOne({email})
if(exsistingUser){
    return res.status(400).json({
        message:'User already exsist please sign in',
        success:false
    }
    )
}
if(!confirmPassword||!email||!password){
    return res.status(400).json({
        success:false,
        message:'All fields are required'
    })
}
if(password!==confirmPassword){
    return res.status(400).json({
        success:false,
        message:'Password and Confirm Password does not match'
    })
}
const otp=otpGenerator.generate(6,{
    specialChars:false
})
const newOtp=new Otp({
    email,otp
})
await newOtp.save()
return res.status(200).json({
    success:true,
    message:'OTP send successfully'
})
    }
    catch(err){
        return res.status(400).json({
            success:false,
            message:err.message
        })
    }
}
//getAllOrders
exports.getAllOrders=async(req,res)=>{
try{
    const dbAllOrders=await Cart.find({}).sort({createdAt:1}).populate('address').exec()
return res.status(200).json({
    data:dbAllOrders,
    success:true,
    message:'All orders fetched successfully'
})
}catch(err){
    return res.status(400).json({
        message:err.message,
        success:false
    })
}
}
//getOrderType
exports.getOrderType=async(req,res)=>{
    try{
        const orderType =req.query.status
        const dbAllOrders=await Cart.find({status:orderType}).sort({createdAt:1}).populate('address').exec()
    return res.status(200).json({
        data:dbAllOrders,
        success:true,
        message:'All orders fetched successfully'
    })
    }catch(err){
        return res.status(400).json({
            message:err.message,
            success:false
        })
    
}
}
//getRemainingOrders
// exports.getRemainingOrders=async(req,res)=>{
//     try{
// const dbRemainingOrders=await Cart.find({status:'ordered'}).sort({createdAt:1}).populate('address').exec()
// return res.status(200).json({
//     message:'Remaing Orders fetched successfully',
//     success:true,
//     data:dbRemainingOrders
// })
//     }
//     catch(err){
//         return res.status(400).json({
//             message:err.message,
//             success:false
//         })
//     }
// }
//getAllDispatchedOrders
// exports.getAllDispatchedOrders=async(req,res)=>{
//     try{
// const dbDispatchedOrders=await Cart.find({status:'dispatched'}).sort({createdAt:1}).populate('address').exec()
// return res.status(200).json({
//     message:'Remaing Orders fetched successfully',
//     success:true,
//     data:dbDispatchedOrders
// })   
// }
//     catch(err){
//         return res.status(400).json({
//             message:err.message,
//             success:false
//         })
//     }
// }
//getAllDeliveredOrders
// exports.getAllDeliveredOrders=async(req,res)=>{
//     try{
//         const dbDeliveredOrders=await Cart.find({status:'delivered'}).sort({createdAt:1}).populate('address').exec()
//         return res.status(200).json({
          
//             message:'Remaing Orders fetched successfully',
//             success:true,
//             data:dbDeliveredOrders,
    
//         })  
//     }
//     catch(err){
//         return res.status(400).json({
//             message:err.message,
//             success:false,
    
//         })  
//     }
// }
//getAllCancelledOrders
// exports.getAllCancelledOrders=async(req,res)=>{
//     try{
//         const dbDeliveredOrders=await Cart.find({status:'cancelled'}).sort({createdAt:1}).populate('address').exec()
//         return res.status(200).json({
          
//             message:'Cancelled Orders fetched successfully',
//             success:true,
//             data:dbDeliveredOrders,
    
//         })  
//     }
//     catch(err){
//         return res.status(400).json({
//             message:err.message,
//             success:false
//         })  
//     } 
// }
//changeStatus
exports.changeStatus=async(req,res)=>{
    try{
        const{id,status}=req.body
        if(!id||!status){
            return res.status(400).json({
                success:false,
                message:'Please fill all the fields'
            })
        }
        if(!(status!=='ordered'||status!=='delivered'||status!=='dispatched'||status!=='cancelled')){
            return res.status(400).json({
                success:false,
                message:'Wrong option selected'
            })
        }
  await Cart.findByIdAndUpdate(id,{
        status:status
     })
    //  console.log('nfuoabnfonao')
    const savedCart=await Cart.find({}).sort({createdAt:1}).populate('address').exec()
    const dispatchedCart=await Cart.find({status:'dispatched'}).sort({createdAt:1}).populate('address').exec()
    // console.log(savedCart)
    // console.log(dispatchedCart)
return res.status(200).json({
    message:'Status changed successfully',
    success:true,
    orders:savedCart,
    dispatchedOrders:dispatchedCart
})
    }
    catch(err){
        console.log(err)
return res.status(400).json({
  
    success:false,
    message:err.message
})
    }
}

//deleteProduct
exports.deleteProduct=async(req,res)=>{
    try{
const {id}=req.params
const savedProduct=await Product.findByIdAndUpdate(id,{
    delete:true
})
return res.status(200).json({
    success:true,
    message:"Product deleted succcessfully"
})
    }
    catch(err){
return res.status(400).json({
    success:false,
    message:err.message
})
    }
}
//undoDeleteProduct
exports.undoDeleteProduct=async(req,res)=>{
    try{
        const {id}=req.params
        const savedProduct=await Product.findByIdAndUpdate(id,{
            delete:false
        })
        return res.status(200).json({
            success:true,
            message:"Product retrieved succcessfully"
        })
            }
            catch(err){
        return res.status(400).json({
            success:false,
            message:err.message
        })
            }
}