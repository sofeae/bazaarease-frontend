import { useNavigate } from 'react-router-dom';
import { useMenusContext } from '../hooks/useMenusContext';
import { useAuthContext } from '../hooks/useAuthContext';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const MenuDetails = ({ menu, onAddProduct }) => {
  const { dispatch } = useMenusContext();
  const { user } = useAuthContext();
  const navigate = useNavigate();

//   const handleEdit = async () => {
//     if (!user) {
//       return;
//     }

//     const response = await fetch('/api/menus/' + menu._id, {
//       method: 'UPDATE',
//       headers: {
//         Authorization: `Bearer ${user.token}`,
//       },
//     });
//     const json = await response.json();

//     if (response.ok) {
//       dispatch({ type: 'UPDATE_MENUS', payload: json });

//        // Redirect to the Cart page when the cart icon is clicked
//       navigate('/pages/Cart.js');
//     }
//   };


  const addProduct = () => {
      onAddProduct(menu)
  }

  const iconStyle = {
    marginRight: '8px', // Adjust the spacing between the icon and text
    cursor: 'pointer', // Add a pointer cursor to indicate interactivity
  };

  return (
    <div className="menus-details">
      <h4>{menu.name}</h4>
      <p>
        <img src={'http://localhost:4000/' + menu.image} height="220" width="353" alt="Menu" />
      </p>
      
      <p>
        <strong>Description: </strong>
        {menu.desc}
      </p>
      
      <p>
        <strong>Price (in RM): </strong>
        {menu.price}
      </p>
      
      <span>
        <ShoppingCartIcon style={iconStyle} onClick={addProduct} />
        {/* <AddProduct onAddProduct={addProduct} /> */}
      </span>
    </div>
  );
};

export default MenuDetails; 
