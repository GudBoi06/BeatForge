import React, {useState} from "react";
import { createCheckout } from "../../services/api";

export default function Subscribe(){
  const [priceId, setPriceId] = useState("price_test_xxx"); // put your test price id
  const subscribe = async ()=>{
    const token = localStorage.getItem("bf_token");
    // ensure setAuthToken called somewhere globally
    const res = await createCheckout({ priceId, planName: "Pro Plan" });
    // res.data.url contains Stripe Checkout URL
    if(res.data?.url){
      window.location.href = res.data.url;
    } else {
      alert("Error starting checkout");
    }
  };
  return (
    <div>
      <h4>Subscribe</h4>
      <p>Pro Plan — monthly</p>
      <button onClick={subscribe}>Checkout (Stripe)</button>
    </div>
  );
}
