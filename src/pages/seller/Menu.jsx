import { useState, useEffect } from "react";
import { useMenusContext } from "../../hooks/useMenusContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Switch } from '@mui/material';

// css
import style from "./Menu.module.css";
// components
import MenuDetails from "../../components/MenuDetails";
import MenuForm from "../../components/MenuForm";
import { backendBaseURL } from "../../utils/imageUrl";

const Menu = () => {
  const { menus, dispatch } = useMenusContext();
  const { user } = useAuthContext();
  const [storeStatus, setStoreStatus] = useState(user ? user.storeStatus : true);

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
      // Log userBusinessName and user.storeStatus
      console.log("businessName:", user.businessName);
      console.log("storeStatus:", storeStatus);

      if (storeStatus) {
        fetchMenus();
      }
    }
  }, [dispatch, user, storeStatus]);

  const handleToggle = () => {
    // Update the storeStatus when the switch is toggled
    setStoreStatus((prevStatus) => {
      // You can perform additional actions here if needed
      return !prevStatus;
    });
  };

  return (
    <>
      <div className={style["menu-container"]}>
        <div className="flex flex-col w-2/5 gap-4 ">
          {/* Render Material-UI Switch */}
          <Switch
            checked={storeStatus}
            onChange={handleToggle}
            inputProps={{ 'aria-label': 'controlled' }}
            sx={{ '& .Mui-checked': { color: 'yellow' } }}
          />
          Toggle Store Status
  
          {menus &&
            menus.map((menu) => <MenuDetails key={menu._id} menu={menu} />)}
        </div>
        <MenuForm />
      </div>
    </>
  );
};

export default Menu;
