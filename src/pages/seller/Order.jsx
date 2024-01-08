import { useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useOrdersContext } from "../../hooks/useOrdersContext";
import UseOrderTabSwitch from "./UseOrderTabSwitch";
import { OrderTabs } from "./OrderTabs";

//css
import style from "./Menu.module.css";

// components
import OrderDetails from "../../components/OrderDetails";
import { backendBaseURL } from "../../utils/imageUrl";

const Order = () => {
  // const { menus, dispatch } = useMenusContext();
  // const { user } = useAuthContext();
  const { orders, dispatch } = useOrdersContext();
  const { user } = useAuthContext();
  const tabs = ['Current Order', 'Completed Order'];
  const [currentTab, handleTabSwitch] = UseOrderTabSwitch(tabs, 'Current Order');

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch(backendBaseURL + "/api/order", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_ORDERS", payload: json });
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [dispatch, user]);

  return (
    <div className="flex items-center justify-center h-full">
      <div className="bg-white text-black border-gray-400 ml-2 mr-2 mt-6 mb-10 border p-6 md:w-3/4 rounded-lg shadow-md sm:p-6 lg:p-8 overflow-auto">
      <OrderTabs list={tabs} onTabSwitch={handleTabSwitch} activeTab={currentTab} />
      <div className={`tabs ${currentTab !== 'Current Order' ? 'hidden' : ''}`}></div >
        <div className={style["menu-container"]}>
          <div className="flex flex-wrap w-full gap-4">
            {orders &&
              orders.map((orders) => (
                <div key={orders._id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 mx-auto">
                  <OrderDetails orders={orders} />
                </div>
              ))}
          </div>
        </div>
      </div>
      </div>
  );
};

export default Order;
