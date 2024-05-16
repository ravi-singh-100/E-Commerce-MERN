const mongoose=require('mongoose')
const filterSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    options:{
        type:[Object],required:true
    }
})
module.exports=mongoose.model('Filter',filterSchema)