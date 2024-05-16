const mongoose=require('mongoose')
require('dotenv').config()
const dbConnection=async()=>{
    try{
    await mongoose.connect(process.env.DATABASE_URL)
    console.log('db connection successfull')
    }catch(err){
        console.log(err)
        process.exit(1)
    }
}
module.exports=dbConnection