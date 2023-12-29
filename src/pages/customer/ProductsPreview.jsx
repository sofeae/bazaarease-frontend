import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Carousel from "react-multi-carousel";
import { ProductPreviewCard } from "./ProductPreviewCard.jsx";
import { backendBaseURL } from "../../utils/imageUrl.js";
import { addToCart,cartProducts } from "../../stores/cart/cartSlice";
import { useDispatch,useSelector } from "react-redux";
import 'react-multi-carousel/lib/styles.css';

export default function ProductsPreview() {
  const { userId } = useParams();
  const [menus, setMenus] = useState([]);
  const dispatch = useDispatch(); //Edit Cart
  const cart = useSelector(cartProducts)

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  async function loadData() {
    const response = await fetch(backendBaseURL + `/api/customer/${userId}`);
    const json = await response.json();
    setMenus(json);
    console.log(json);
    console.log(menus);
  }

  useEffect(() => {
    loadData();
  }, [])

  const onAddProduct = (product) => {
    dispatch(addToCart(product))
    console.log(product)
    console.log(cart)
  }

  return (
    <div className="container mx-auto pb-4 w-2/3 text-black bg-white">
      <h1>Test</h1>
      <Carousel responsive={responsive} >
        {/* <div>TEMPORARY CART
      {cart.map((product)=>{
        return <div>{product.name}</div>
      })}

        </div> */}
        {menus.length > 0 &&
          menus.map((product, index) => {
            return (
              <div key={index} className="w-full px-2 h-full">
                <ProductPreviewCard key={index} product={product} onAddProduct={onAddProduct} />
              </div>
            );
          })}
      </Carousel>
    </div>
  );
}