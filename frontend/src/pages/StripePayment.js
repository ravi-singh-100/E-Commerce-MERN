import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import StripeCheckoutForm from "./StripeCheckoutForm";
import "./Stripe.css";
import { useSelector } from "react-redux";
import { token } from "../features/auth/authSlice";
import {paymentAmount}from '../features/Cart/CartSlice'
import {savedCart}from '../features/Cart/CartSlice'
// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
import {cartOrderId} from '../features/Cart/CartSlice'
// const pk=process.env.REACT_APP_PK_KEY
const stripePromise = loadStripe('pk_test_51PGdYlSEmuRyAhgp5PnXMBBCqEAVTu3vS0ZIJYcNLpEVqIFXYTbVXTRJVhYDjhWrd7en4ns0Iz5p888dFfgZ2ZeK00KwoLIWNQ');
// console.log('pk ',pk)
function StripePayment() {
  const orderId=useSelector(cartOrderId)
  const cartData=useSelector(savedCart)
    const userToken=useSelector(token)
   console.log(cartData)
const totalPrice=useSelector(paymentAmount)
    const [clientSecret, setClientSecret] = useState("");
  console.log(totalPrice)
    useEffect(() => {
      console.log(userToken)
      // Create PaymentIntent as soon as the page loads
      fetch("https://render.com/docs/web-services#port-binding/api/v1/payment/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" ,Authorization:`Bearer ${userToken}`},
        body: JSON.stringify({ cart:cartData}),
        meta:{
          order_id:orderId
        }
      })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret));
    }, []);
  
    const appearance = {
      theme: 'stripe',
    };
    const options = {
      clientSecret,
      appearance,
    };
  
    return (
      <div className="Stripe">
        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
           <StripeCheckoutForm/>
          </Elements>
        )}
      </div>
    );
  
}

export default StripePayment
