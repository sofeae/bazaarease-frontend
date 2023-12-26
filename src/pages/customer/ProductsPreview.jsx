import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Carousel from "react-multi-carousel";
import { ProductPreviewCard } from "./ProductPreviewCard.jsx";
import { backendBaseURL } from "../../utils/imageUrl.js";

export default function ProductsPreview() {
  const { userId } = useParams();
  const [menus, setMenus] = useState([]);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
      axis: 'horizontal',
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      axis: 'horizontal',
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      axis: 'horizontal',
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      axis: 'horizontal',
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
  }, []);

  return (
    <div className="container mx-auto pb-4 w-2/3 text-black bg-white">
      <h1>Test</h1>
      <Carousel responsive={responsive} > 
        {menus.length > 0 &&
          menus.map((product, index) => {
            return (
              <div className="w-full p-3">
                <ProductPreviewCard key={index} product={product} />
              </div>
            );
          })}
      </Carousel>
    </div>
  );
}