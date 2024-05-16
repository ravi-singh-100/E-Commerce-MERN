const mongoose=require('mongoose')
const addressSchema=new mongoose.Schema({
user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
},

fullName:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true
},
phone:{
    type:String,
    required:true
},
streetAddress:{
    type:String,
    required:true
},
city:{
    type:String,
    required:true
},
state:{
    type:String,
    required:true
},
pincode:{
type:String,
required:true
},
})
module.exports=mongoose.model('Address',addressSchema)