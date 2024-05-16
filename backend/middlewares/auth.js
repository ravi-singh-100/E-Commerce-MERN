const jwt=require('jsonwebtoken')
require('dotenv').config()
//is AUthenticated
exports.isAuth=(req,res,next)=>{

    try{
    const token=req.body.token||req.cookies['auth-token']||req.headers.authorization.split(" ")[1]
if(!token){
    return res.status(400).json({
        message:'Token dies not passed in the frontnent',
        success:false
    })
}
    const decode=jwt.verify(token,process.env.SECRET_KEY)

if(decode){
    req.user=decode
    next()
}
    }catch(err){
        return res.status(400).json({
            message:err.message,
            success:false
        })
    }
}
//is Admin
exports.isAdmin=(req,res,next)=>{
if(req.user.role!=='admin'){
    return res.status(400).json({
        message:'uSer is not admin',
        success:false
    })
}
next()

}
//is Customer 
exports.isCustomer=(req,res,next)=>{

if(req.user.role==='customer'){
    next()
}
else{
    return res.status(400).json({
        message:'user is not a customer',
        success:false
    })
}


}
//Both Allow
exports.isBoth=(req,res,next)=>{

    if(req.user.role==='customer'||req.user.role==='admin'){
        next()
    }
    else{
        return res.status(400).json({
            message:'user is not a customer not a admin',
            success:false
        })
    }
    
    
    }