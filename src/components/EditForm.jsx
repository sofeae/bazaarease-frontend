import { useEffect, useState } from "react";
import { useMenusContext } from "../hooks/useMenusContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate, useParams } from "react-router-dom";

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
      const response = await fetch(`/api/menus/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();
      // setMenu(json);
      setName(json.name);
      setDesc(json.desc);
      setPrice(json.price);
      setCurrentImage(`http://localhost:4000/${json.image}`);
    }

    loadData();
  }, []);

  //Ubahsuai
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

    const response = await fetch(
      `https://bazaarease-backend.onrender.com/api/menus/${id}`,
      {
        method: "PATCH",
        body: formData,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setName("");
      setDesc("");
      setPrice("");
      // setStock("");
      setImage("");
      setError(null);
      setEmptyFields([]);
      dispatch({ type: "CREATE_MENUS", payload: json });
      nav("/seller");
    }
    //End from old
  };

  return (
    <>
      <form className="create" onSubmit={handleSubmit}>
        <h3>Edit Menu</h3>

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

        {/* <label>Stock:</label>
        <input
          type="number"
          onChange={(e) => setStock(e.target.value)}
          value={stock}
          className={emptyFields.includes("stock") ? "error" : ""}
        /> */}

        <label>Image:</label>
        <input
          type="file"
          onChange={onImageChange}
          className={emptyFields.includes("image") ? "error" : ""}
        />

        <button onClick={handleSubmit}>Save Edit</button>
        {error && <div className="error">{error}</div>}
      </form>
      <img
        id="currentImage"
        src={currentImage}
        className="object-cover"
        height="250px"
        width="250px"
      ></img>
    </>
  );
};

export default EditForm;
