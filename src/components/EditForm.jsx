import { useEffect, useState } from "react";
import { useMenusContext } from "../hooks/useMenusContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { backendBaseURL, imageURL } from "../utils/imageUrl";

const EditForm = () => {
  const { id } = useParams();
  const { dispatch } = useMenusContext();
  const { user } = useAuthContext();
  const nav = useNavigate();

  //Form Inputs
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [emptyFields, setEmptyFields] = useState([]);

  //Current Image
  const [currentImage, setCurrentImage] = useState("");

  //Load Intial Data
  useEffect(() => {
    async function loadData() {
      const response = await fetch(backendBaseURL + `/api/menus/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();
      // setMenu(json);
      setName(json.name);
      setDesc(json.desc);
      setPrice(json.price);
      setCurrentImage(imageURL + `/${json.image}`);
    }

    loadData();
  }, []);

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);

      const imageUrl = window.URL.createObjectURL(event.target.files[0]);
      setCurrentImage(imageUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("desc", desc);
    formData.append("price", price);
    // formData.append("stock", stock);
    if (image) {
      formData.append("image", image);
    }

    const response = await fetch(backendBaseURL + `/api/menus/${id}`, {
      method: "PATCH",
      body: formData,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setName("");
      setDesc("");
      setPrice("");
      setImage("");
      setError(null);
      setEmptyFields([]);
      dispatch({ type: "CREATE_MENUS", payload: json });
      nav("/seller");
    }
  };

  return (
    <>
      <form className="create" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold text-center mt-6">Edit Product Details</h1>
  
        <div className="flex justify-center">
          <img
            id="currentImage"
            src={currentImage}
            className="object-cover mt-6 mb-4"
            height="250px"
            width="250px"
          />
        </div>
  
        <label>Menu Name:</label>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
          className={emptyFields.includes("title") ? "error" : ""}
        />
  
        <label>Description:</label>
        <input
          type="text"
          onChange={(e) => setDesc(e.target.value)}
          value={desc}
          className={emptyFields.includes("desc") ? "error" : ""}
        />
  
        <label>Price:</label>
        <input
          type="number"
          onChange={(e) => setPrice(e.target.value)}
          value={price}
          className={emptyFields.includes("price") ? "error" : ""}
        />
  
        <label>Image:</label>
        <input
          type="file"
          onChange={onImageChange}
          className={emptyFields.includes("image") ? "error" : ""}
        />
  
        <button className="bg-yellow-500 text-white px-4 py-2 rounded mt-2 mb-4" onClick={handleSubmit}>Save Edit</button>
        {error && <div className="error">{error}</div>}
      </form>
    </>
  );
  
};

export default EditForm;
