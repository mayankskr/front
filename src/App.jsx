import { Routes, Route, Navigate } from "react-router-dom";
import RegistrationPage from "./pages/RegistrationPage";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

/* Check if user is registered */
const isRegistered = () =>
  localStorage.getItem("isRegistered") === "true";

/* Check if user is logged in */
const isLoggedIn = () =>
  localStorage.getItem("isLoggedIn") === "true";

export default function App() {
  return (
    <Routes>

      {/* Default route */}
      <Route
        path="/"
        element={
          isRegistered()
            ? <Navigate to="/login" />
            : <RegistrationPage />
        }
      />

      {/* Registration page */}
      <Route
        path="/register"
        element={
          isRegistered()
            ? <Navigate to="/login" />
            : <RegistrationPage />
        }
      />

      {/* Login page */}
      <Route
        path="/login"
        element={
          isLoggedIn()
            ? <Navigate to="/dashboard" />
            : <Login />
        }
      />

      {/* Dashboard (Protected Route) */}
      <Route
        path="/dashboard"
        element={
          isLoggedIn()
            ? <Dashboard />
            : <Navigate to="/login" />
        }
      />

    </Routes>
  );
}
