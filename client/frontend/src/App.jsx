import { Routes, Route } from "react-router-dom";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Sweets from "./Pages/Sweets";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/sweets"
        element={
          <ProtectedRoute>
            <Sweets />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
