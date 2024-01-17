import { OrderTabs } from "./OrderTabs";
import Button from "../../components/elements/Button";
import UseOrderTabSwitch from "./UseOrderTabSwitch.jsx";
import CurrentOrder from "./CurrentOrder.jsx";
import CompletedOrder from "./CompletedOrder.jsx";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useOrdersContext } from "../../hooks/useOrdersContext";
import { useEffect } from "react";
import { backendBaseURL } from "../../utils/imageUrl";

const Order = () => {
  const tabs = ['Current Order', 'Completed Order'];
  const [currentTab, handleTabSwitch] = UseOrderTabSwitch(tabs, 'Current Order');

  const { orders, dispatch } = useOrdersContext();
  const completedOrders = orders && orders.filter(order => order.status);
  const { user } = useAuthContext();

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

    if (user) {
      fetchOrders();
    }
  }, [dispatch,user]);

  console.log("orderjsx orders",orders)

  return (
    <div className="flex items-center justify-center md:w-11/12">
        <div className="bg-white text-black border-gray-400 ml-2 mr-2 mt-6 mb-10 border p-4 md:w-11/12 rounded-lg shadow-md sm:p-6 lg:p-8 overflow-auto">
            <OrderTabs list={tabs} onTabSwitch={handleTabSwitch} activeTab={currentTab} />
            <div className={`tabs ${currentTab !== 'Current Order' ? 'hidden' : ''}`}>
                <CurrentOrder currentOrder={orders}/>
            </div>
            <div className={`tabs ${currentTab !== 'Completed Order' ? 'hidden' : ''}`}>
                <CompletedOrder completedOrders={completedOrders} />
            </div>
        </div>
    </div>
)
}

export default Order;
