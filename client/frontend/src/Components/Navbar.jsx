import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav style={styles.nav}>
      <h3 style={styles.logo}>🍬 Sweet Shop</h3>

      <div style={styles.links}>
        {user && <Link to="/sweets">Sweets</Link>}

        {user?.role === "admin" && (
          <Link to="/admin">Admin</Link>
        )}

        {!user && <Link to="/signup">Signup</Link>}
        {!user && <Link to="/login">Login</Link>}

        {user && (
          <button onClick={handleLogout} style={styles.logout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 20px",
    background: "#222",
    color: "#fff"
  },
  logo: { margin: 0 },
  links: {
    display: "flex",
    gap: "15px",
    alignItems: "center"
  },
  logout: {
    background: "red",
    color: "white",
    border: "none",
    padding: "6px 10px",
    cursor: "pointer"
  }
};

export default Navbar;
