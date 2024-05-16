//add to cart
export const AddToCartLogic=(items,product)=>{
  
    const index=items.findIndex(ele=>product._id===ele._id)
const newItem=[
  ...items
]

if(index===-1){

newItem.push({
 _id: product._id,
 name:product.title,
 price:product.discountPrice,
 quantity:1,
 imageSrc:product.thumbnail
})
}
else{
let element= items[index]
let newElement={
  _id:element._id,
  imageSrc:element.imageSrc,
  name:element.name,
  quantity:element.quantity+1,
  price:element.price
}

newItem[index]=newElement
}
// console.log(newItem)
return newItem
}
//decrease from cart
export const decreaseFromCart=(items,product)=>{
    const index=items.findIndex(ele=>product._id===ele._id)
    const newItem=[
      ...items
    ]
    if(items[index].quantity===1){
        newItem.splice(index,1)
       
    }
    else{
        let element=items[index]
        let newElement={
            _id:element._id,
            imageSrc:element.imageSrc,
            name:element.name,
            quantity:element.quantity-1,
            price:element.price
        }
        newItem[index]=newElement
    }
    return newItem
}
//remove all items
export const removeAllItems=(items,product)=>{
    const newItem=[
        ...items
      ]
    const index=items.findIndex(ele=>product._id===ele._id)
   const  itsQuantity=items[index].quantity
   const  itsPrice=items[index].price*items[index].quantity
 
   newItem.splice(index,1)

  return {items:newItem,itsQuantity,itsPrice}
}