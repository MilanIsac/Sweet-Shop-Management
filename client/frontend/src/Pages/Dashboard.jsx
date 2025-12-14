import { useAuth } from "../auth/useAuth";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Dashboard</h2>
      <p>Welcome, <b>{user?.email}</b></p>

      {user?.role === "admin" && (
        <p style={{ color: "green" }}>
          You are an Admin 👑
        </p>
      )}
    </div>
  );
};

export default Dashboard;
