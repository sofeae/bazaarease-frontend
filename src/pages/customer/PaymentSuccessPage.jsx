import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Alert } from '../../components/elements/Alert';
import queue from '../../assets/images/queue.png';
import { useOrdersContext } from '../../hooks/useOrdersContext'; // Import the context

const PaymentSuccessPage = () => {
  const { queueNum } = useLocation().state;
  const { orders, fetchOrders } = useOrdersContext(); 

  // Find the order with the corresponding queue number
  const order = orders ? orders.find((order) => order.queueNum === queueNum) : null;

  // Log orders status to the console
  useEffect(() => {
    if (order) {
      console.log('Order Status:', order.status);
    }
  }, [order]);
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
        
        {/* Display order status if order is found */}
        {order && (
          <div className="rounded-lg text-xl text-center text-black mb-4">
            Order Status: {order.status}
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
