import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Alert } from '../../components/elements/Alert';
import queue from '../../assets/images/queue.png';
import { backendBaseURL } from "../../utils/imageUrl.js";

const PaymentSuccessPage = () => {
  const { queueNum } = useLocation().state;
  const order = useLocation().state?.order; // Check if order is defined
  const [status,setStatus] = useState(false)

  // Log orders data to the console
  useEffect(() => {
      const interval = setInterval(async ()=>{
        const response = await fetch(backendBaseURL+ `/api/order/${order._id}`) //Get order by order id
        const result = await response.json()
        // console.log("result",result)
        // console.log("order:",order)
        setStatus(result.status)
        console.log("status:",status)
      },5000) //5000 = 5 seconds
    return () => clearInterval(interval)
  }, []);


  return (
    <div className="flex flex-col items-center justify-top h-screen">
      <Alert variant="success" className="mb-4 mt-10 bg-yellow-300">
        Your payment was successful
      </Alert>
      <img src={queue} alt="Queue Image" className="h-64 mt-0 mb-0" />
      <div className="max-w-lg mx-auto p-4">
        <div className="rounded-lg text-xl text-center mb-4">
          Your Queue Number: <br /> <br />
          <span className="font-bold text-5xl"> #{queueNum}</span>
        </div>
        <div className="rounded-lg text-xl text-center mb-4">
          Status: <br /> <br />
          <span className="font-bold text-5xl"> {status ? "Completed" : "Incomplete"}</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
