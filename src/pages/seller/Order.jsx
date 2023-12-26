import { useEffect } from "react";
import { useMenusContext } from "../../hooks/useMenusContext";
import { useAuthContext } from "../../hooks/useAuthContext";

//css
import style from "./Menu.module.css";
// components
import MenuDetails from "../../components/MenuDetails";
import MenuForm from "../../components/MenuForm";
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
    <>
      <div className={style["menu-container"]}>
        <div className="flex flex-col w-2/5 gap-4 ">
          {menus &&
            menus.map((menu) => <MenuDetails key={menu._id} menu={menu} />)}
        </div>
        {/* <MenuForm /> */}
      </div>
    </>
  );
};

export default Menu;
