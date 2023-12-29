import { useEffect } from "react";
import { useMenusContext } from "../../hooks/useMenusContext";
import { useAuthContext } from "../../hooks/useAuthContext";

//css
import style from "./Menu.module.css";
// components
import OrderDetails from "../../components/OrderDetails";
import { backendBaseURL } from "../../utils/imageUrl";

const Menu = () => {
  const { menus, dispatch } = useMenusContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchMenus = async () => {
      const response = await fetch(backendBaseURL + "/api/menus", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_MENUS", payload: json });
      }
    };

    if (user) {
      fetchMenus();
    }
  }, [dispatch, user]);

  return (
    <div className="flex items-center justify-center h-full">
      <div className={style["menu-container"]}>
        <div className="flex flex-wrap w-full gap-4">
          {menus &&
            menus.map((menu) => (
              <div key={menu._id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 mx-auto">
                  <OrderDetails menu={menu} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
