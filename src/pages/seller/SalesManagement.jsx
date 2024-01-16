import { SalesTabs } from "./SalesTabs";
import Button from "../../components/elements/Button";
import useSalesTabSwitch from "./useSalesTabSwitch";
import CollapsibleDailyTable from "./DailySales.jsx";
import CollapsibleMonthlyTable from "./MonthlySales.jsx";
import MonthDropdown from "../../components/MonthDropdown";

const SalesManagement = () => {
  const tabs = ['Daily', 'Monthly'];
  const [currentTab, handleTabSwitch] = useSalesTabSwitch(tabs, 'Daily');

  return (
    <div className="flex items-center justify-center md:w-5/6 lg:w-5/6 min-w-900">
      <div className="bg-white text-black border-gray-400 mt-12 mb-16 border p-2 md:w-11/12 rounded-lg shadow-md sm:p-6 lg:p-8 overflow-auto">

        {/* SalesTabs Component */}
        <div>
          <SalesTabs list={tabs} onTabSwitch={handleTabSwitch} activeTab={currentTab} />
        </div>

        {/* Daily Page Content */}
        <div className={`tabs ${currentTab !== 'Daily' ? 'hidden' : ''}`}>
          {/* MonthDropdown Component */}
          <div className="sm:text-sm mb-2">
            <MonthDropdown />
          </div>

          {/* Daily Table */}
          <CollapsibleDailyTable />

          {/* Download Button */}
          <div className="flex justify-end p-2 mt-4">
            <button
              className="bg-yellow-500 text-white items-center justify-center py-2 px-4 rounded"
              onClick={() => handleTabSwitch('Daily')}>
              <span>Download</span>
            </button>
          </div>
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
