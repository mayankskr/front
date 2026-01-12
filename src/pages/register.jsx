/* RegistrationPage.jsx (React) - save alongside RegistrationPage.css

Usage:
1. Save this file as RegistrationPage.jsx
2. Save the CSS (below) as RegistrationPage.css in the same folder
3. Import and render <RegistrationPage /> from App.jsx

This component recreates the split registration layout (left gradient hero + right white form panel)
*/

import React, { useState } from "react";
import "./register.css";

export default function RegistrationPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    age: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      return alert("Please fill all required fields.");
    }
    if (form.password !== form.confirmPassword) {
      return alert("Passwords do not match.");
    }
    console.log("Registration data:", form);
    // call your API here
  };

  return (
    <div className="registration-hero">
      <div className="registration-card">
        <aside className="hero-left">
          <div className="hero-content">
            <h1>Welcome to website</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed diam
              nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
              volutpat.
            </p>
          </div>
          <svg className="hero-deco" viewBox="0 0 800 400" preserveAspectRatio="none" aria-hidden>
            <defs>
              <linearGradient id="g2" x1="0%" x2="100%">
                <stop offset="0%" stopColor="#ff8a65" />
                <stop offset="100%" stopColor="#ffd270" />
              </linearGradient>
            </defs>
            <g fill="url(#g2)" opacity="0.78">
              <rect x="40" y="260" rx="30" ry="30" width="220" height="40" transform="rotate(-22 150 280)" />
              <rect x="200" y="300" rx="30" ry="30" width="260" height="40" transform="rotate(-22 330 320)" />
              <rect x="320" y="170" rx="30" ry="30" width="180" height="40" transform="rotate(-18 410 190)" />
            </g>
          </svg>
        </aside>

        <main className="hero-right">
          <div className="registration-form-card">
            <h3>USER REGISTRATION</h3>

            <form onSubmit={handleSubmit} className="form" noValidate>
              <label className="input-wrap">
                <span className="icon" aria-hidden>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5z" stroke="#8b7be6" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M20 21v-1c0-2.761-3.582-5-8-5s-8 2.239-8 5v1" stroke="#8b7be6" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Full Name" required />
              </label>

              <label className="input-wrap">
                <span className="icon" aria-hidden>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M4 4h16v12H4z" stroke="#8b7be6" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M22 6l-10 7L2 6" stroke="#8b7be6" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
              </label>

              <label className="input-wrap">
                <span className="icon" aria-hidden>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="#8b7be6" strokeWidth="1.2" />
                  </svg>
                </span>
                <input type="number" name="age" value={form.age} onChange={handleChange} placeholder="Age" />
              </label>

              <label className="input-wrap textarea-wrap">
                <span className="icon" aria-hidden>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M3 7h18M3 12h18M3 17h12" stroke="#8b7be6" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <textarea name="address" value={form.address} onChange={handleChange} placeholder="Address" />
              </label>

              <label className="input-wrap">
                <span className="icon" aria-hidden>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="11" width="18" height="10" rx="2" stroke="#8b7be6" strokeWidth="1.2" />
                    <path d="M7 11V8a5 5 0 0 1 10 0v3" stroke="#8b7be6" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Password" required />
              </label>

              <label className="input-wrap">
                <span className="icon" aria-hidden>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="11" width="18" height="10" rx="2" stroke="#8b7be6" strokeWidth="1.2" />
                  </svg>
                </span>
                <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="Confirm Password" required />
              </label>

              <button className="btn-register" type="submit">REGISTER</button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

