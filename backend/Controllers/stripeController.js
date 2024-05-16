require('dotenv').config()
const stripe=require('stripe')(process.env.SK_KEY)

exports.stripePaymentController=async(req,res)=>{
    try{
        const {cart}=req.body

console.log(cart)

        const paymentIntent = await stripe.paymentIntents.create({
            
          amount:cart.price*100,
          currency: 'inr',
          description:'ECommerce service',
          payment_method_types: ['card'],
            shipping: {
             name: cart.address.fullName,
                address: {
                  country: 'IN',
                  line1: cart.address.streetAddress,
                  postal_code: cart.address.pincode,
                  city: cart.address.city,
                  state: cart.address.state,
                
                },
              },
  

          });
          console.log(paymentIntent)
          res.send({
            clientSecret: paymentIntent.client_secret,
            success:true
          });
    }
    catch(err){
console.log(err)
return res.status(400).json({
    success:false,
    message:err.message
})
    }
}