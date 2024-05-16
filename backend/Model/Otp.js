const mongoose=require('mongoose')
const { sendMail } = require('../utils/sendEmail')
const otpSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim:true
    },
    otp:{
        type:String,
        required:true,
        
    },
    createdAt:{
        type:Date,
default:Date.now(),
expires:5*60
    }
})
async function sendVerificationEmail(email,otp){
try{
const response=await sendMail(email,'Verification Email',`<p>Here is your otp : ${otp}</p>`)
}
catch(err){
    console.log(err)
}
}
otpSchema.pre('save',async function(next){
if(this.isNew){
    await sendVerificationEmail(this.email,this.otp)
}
next()
})
module.exports=mongoose.model('Otp',otpSchema)