import { useEffect, useState } from "react";
import api from "../api/api";

export default function Admin() {
  const [sweets, setSweets] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  const load = () =>
    api.get("/sweets").then((res) => setSweets(res.data));

  useEffect(() => {
    load();
  }, []);

  const addSweet = async () => {
    await api.post("/sweets", { name, price, stock });
    setName("");
    setPrice("");
    setStock("");
    load();
  };

  const deleteSweet = async (id) => {
    await api.delete(`/sweets/${id}`);
    load();
  };

  return (
    <div>
      <h2>Admin Panel</h2>

      <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <input placeholder="Price" onChange={(e) => setPrice(e.target.value)} />
      <input placeholder="Stock" onChange={(e) => setStock(e.target.value)} />
      <button onClick={addSweet}>Add Sweet</button>

      <ul>
        {sweets.map((s) => (
          <li key={s._id}>
            {s.name} - ₹{s.price}
            <button onClick={() => deleteSweet(s._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
