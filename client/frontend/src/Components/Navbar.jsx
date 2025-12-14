import { Link } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav style={{ display: "flex", gap: "10px" }}>
      <Link to="/">Sweets</Link>

      {!user && (
        <>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </>
      )}

      {user && (
        <>
          {user.role === "admin" && <Link to="/admin">Admin</Link>}
          <button onClick={logout}>Logout</button>
        </>
      )}
    </nav>
  );
}
