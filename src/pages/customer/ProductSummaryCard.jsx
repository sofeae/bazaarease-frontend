import { useDispatch, useSelector } from "react-redux";
import { incrementProductAmount, decrementProductAmount } from "../../stores/cart/cartSlice";
import { imageURL } from "../../utils/imageUrl";

export const ProductsSummaryCard = ({ product }) => {
    const dispatch = useDispatch();
  
    const cartProducts = useSelector((state) => state.cart.products);
    const cartProduct = cartProducts.find((cartItem) => cartItem.id === product.id);
    const chosenQuantity = cartProduct ? cartProduct.amount : 0;
  
    const handleIncrement = () => {
      dispatch(incrementProductAmount({ id: product.id, amount: chosenQuantity + 1 }));
    };
  
    const handleDecrement = () => {
      if (chosenQuantity > 0) {
        dispatch(decrementProductAmount({ id: product.id, amount: chosenQuantity - 1 }));
      }
    };

    return (
        <div className="flex p-1 sm:p-2 border-b border-b-gray-300">
            <div className="product-image border border-gray-200 w-40 h-40 p-4 m-2 rounded">
                <img
                    src={`${imageURL}/${product.image}`}
                    alt={product.name}
                    className="w-full h-full object-cover"
                />
            </div>
            
            <div className="product-info mt-4 ml-2">
                <h3 className="font-bold">{product.name}</h3>
            </div>
    
            <div className="product-price-qt flex flex-col items-center justify-center ml-auto">
                <div className="price">{`RM ${product.price}`}</div>
                <div className="quantity flex">
                    <button className="p-1" disabled={chosenQuantity <= 0} onClick={handleDecrement}>-</button>
                    <span className="p-1">{chosenQuantity}</span>
                    <button className="p-1" onClick={handleIncrement}>+</button>
                </div>
            </div>
        </div>
    );    
}