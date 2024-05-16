

export const getAll=async(token)=>{
return new Promise(async(ressolve,reject)=>{
    console.log(token)
const response=await fetch('http://localhost:8000/api/v1/cart/getAllCart',{
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