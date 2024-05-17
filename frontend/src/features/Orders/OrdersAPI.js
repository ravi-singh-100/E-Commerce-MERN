

export const getAll=async(token)=>{
return new Promise(async(ressolve,reject)=>{
    console.log(token)
const response=await fetch('https://render.com/docs/web-services#port-binding/api/v1/cart/getAllCart',{
    headers:{
        Authorization:`Bearer ${token}`,
    }
})
const val=await response.json()

ressolve({
  orders:val.data
})
})
}