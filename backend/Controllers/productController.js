const product=require('../Model/Product')
const filters=require('../Model/Filter')
const sortOptions=require('../Model/SortOptions')

exports.getAllHomePageProducts=async(req,res)=>{
try{
//    console.log('reached')
    const {_sort,_order,Brand,Category}=req.query
    const {isAdmin}=req.query
// console.log('band',Brand)
// console.log('cat',Category)
// console.log(req.user)
const query={}
// query.delete={$ne:true}
    let categoryArray=[]
    let brandArray=[]
    let sorting={}
if(isAdmin){
    query.delete={$ne:true}
}
if(Brand){
brandArray=Brand.split(',')
// console.log(brandArray)
query.brand=brandArray
}
if(Category){
categoryArray=Category.split(',')
// console.log(categoryArray)
query.category=categoryArray
}
if(_sort&&_order){
sorting[_sort]=+_order
}
// if(req.user&&req.user.role==='admin'){
//     console.log('query delte')
//     delete query.delete
// }
// console.log(query)
// console.log(sorting)
const savedProduct= await product.find(query).sort(sorting||null)
// console.log('savedProducts',savedProduct)
// const response=await product.find({})
return res.status(200).json({
    data:savedProduct,
    message:'All products fetched successfully',
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
exports.getAllFilters=async(req,res)=>{
    try{
        const response=await filters.find({})
        return res.status(200).json({
            data:response,
            message:'All products fetched successfully',
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
exports.getAllSortOptions=async(req,res)=>{
    try{
        const response=await sortOptions.find({})
        return res.status(200).json({
            data:response,
            message:'All products fetched successfully',
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
exports.getProductDetail=async(req,res)=>{
try{
const id=req.params.id
const response=await product.findById(id)
return res.status(200).json({
    data:response,
    message:'Product Detail fetched successfully',
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