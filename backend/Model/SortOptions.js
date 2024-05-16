const mongoose=require('mongoose')
const sortOptionSchema=new mongoose.Schema({
 title:{
type:String,
required:true
 },
 sort:{
    type:String,
    required:true
 },
 order:{
    type:Number,
    required:true
 },
 current:{
    type:Boolean,
    required:true
 }
})
module.exports=mongoose.model("SortOptions",sortOptionSchema)