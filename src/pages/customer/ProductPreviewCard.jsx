import { imageURL } from "../../utils/imageUrl";
import { AddProduct } from "./AddProduct";
import style from "./ProductPreviewCard.module.css";

export const ProductPreviewCard = ({ product, onAddProduct }) => {
  const addProduct = () => {
    onAddProduct(product);
  };

  return (
    <div
      className="w-full p-4 m-2 rounded text-white bg-black text-center flex flex-col justify-between overflow-hidden"
      style={{ backgroundColor: "black" }}
    >
      <div className="flex items-center justify-center mb-4">
        <img
          src={imageURL + "/" + product.image}
          alt={product.name}
          className="w-40 h-40 object-cover rounded" // Adjust the width and height as needed
        />
      </div>
      <h1 className="text-lg">{product.name}</h1>
      <h2 className="pb-2 text-lg">RM {product.price}</h2>
      <p className={ style.scrollbar + " " + 'text-sm mb-2 h-20 overflow-y-auto line-clamp-4 hide-scrollbar' }>
        {product.desc}
      </p>
      <AddProduct onAddProduct={addProduct} />
    </div>
  );
};
