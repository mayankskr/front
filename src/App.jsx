import { Routes, Route } from "react-router-dom";
import { RegistrationPage } from "./pages/Register.jsx";
import { LoginPage } from "./pages/Login.jsx";
import { DashboardPage } from "./pages/Dashboard.jsx";
console.log("App loaded");


function App() {
  return (
    <Routes>
      <Route path="/" element={<RegistrationPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
    </Routes>
  );
}

export default App;