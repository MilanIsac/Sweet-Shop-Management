import { useEffect, useState } from "react";
import api from "../api/api";
import { useAuth } from "../auth/useAuth";

export default function Sweets() {
  const [sweets, setSweets] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    api
      .get("/sweets", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setSweets(res.data));
  }, []);

  return (
    <div>
      <h2>Sweets</h2>
      {sweets.map((s) => (
        <div key={s._id}>
          {s.name} – ₹{s.price} – stock {s.stock}
        </div>
      ))}
    </div>
  );
}
