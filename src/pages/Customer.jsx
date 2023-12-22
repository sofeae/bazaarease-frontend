import { useEffect } from 'react';
import { useMenusContext } from '../hooks/useMenusContext';
import { useAuthContext } from '../hooks/useAuthContext';

// components
import CustMenuList from '../components/CustMenuList';
// import Sidebar from '../components/SidebarA';
// import Navbar from '../components/Navbar';

const Menu = () => {
  const { menus, dispatch } = useMenusContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchMenus = async () => {
      const response = await fetch('/api/menus', {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_MENUS', payload: json });
      }
    };

    if (user) {
      fetchMenus();
    }
  }, [dispatch, user]);

  return (
    <>
    <div>
    </div>
    <div className="menu-container">
      <div className="menu">
        <div className="menus">
          {menus && menus.map((menu) => (
              <CustMenuList key={menu._id} menu={menu} />
            ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default Menu;
