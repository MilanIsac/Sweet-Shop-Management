import { useEffect, useState } from "react";
import {
  fetchSweets,
  createSweet,
  updateSweet,
  deleteSweet,
} from "../api/api";

const Sweets = () => {
  const [sweets, setSweets] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", stock: "" });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    loadSweets();
  }, []);

  const loadSweets = async () => {
    const res = await fetchSweets();
    setSweets(Array.isArray(res.data) ? res.data : res.data.sweets);
  };

  const handleSubmit = async () => {
    if (editId) {
      await updateSweet(editId, form);
      setEditId(null);
    } else {
      await createSweet({
        name: form.name,
        price: Number(form.price),
        stock: Number(form.stock),
      });
    }

    setForm({ name: "", price: "", stock: "" });
    loadSweets();
  };

  return (
    <div>
      <h2>Sweets</h2>

      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        placeholder="Price"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
      />
      <input
        placeholder="Stock"
        value={form.stock}
        onChange={(e) => setForm({ ...form, stock: e.target.value })}
      />
      <button onClick={handleSubmit}>
        {editId ? "Update" : "Add"}
      </button>

      <ul>
        {sweets.map((s) => (
          <li key={s._id}>
            {s.name} – ₹{s.price} – {s.stock}
            <button onClick={() => {
              setEditId(s._id);
              setForm(s);
            }}>
              Edit
            </button>
            <button onClick={() => deleteSweet(s._id).then(loadSweets)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sweets;
