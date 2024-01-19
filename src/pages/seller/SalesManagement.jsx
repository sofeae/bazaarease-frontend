import { SalesTabs } from "./SalesTabs";
import Button from "../../components/elements/Button";
import UseSalesTabSwitch from "./UseSalesTabSwitch.jsx";
import CollapsibleDailyTable from "./DailySales.jsx";
import CollapsibleMonthlyTable from "./MonthlySales.jsx";

const SalesManagement = () => {
  const tabs = ['Daily', 'Monthly'];
  const [currentTab, handleTabSwitch] = UseSalesTabSwitch(tabs, 'Daily');

  return (
    <div className="flex items-center justify-center md:w-5/6 lg:w-5/6 min-w-900">
      <div className="bg-white text-black border-gray-400 mt-12 mb-12 border p-2 md:w-11/12 rounded-lg shadow-md sm:p-6 lg:p-8 overflow-auto">
        {/* SalesTabs Component */}
        <div>
          <SalesTabs list={tabs} onTabSwitch={handleTabSwitch} activeTab={currentTab} />
        </div>
        {/* Daily Page Content */}
        <div className={`tabs ${currentTab !== 'Daily' ? 'hidden' : ''}`}>
          <CollapsibleDailyTable />
        </div>
        {/* Monthly Page Content */}
        <div className={`tabs ${currentTab !== 'Monthly' ? 'hidden' : ''}`}>
          {/* Monthly Table */}
          <CollapsibleMonthlyTable />
        </div>
      </div>
    </div>
  );
}

export default SalesManagement;
