// Dashboard.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const DashboardPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getToken = () => localStorage.getItem("token");

  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchDashboard = async () => {
      try {
        const res = await axios.get("/api/auth/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // backend should return { data: user }
        setUser(res.data?.data ?? res.data ?? null);
      } catch (error) {
        localStorage.clear();
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [navigate]);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const goToEdit = () => {
    // Redirect to an edit page. Create EditProfilePage and route /edit-profile in App.jsx
    navigate("/edit-profile");
  };

  if (loading) return <div className="dash-loading">Loading dashboard...</div>;
  if (!user) return null;

  const initials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((s) => s[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <div className="brand">
          <div className="logo-mark">sk</div>
          <div className="brand-text">
            <h1>MyApp</h1>
            <small>Student Dashboard</small>
          </div>
        </div>

        <div className="header-actions">
          <button className="btn btn-edit" onClick={goToEdit}>Edit</button>
          <button className="btn btn-logout" onClick={logout}>Logout</button>
        </div>
      </header>

      <main className="dashboard-main">
        <aside className="profile-column">
          <div className="profile-card">
            <div className="avatar">{initials(user.fullName)}</div>
            <h2 className="profile-name">{user.fullName}</h2>
            <p className="profile-role">Member since {new Date(user.createdAt).toLocaleDateString()}</p>


          </div>
        </aside>

        <section className="details-column">
          <div className="details-card">
            <div className="details-header">
              <h1>Personal Information</h1>
            </div>

            <div className="details-grid">
              <div className="info-row"><span>Full Name</span><span>{user.fullName}</span></div>
              <div className="info-row"><span>Email</span><span>{user.email}</span></div>
              <div className="info-row"><span>Phone Number</span><span>{user.phoneNumber || "-"}</span></div>
              <div className="info-row"><span>Age</span><span>{user.age || "-"}</span></div>
              <div className="info-row info-address"><span>Address</span><span>{user.address || "-"}</span></div>
            </div>
          </div>

        </section>
      </main>
    </div>
  );
};
export default DashboardPage;