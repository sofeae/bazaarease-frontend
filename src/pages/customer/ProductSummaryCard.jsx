import { useDispatch, useSelector } from "react-redux";
import { incrementProductAmount, decrementProductAmount } from "../../stores/cart/cartSlice";
import { imageURL } from "../../utils/imageUrl";

export const ProductsSummaryCard = ({ product, index }) => {
    const dispatch = useDispatch();

    const cartProducts = useSelector((state) => state.cart.products);
    const cartProduct = cartProducts.find((cartItem) => cartItem.id === product.id);
    const chosenQuantity = cartProduct ? cartProduct.amount : 0;

    const handleIncrement = (index) => {
        dispatch(incrementProductAmount({ id: product.id, index: index }));
    };

    const handleDecrement = (index) => {
        dispatch(decrementProductAmount({ id: product.id, index: index }));
    };

    const totalPrice = product.price * product.amount;

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
                <div className="price">{`RM ${product.price.toFixed(2)}`}</div>
                <div className="quantity flex">
                    <button className="p-1" disabled={product.amount <= 0} onClick={() => { handleDecrement(index) }}>-</button>
                    <span className="p-1">{product.amount}</span>
                    <button className="p-1" onClick={() => { handleIncrement(index) }}>+</button>
                </div>
                <div className="total-price">{`Total: RM ${totalPrice.toFixed(2)}`}</div>
            </div>
        </div>
    );
}