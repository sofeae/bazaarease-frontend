import { useSelector } from "react-redux";
import { cartProducts } from "../../stores/cart/cartSlice";
import { ProductsSummaryCard } from "./ProductSummaryCard";

export const ProductsSummary = () => {
    const cart = useSelector(cartProducts);
    console.log("ProductsSummary:",cart)
    
    return (
        <div className="flex flex-col">
            { cart && cart?.map((product, index) => {
                return (
                    <ProductsSummaryCard product={product} key={index} index={index}/>
                )
            })}
        </div>
    )
}