const express=require('express')
const cors=require('cors')
const cookieParser=require('cookie-parser')
const productRouter=require('./Router/productRouter')
const userRouter=require('./Router/userRouter')
const cartRouter=require('./Router/cartRouter')
const adminRouter=require('./Router/adminRouter')
const paymentRouter=require('./Router/paymentRouter')
const dbConnection=require('./config/database')
require('dotenv').config()

const app=express()
const port=process.env.PORT||400

const endpointSecret = process.env.WEBHOOK_ENDPOINT_SECRET
app.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
  const sig = request.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntentSucceeded = event.data.object;
      // Then define and call a function to handle the event payment_intent.succeeded
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
});

app.use(express.json())

app.use(cors({
    origin:'http://localhost:3000',
    credentials:true
}))
app.use(cookieParser())

app.listen(port,()=>{
    console.log(`server is listentinf on port ${port}`)
})
//web hook







app.use('/api/v1',productRouter)
app.use('/api/v1/user',userRouter)
app.use('/api/v1/cart',cartRouter)
app.use('/api/v1/admin',adminRouter)
app.use('/api/v1/payment',paymentRouter)
dbConnection()