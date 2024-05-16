

//increase increaseQuantity
export const increaseQuantity=(Token,product)=>{
    return new Promise(async(ressolve)=>{
        const response=await fetch('http://localhost:8000/api/v1/cart/increase-quantity',{
            method:'PUT',
            headers:{
                Authorization:`Bearer ${Token}`,
                'Content-Type':'application/json'
            },
            body:JSON.stringify(product)
        })
        const data=await response.json()
        console.log(data)
    })
}
//removeCartAsync
export const removeCart=(id,token)=>{
    return new Promise(async(ressolve)=>{
        console.log(id)
        console.log(token)
        const response=await fetch(`http://localhost:8000/api/v1/cart/remove-quantity/${id}`,{
            method:'PUT',
            headers:{
                Authorization:`Bearer ${token}`,
                'Content-Type':'application/json'
            }

        })
        const data=await response.json()
        console.log(data)
        ressolve({items:data.val.items,totalQuantity:data.val.totalQuantity,price:data.val.price})

    })
}




//get Immefiate previous cart of user when it sign in
export const cart=(token)=>{
  
    return new Promise(async(ressolve)=>{
        const response=await fetch(`http://localhost:8000/api/v1/cart/initial-cart`,{
            headers:{
                Authorization:`Bearer ${token}`,
                'Content-Type':'application/json'
            }
        })
        const data=await response.json()
    //   console.log(data)
        ressolve({items:data.val.items,
            totalQuantity:data.val.totalQuantity,price:data.val.price,
            // orderHistory:data.val.orderHistory,
            address:data.val.address})
    })
}
//update the cart in the backend with eaxh + or -
export const updateCart=(item,totalQuantity,price,token)=>{
  
return new Promise(async(ressolve)=>{
    const response=await fetch (`http://localhost:8000/api/v1/cart/update-cart`,{
        method:'PUT',
        body:JSON.stringify({item,totalQuantity,price}),
        headers:{
            Authorization:`Bearer ${token}`,
            'Content-Type':'application/json'
        }
    })
    const data=await response.json()
    console.log(data)
    ressolve({items:data.val.items,totalQuantity:data.val.totalQuantity,price:data.val.price})
})
}
//order
export const orderCart=(form,cartData,token)=>{
    return new Promise(async(ressolve)=>{
        const response =await fetch('http://localhost:8000/api/v1/cart/order',{
            method:'POST',
            body:JSON.stringify({form,cartData}),
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${token}`
            }
        })
        const data=await response.json()
  
        // if(val.success){
        //     toast
        // }
        console.log(data)
            ressolve({items:data.val.items,
                // orderHistory:data.val.orderHistory,
                price:data.val.price,totalQuantity:data.val.totalQuantity,
                orderId:data.val.orderId,
                address:data.val.address,mode:data.val.mode,paymentAmount:data.val.paymentAmount,savedCart:data.val.cart})

        
    })
}