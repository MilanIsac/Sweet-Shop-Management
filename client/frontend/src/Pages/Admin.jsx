import { useEffect, useState } from "react";
import { getAdminStats } from "../api/api";
import { useAuth } from "../auth/useAuth";

const Admin = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const res = await getAdminStats();
    setStats(res.data);
  };

  if (!stats) return <h3>Loading dashboard...</h3>;

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <p>Welcome, {user.name}</p>

      <div style={{ marginTop: "20px" }}>
        <p>📦 Total Sweets: {stats.totalSweets}</p>
        <p>👤 Total Users: {stats.totalUsers}</p>
        <p>📊 Total Stock: {stats.totalStock}</p>
      </div>
    </div>
  );
};

export default Admin;
