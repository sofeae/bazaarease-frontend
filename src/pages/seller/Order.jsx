import { OrderTabs } from "./Ordertabs";
import Button from "../../components/elements/Button";
import UseOrderTabSwitch from "./UseOrderTabSwitch.jsx";
import CurrentOrder from "./CurrentOrder.jsx";
import CompletedOrder from "./CompletedOrder.jsx";

const Order = () => {
  const tabs = ['Current Order', 'Completed Order'];
  const [currentTab, handleTabSwitch] = UseOrderTabSwitch(tabs, 'Current Order');

  return (
    <div className="flex items-center justify-center md:w-11/12">
        <div className="bg-white text-black border-gray-400 ml-2 mr-2 mt-6 mb-10 border p-4 md:w-11/12 rounded-lg shadow-md sm:p-6 lg:p-8 overflow-auto">
            <OrderTabs list={tabs} onTabSwitch={handleTabSwitch} activeTab={currentTab} />
            <div className={`tabs ${currentTab !== 'Current Order' ? 'hidden' : ''}`}>
                <CurrentOrder />
            </div>
            <div className={`tabs ${currentTab !== 'Completed Order' ? 'hidden' : ''}`}>
                <CompletedOrder />
            </div>
        </div>
    </div>
)
}

export default Order;
