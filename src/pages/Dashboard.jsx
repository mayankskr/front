import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

export const DashboardPage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await axios.get(
          "/api/auth/dashboard",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setUser(res.data.data);
      } catch (error) {
        // Token invalid or expired
        localStorage.clear();
        navigate("/login");
      }
    };

    fetchDashboard();
  }, [navigate]);

  if (!user) return <h2>Loading...</h2>;

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h2>User Dashboard</h2>

        <div className="info-row">
          <span>Full Name:</span>
          <span>{user.fullName}</span>
        </div>

        <div className="info-row">
          <span>Email:</span>
          <span>{user.email}</span>
        </div>

        <div className="info-row">
          <span>Age:</span>
          <span>{user.age}</span>
        </div>

        <div className="info-row">
          <span>Address:</span>
          <span>{user.address}</span>
        </div>
      </div>
    </div>
  );
};
