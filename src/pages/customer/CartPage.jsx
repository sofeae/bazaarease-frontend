import { Tabs } from "./Tabs";
import { useSelector } from "react-redux";
import { cartProducts } from "../../stores/cart/cartSlice";
import useTabSwitch from "./useTabSwitch";
import { ProductsSummary } from "./ProductsSummary";
import { PaymentWrapper } from "./PaymentForm.jsx";

const CartPage = () => {
    const cart = useSelector(cartProducts);
    const tabs = ['Summary', 'Payment'];
    const [currentTab, handleTabSwitch] = useTabSwitch(tabs, 'Summary');

    if (!cart || cart.length === 0) {
        return (
            <div className="bg-white h-full text-black flex justify-center p-4">
                <h1>Your Cart is empty</h1>
            </div>
        )
    }

    // Calculate totalAmount by summing up all the totalPrice values using reduce
    const totalAmount = cart.reduce((total, product) => total + product.totalPrice, 0);

    return (
        <div className="flex items-center justify-center">
            <div className="bg-white text-black border-gray-400 ml-2 mr-2 mt-6 mb-10 border p-4 md:w-2/3 rounded-lg shadow-md sm:p-6 lg:p-8 overflow-auto">
                <Tabs list={tabs} onTabSwitch={handleTabSwitch} activeTab={currentTab} />
                <div className={`tabs ${currentTab !== 'Summary' ? 'hidden' : ''}`}>
                    <ProductsSummary />
                    <div className="flex justify-between p-2 mt-6">
                        {/* Display the totalAmount above the Next button */}
                        <div>Total Amount: RM {totalAmount}</div>
                        <button
                            className="bg-yellow-500 text-white items-center justify-center py-2 px-4 rounded"
                            onClick={() => handleTabSwitch('Payment')}
                        >
                            <span>Next</span>
                        </button>
                    </div>
                </div>
                <div className={`tabs ${currentTab !== 'Payment' ? 'hidden' : ''}`}>
                    <PaymentWrapper />
                </div>
            </div>
        </div>
    )
}

export default CartPage;
