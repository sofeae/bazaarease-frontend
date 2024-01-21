import { OrderTabs } from "./OrderTabs";
import Button from "../../components/elements/Button";
import UseOrderTabSwitch from "./UseOrderTabSwitch.jsx";
import CurrentOrder from "./CurrentOrder.jsx";
import CompletedOrder from "./CompletedOrder.jsx";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useOrdersContext } from "../../hooks/useOrdersContext";
import { useEffect, useState } from "react";
import { backendBaseURL } from "../../utils/imageUrl";
import Typography from '@mui/material/Typography';

const Order = () => {
  const tabs = ['Current Order', 'Completed Order'];
  const [currentTab, handleTabSwitch] = UseOrderTabSwitch(tabs, 'Current Order');
  const { orders, dispatch } = useOrdersContext();
  const completedOrders = orders && orders.filter(order => order.status);
  const { user } = useAuthContext();
  const [refreshInterval, setRefreshInterval] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch(backendBaseURL + "/api/order", {
        method: "GET",
        headers: { 
          Authorization: `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
      });
      const json = await response.json();
      console.log("Order:",json);
      // setOrdersState(json);
      if (response.ok) {
        dispatch({ type: "SET_ORDERS", payload: json });
      }
    };

    // Fetch orders initially
    if (user) {
      fetchOrders();
    }

    // Set up interval to fetch orders every 3 seconds
    const intervalId = setInterval(fetchOrders, 3000);
    setRefreshInterval(intervalId);

    // Clean up interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [dispatch, user]);

  console.log("orderjsx orders",orders)

  return (
    <div className="flex items-center justify-center md:w-11/12">
      <div className="bg-white text-black border-gray-400 ml-2 mr-2 mt-6 mb-10 border p-4 md:w-11/12 rounded-lg shadow-md sm:p-6 lg:p-8 overflow-auto">
        <OrderTabs list={tabs} onTabSwitch={handleTabSwitch} activeTab={currentTab} />
        <Typography variant="p" className="ml-16 mt-4 mb-2 text-gray-600 text-xs">
        *Click on order number to see more details
      </Typography>
        <div className={`tabs ${currentTab !== 'Current Order' ? 'hidden' : ''}`}>
          <CurrentOrder currentOrder={orders} />
        </div>
        <div className={`tabs ${currentTab !== 'Completed Order' ? 'hidden' : ''}`}>
          <CompletedOrder completedOrders={completedOrders} />
        </div>
      </div>
    </div>
  );  
}

export default Order;
