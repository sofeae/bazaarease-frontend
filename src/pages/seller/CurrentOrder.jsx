import { useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useOrdersContext } from "../../hooks/useOrdersContext";

//css
import style from "./Menu.module.css";

// components
import OrderDetails from "../../components/OrderDetails";
import { backendBaseURL } from "../../utils/imageUrl";

const CurrentOrder = () => {
    const { orders, dispatch } = useOrdersContext();
    const { user } = useAuthContext();

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
        <div className="flex items-center justify-center h-full md:w-11/12">
            <div className={style["menu-container"]}>
                <div className="flex flex-wrap justify-center items-center w-full gap-6">
                    {orders &&
                        orders
                            .slice()
                            .sort((a, b) => a.queueNum - b.queueNum)
                            .map((order) => (
                                <div key={order.queueNum} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 mx-auto">
                                    <OrderDetails orders={order} />
                                </div>
                            ))}
                </div>

            </div>
        </div>

    );
};

export default CurrentOrder;
