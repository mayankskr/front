import React from "react";
import "./Dashboard.css";

const DashboardPage = ({ user }) => {
    const userD = {
  name: "Rahul Sharma",
  email: "rahul.sharma@example.com",
  password: "********",
  age: 22,
  address: "B-203, Green Park, New Delhi, India"
};

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h2>User Dashboard</h2>

        <div className="info-row">
          <span>Full Name:</span>
          <span>{userD.name}</span>
        </div>

        <div className="info-row">
          <span>Email:</span>
          <span>{userD.email}</span>
        </div>

        <div className="info-row">
          <span>Password:</span>
          <span>{userD.password}</span>
        </div>

        <div className="info-row">
          <span>Age:</span>
          <span>{userD.age}</span>
        </div>

        <div className="info-row">
          <span>Address:</span>
          <span>{userD.address}</span>
        </div>

        <button className="edit-btn">Change Details</button>
      </div>
    </div>
  );
};

export default DashboardPage;
