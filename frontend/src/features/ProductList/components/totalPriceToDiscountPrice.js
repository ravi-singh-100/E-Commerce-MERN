const totalPriceToDiscountPrice=(price,percentage)=>{
return Math.round(price-(percentage*price)/100)
}
export default totalPriceToDiscountPrice