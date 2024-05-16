

const Address=require('../Model/Address')
const Cart=require('../Model/Cart')
const User = require('../Model/User')
const Product=require('../Model/Product')

//initial cart
exports.initialCart=async(req,res)=>{
try{
const {id}=req.user

const exsistingUser=await User.findById(id).populate('savedAddress').exec()
if(!exsistingUser){
    return res.status(400).json({
        message:'No cart found corresponding to the user',
        success:false
    })
  
}
const data={
    totalQuantity:exsistingUser.totalQuantity,
    price:exsistingUser.price,
    items:exsistingUser.items,
    orderHistory:exsistingUser.orderHistory,
    address:exsistingUser.savedAddress
}
return res.status(200).json({
    message:'successfully fetch the cart',
    success:true,
    val:data
})
}
catch(err){
    return res.status(400).json({
        message:err.message,
        success:false
    })
}
}



//update cart
exports.updateCart=async(req,res)=>{
    
    try{
        const {id}=req.user
        const {item,totalQuantity,price}=req.body
const dbUser=await User.findByIdAndUpdate(id,{
items:item,
totalQuantity:totalQuantity,
price:price
},{new:true})

return res.status(200).json({
    val:{
        items:dbUser.items,
        price:dbUser.price,
        totalQuantity:dbUser.totalQuantity
    },
    success:true,
    message:'add to cart successfully'
})
    }
    catch(err){
return res.status(400).json({
    message:err.message,
    success:false
})
    }
}
//order
exports.orderCart=async(req,res)=>{
    try{
const {id}=req.user
const {form,cartData}=req.body
let address
const modeOfPayment=form.modeOfPayment
const savedAddress=await Address.findOne({
    streetAddress:form.streetAddress,
    city:form.city,
    state:form.state,
    pincode:form.pincode,
})

if(savedAddress){
 address=savedAddress
}else{

address=await Address.create({
    fullName:form.fullName,
    email:form.email,
    phone:form.phone,
    streetAddress:form.streetAddress,
    city:form.city,
    state:form.state,
    pincode:form.pincode,
   
})

}

// delete address._id
console.log('addres id :',address._id)
const savedCart=await Cart.create({
   address,
    items:cartData.items,
    price:cartData.price,
    totalQuantity:cartData.totalQuantity,
   paymentMode:modeOfPayment
})
await User.findOneAndUpdate({_id:id,savedAddress:{$ne:address._id}},{
    items:[],
    totalQuantity:0,
    price:0,
    $push:{
savedAddress:address._id,


    }
},{new:true})
const savedUser=await User.findByIdAndUpdate(id,{
    $push:{
        orderHistory:savedCart._id
    }
},{new:true}).populate('savedAddress').exec()
savedCart.user=savedUser._id
await savedCart.save()
address.user=savedUser._id
await address.save()
console.log(modeOfPayment)
return res.status(200).json({
    message:'successfullt order',
    sucess:true,
    val:{
        totalQuantity:0,
        price:0,
        items:[],
        // orderHistory:savedUser.orderHistory,
        orderId:savedCart._id,
        address:savedUser.savedAddress,
        mode:modeOfPayment,
        paymentAmount:savedCart.price,
        cart:savedCart
    }
})
// await savedUser.updateOne()
    }catch(err){
        console.log(err)
return res.status(400).json({
    message:err.message,
    success:false
})
    }
}
//get Cart Historu
exports.getAllCartHistory=async(req,res)=>{
    try{
const {id}=req.user
const savedCart=await Cart.find({
    user:id
}).sort({createdAt:-1})
if(!savedCart){
return res.status(400).json({
    message:'user does not found',
    success:false
})
}

return res.status(200).json({
    items:savedCart.items,
    success:true,
    message:'All history get successfully',
   
    data:savedCart
})
    }
    catch(err){
return res.status(400).json({
    message:err.message,
    success:false
})
    }
}
//increaseQuantity
exports.increaseQuantity=async(req,res)=>{
    try{
        const productId=req.params.id
        const{id}=req.user
const productDetails=await Product.findById(productId)
const updatedData=await User.findOneAndUpdate({_id:id},{
//    
// items:{
//     $cond:{
//         if:{
//             "product._id":{$in:items._id}
//         },
//         then:{
//             $inc:{
//                 "items.quantity":1
//             }
//         },
//         "else":{
//             $push:{items:product}
//             $inc:{
//                totalQuantity:1
//             }
//         }
//     }
// }
//     }
// $set:{
//     "items.$.quantity":product.quantity+1
// },
// $push:{
//     items:product
// }

$set:{
    items:{
        $cond:{
            if:{$in : [productId,"$items._id"]},
            then:{
$push:{
    // items:{
        _id:productId,
quantity:1,
price:productDetails.price,
name:productDetails.name,
imageSrc:productDetails.thumbnail
    // }
}
            },
            else:{
                quantity:{
                    $inc:{}
                },
            }
        }
    }
}
})
if(!productId){
    return res.status(400).json({
        message:"No product found",
        success:false
    })
}

    }
    catch(err){

    }
}
//removeQuantity
exports.removeQuantity=async(req,res)=>{
    console.log('pauch gya ')
    try{
    const productId=req.params.id
    const{id}=req.user
  console.log(productId)
  console.log(id)
    const updatedUser=await User.findByIdAndUpdate(id,{
        
        $inc:{totalQuantity:-1},
       
$pull:{
    items:{_id:productId}
},
price:{$multiply:{
    "$items.price":-1
}}

    },{new:true})
    return res.status(200).json({
        success:true,
        message:'Item remove successfully',
        val:updatedUser
    })
}
catch(err){
    return res.status(400).json({
        success:false,
        message:err.message
    })
}
}