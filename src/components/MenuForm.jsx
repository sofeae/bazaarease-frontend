import { useState } from "react"
import { useMenusContext } from "../hooks/useMenusContext"
import { useAuthContext } from '../hooks/useAuthContext'

const MenuForm = () => {
  const { dispatch } = useMenusContext()
  const { user } = useAuthContext()

  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')
  const [price, setPrice] = useState('')
  //const [stock, setStock] = useState('')
  const [image, setImage] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])


  //Ubahsuai 
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("desc", desc);
    formData.append("price", price);
    //formData.append("stock", stock);
    formData.append("image", image);

    const response = await fetch("/api/menus", { 
      method: "POST",
      body: formData,
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })

    const json = await response.json()
    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setName('')
      setDesc('')
      setPrice('')
      //setStock('')
      setImage('')
      setError(null)
      setEmptyFields([])
      dispatch({ type: 'CREATE_MENUS', payload: json })
    }
    //End from old
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Menu</h3>

      <label>Menu Name:</label>
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
        className={emptyFields.includes('title') ? 'error' : ''}
      />

      <label>Description:</label>
      <input
        type="text"
        onChange={(e) => setDesc(e.target.value)}
        value={desc}
        className={emptyFields.includes('desc') ? 'error' : ''}
      />

      <label>Price:</label>
      <input
        type="number"
        onChange={(e) => setPrice(e.target.value)}
        value={price}
        className={emptyFields.includes('price') ? 'error' : ''}
      />

      {/* <label>Stock:</label>
      <input
        type="number"
        onChange={(e) => setStock(e.target.value)}
        value={stock}
        className={emptyFields.includes('stock') ? 'error' : ''}
      /> */}

      <label>Image:</label>
      <input
        type="file"
        onChange={onImageChange}
        className={emptyFields.includes('image') ? 'error' : ''}
      />

      <button>Add Menu</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default MenuForm