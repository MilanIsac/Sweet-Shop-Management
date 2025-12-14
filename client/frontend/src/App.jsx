import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar";

import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Sweets from "./Pages/Sweets";
import Admin from "./Pages/Admin";

import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";

const App = () => {
  return (
    <>
      {/* ✅ ALWAYS VISIBLE */}
      <Navbar />

      {/* Page Content */}
      <Routes>
        <Route path="/" element={<Navigate to="/signup" />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/sweets"
          element={
            <ProtectedRoute>
              <Sweets />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
