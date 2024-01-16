import { SalesTabs } from "./SalesTabs";
import Button from "../../components/elements/Button";
// import { useSelector } from "react-redux";
// import { cartProducts } from "../../stores/cart/cartSlice";
import useSalesTabSwitch from "./useSalesTabSwitch";
// import { ReactComponent as ArrowRightSvg } from "../../assets/icons/arrow-right-long-svgrepo-com.svg";
// import { AddressForm } from "../../components/AddressForm";
// import { ProductsSummary } from "./ProductsSummary";
// import { PaymentWrapper } from "./PaymentForm.jsx";
import CollapsibleDailyTable from "./DailySales.jsx";
import CollapsibleMonthlyTable from "./MonthlySales.jsx";

const SalesManagement = () => {
  const tabs = ['Daily', 'Monthly'];
  const [currentTab, handleTabSwitch] = useSalesTabSwitch(tabs, 'Daily');

  return (
    <div className="flex items-center justify-center md:w-5/6 lg:w-5/6 min-w-900">
      <div className="bg-white text-black border-gray-400 mt-12 mb-16 border p-2 md:w-11/12 rounded-lg shadow-md sm:p-6 lg:p-8 overflow-auto">
        <SalesTabs list={tabs} onTabSwitch={handleTabSwitch} activeTab={currentTab} />
        <div className={`tabs ${currentTab !== 'Daily' ? 'hidden' : ''}`}>
          <CollapsibleDailyTable />
        </div>
        <div className={`tabs ${currentTab !== 'Monthly' ? 'hidden' : ''}`}>
          <CollapsibleMonthlyTable />
        </div>
        <div className="flex justify-end p-2 mt-4">
            <button
              className="bg-yellow-500 text-white items-center justify-center py-2 px-4 rounded"
              onClick={() => handleTabSwitch('Daily')}>
              <span>Download</span>
            </button>
          </div>
      </div>
    </div>
  );
}

export default SalesManagement;