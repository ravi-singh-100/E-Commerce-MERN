const nodemailer=require('nodemailer')
require('dotenv').config()
const transporter=nodemailer.createTransport({
    
 host:'smtp.gmail.com',
 port:587,
 secure:false,
 auth:{
    user:process.env.MAIL_USER,
    pass:process.env.MAIL_PASS
 }

})
exports.sendMail=async(receiver,subject,body)=>{
    try{
  
const response= await transporter.sendMail({
    from:process.env.MAIL_HOST,
    to:`${receiver}`,
    subject:`${subject}`,
    html:`${body}`
},(err)=>{
    console.log(err.message)
})

    }
    catch(err){
        return res.status(400).json({
            message:err.message,
            success:false
        })
    }
}