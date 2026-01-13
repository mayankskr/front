import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import "./login.css";

export function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "", remember: false });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((s) => ({ ...s, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/auth/login",{
          email: form.email,
          password: form.password
        });

      // Store JWT and user info
      localStorage.setItem("token", res.data.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.data.user));

      // Navigate to dashboard
      navigate("/dashboard");

    } catch (error) {
      console.error("LOGIN ERROR FULL:", error);
      console.error("LOGIN ERROR RESPONSE:", error.response);
      alert(error.response?.data?.message || "Login failed");
    }

  };

  return (
    <div className="login-hero">
      <div className="login-card">
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
              <linearGradient id="g1" x1="0%" x2="100%">
                <stop offset="0%" stopColor="#ff8a65" />
                <stop offset="100%" stopColor="#ffd270" />
              </linearGradient>
            </defs>
            <g fill="url(#g1)" opacity="0.7">
              <rect x="40" y="260" rx="30" ry="30" width="220" height="40" transform="rotate(-22 150 280)" />
              <rect x="200" y="300" rx="30" ry="30" width="260" height="40" transform="rotate(-22 330 320)" />
              <rect x="320" y="170" rx="30" ry="30" width="180" height="40" transform="rotate(-18 410 190)" />
            </g>
          </svg>
        </aside>

        <main className="hero-right">
          <div className="login-form-card">
            <h3>USER LOGIN</h3>

            <form onSubmit={handleSubmit} className="form" noValidate>
              <label className="input-wrap">
                <span className="icon" aria-hidden>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5z" stroke="#8b7be6" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M20 21v-1c0-2.761-3.582-5-8-5s-8 2.239-8 5v1" stroke="#8b7be6" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
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

              <div className="form-row">
                <label className="remember">
                  <input type="checkbox" name="remember" checked={form.remember} onChange={handleChange} />
                  <span>Remember</span>
                </label>

                <a className="forgot" href="#">Forgot password?</a>
              </div>

              <button className="btn-login" type="submit">LOGIN</button>
            </form>
            <p className="text-outer">Not registerd? <a href="/register" className="link">Register</a></p>
          </div>
        </main>
      </div>
    </div>
  );
}
