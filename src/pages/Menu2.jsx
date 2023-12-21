import { useEffect } from 'react';
import { useMenusContext2 } from '../hooks/useMenusContext2';
import { useAuthContext } from '../hooks/useAuthContext';

// components
import MenuDetails2 from '../components/MenuDetails2';
import MenuForm2 from '../components/MenuForm2';

const Menu2 = () => {
  const { menus2, dispatch } = useMenusContext2();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchMenus = async () => {
      const response = await fetch('/api/menus2', {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_MENUS2', payload: json });
      }
    };

    if (user) {
      fetchMenus();
    }
  }, [dispatch, user]);

  return (
    <>
    <div className="menu-container">
      <div className="menu">
        <div className="menus">
          {menus2 && menus2.map((menu2) => (
              <MenuDetails2 key={menu2._id} menu2={menu2} />
            ))}
        </div>
        <MenuForm2 />
      </div>
    </div>
    </>
  );
};

export default Menu2;
