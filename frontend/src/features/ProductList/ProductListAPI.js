//fetch all products without any filter
export const fetchAllProducts=()=>{
    return new Promise( async (ressolve)=>{
const response=await fetch('https://render.com/docs/web-services#port-binding/products')
const data=await response.json()
ressolve({data})
    })
}
//fetch sort options
export const fetchSortOptions=()=>{
    return new Promise(async(ressolve)=>{
        const response=await fetch('https://render.com/docs/web-services#port-binding/api/v1/products/allsortoptions')
        const val=await response.json()
        ressolve({data:val.data})
    })
}
//fetch filter options
export const fetchFilterOptions=()=>{
    return new Promise(async(ressolve)=>{
        const response=await fetch('https://render.com/docs/web-services#port-binding/api/v1/products/filters')
        const val=await response.json()
        ressolve({data:val.data})
    })
}
// fetch selected Product details
export const fetchSelectedProductDetails=(id)=>{
return new Promise(async(ressolve)=>{
  
    const response=await fetch(`https://render.com/docs/web-services#port-binding/api/v1/product/${id}`)
const val=await response.json()

val.data.discountPrice=Math.round(val.data.price-(val.data.discountPercentage*val.data.price)/100)

ressolve({data:val.data})
})
}
//fetch all products by sort and normally fetch all products
export const fetchAllProductsByFilter=(filter,sort,isAdmin)=>{
    console.log(filter)
    let query=''
    for (let key in filter) {
        
   const categoryValues=Array.from(filter[key]).join(',')
query+=`${key}=${categoryValues}&`
//    if(categoryValues.length>0){
//     const lastCategoryValue=categoryValues[categoryValues.length-1]

//     query+=`${key}=${lastCategoryValue}&`
// console.log(query)   } 
    }
    for(let key in sort){ 
        query+=`${key}=${sort[key]}&`
        // console.log(query)
    }
    // for(let key in pagination){
    //     query+=`${key}=${pagination[key]}`
    //     console.log(query)
    // }
    
if(query.length>0){
    query=query.substring(0,query.length-1)
    query=`${query}`
    
}
// if(query.length>0&&query.charAt(query.length-1)=='='){

// }
console.log(query)
    return new Promise( async (ressolve)=>{
      
 const response=await fetch(`https://render.com/docs/web-services#port-binding/api/v1/getAllProducts?isAdmin:${isAdmin}&${query}`)
 const val =await response.json()     
 
 
ressolve({data:val.data})
    })
}