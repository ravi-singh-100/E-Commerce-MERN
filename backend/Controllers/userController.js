// const user =require('../Model/User')
const cart=require('../Model/Cart')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const { sendMail } = require('../utils/sendEmail')
const User = require('../Model/User')
const Otp = require('../Model/Otp')
const Address = require('../Model/Address')

require('dotenv').config()
//sign in
exports.signin=async(req,res)=>{
    try{
const {password,email}=req.body
const exsistingUser=await User.findOne({email}).populate('savedAddress').exec()
if(!exsistingUser){
    return res.status(400).json({
        success:false,
        message:'User does not exsist please sign up'
    })
}
const passswordMatched=await bcrypt.compare(password,exsistingUser.password)
if(!passswordMatched){
    return res.status(400).json({
        success:false,
        message:'Wrong password'
    })
}
const payload={
    id:exsistingUser._id,
    role:exsistingUser.role
}
const token=jwt.sign(payload,process.env.SECRET_KEY,{
expiresIn:'2h',
})
exsistingUser.password=undefined,
exsistingUser.confirmPassword=undefined
// exsistingUser.Token=token
res.cookie('auth-token',token,{
    expires:new Date(Date.now()+2*60*60*1000),httpOnly:false,sameSite:'strict'
}).status(200).json({
    user:exsistingUser,
    success:true,
    Token:token,
    message:'User sign in successfully'
})
    }catch(err){
return res.status(400).json({
    message:err.message,
    success:false
})
    }
}
//sign up 
exports.signup=async(req,res)=>{
    // const regex = '/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/'
    try{
const {email,password,confirmPassword,otp}=req.body

const exsistingUser=await User.findOne({email})
if(exsistingUser){
    return res.status(400).json({
        message:'User already exsist please sign in',
        succcess:false
    })
}
if(!email||!password||!confirmPassword||!otp){
    return res.status(400).json({
        message:'Plaeas fill all the details',
        succcess:false
    })
}
// if(!regex.match(email)){
//     return res.status(400).json({
//         message:'Plaeas enter a valid email',
//         succcess:false
//     })
// }
const savedOtp=await Otp.findOne({email}).sort({createdAt:-1})
if(!savedOtp){
    return res.status(400).json({
        message:'OTP expired',
        success:false
    })
}
if(savedOtp.otp!==otp){
    return res.status(400).json({
        message:'OTP does not match',
        success:false
    })
}
if(password!==confirmPassword){
    return res.status(400).json({
        message:'pasword and confirm password does not match',
        succcess:false
    })
}

const hashedPassword=await bcrypt.hash(password,10)

await User.create({
    email,password:hashedPassword,confirmPassword:hashedPassword
})
return res.status(200).json({
    success:true,
    message:'user sign up successfully'
})
    }catch(err){
        return res.status(400).json({
            message:err.message,
            succcess:false
        })
    }
}
//email-verification
exports.emailVerification=async(req,res)=>{
    try{
    const {email}=req.body
  if(!email){
    return res.status(400)
.json({
    message:'Please enter a valid details',
    success:false
})  }
 const savedUser=await User.findOne({email})

if(!savedUser){
    return res.status(400).json({
        message:'User does not exsist',
        success:false
    })
}
const secret=process.env.SECRET_KEY+savedUser.password
const token=jwt.sign({
    id:savedUser._id,
    email:savedUser.email
},secret,{
    expiresIn:'2m'
})


    const response =await sendMail(email,`Forgot Password`,`<p>Here is your reset password lin <a href='http://localhost:3000/reset-password/${savedUser._id}/${token}'>reset your password</a></p>`) 
    
    return res.status(200).json({
        message:'email send successfully',
        success:true
    })

}
catch(err){
    return res.status(400).json({
        message:err.message,
        success:false
    })
}
}
//reset password 
exports.resetPassword=async(req,res)=>{
  
    try{
        const {password,confirmPassword}=req.body
     
        const {id,token}=req.params
        const savedUser=await User.findById(id)
if(!savedUser){
    return res.status(400).json({
        success:false,
        message:'User id does not exsist'
                })
}
const secret=process.env.SECRET_KEY+savedUser.password
const decode=jwt.verify(token,secret)

if(!password||!confirmPassword){
            return res.status(400).json({
                success:false,
                message:'ALl fields are required'
                        })
        }
        if(password!==confirmPassword){
            return res.status(400).json({
                success:false,
                message:'Password and confrim password does match'
                        })
        }
        const hashedPassword=await bcrypt.hash(password,10)
        const updatedUser=await User.findByIdAndUpdate(id,{
            password:hashedPassword,
            confirmPassword:hashedPassword,
         
        })
        return res.status(200).json({
            success:true,
            message:'Password reset successfully'
        })
    }
    catch(err){
        return res.status(400).json({
            success:false,
            message:err.message
                    })
    }
    
}
//deleteAddress
exports.deleteAddress=async(req,res)=>{
    try{
     const{userId,addressId}=req.query
     console.log(userId)
     console.log(addressId)
     if(!userId||!addressId){
        return res.status(400).json({
            success:false,
            message:'All fields are required'
        })
    }
   const savedUser=  await User.findByIdAndUpdate(userId,{
        $pull:{
           savedAddress:addressId
        }
     },{new:true}).populate('savedAddress').exec()
     console.log(savedUser)
const response=await Address.findByIdAndDelete(addressId)
if(!response){
    return res.status(400).json({
        success:false,
        message:'No corresponding address found'
    })
}
return res.status(200).json({
    success:true,
    message:'saved address deleted succesfully',
    user:savedUser
})
    }
    catch(err){
        return res.status(400).json({
            success:false,
            message:err.message
        })
    }
}
//findUserById
exports.findUserById=async(req,res)=>{
    console.log('idhar hu')
    try{
        const{id}=req.params
if(!id){
    return res.status(400).json({
        message:'No Id found',
        success:false
    })

}

const savedUser=await User.findById(id).populate('savedAddress').exec()
console.log('yaha hy brother')
console.log(savedUser)
return res.status(200).json({
    success:true,
    message:'User details fetched successfully',
    user:savedUser
})

    }
    catch(err){
        return res.status(200).json({
            success:true,
            message:err.message,
            // user:savedUser
        })
    }
}
//logoutController
exports.logoutController=async(req,res)=>{
    try{
return res.clearCookie('auth-token').status(200).json({
    success:true,
    messaage:'Logout successfully'
})
    }
    catch(err){
        console.log(err)
        return res.status(400).json({
            message:err.message,
            success:false
        })
    }
}