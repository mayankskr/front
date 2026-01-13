// Register.jsx
import React, { useState } from "react";
import "./register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegistrationPage = ()=> {
  const [form, setForm] = useState({
    name: "",
    email: "",
    age: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
const navigateTo = ()=>{
  navigate("/login")
}
// validate: only frontend checks (no backend checks)
const validate = () => {
  const newErrors = {};

  if (!form.name.trim()) newErrors.name = "Full name is required.";

  if (!form.email.trim()) newErrors.email = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    newErrors.email = "Enter a valid email.";

  if (!form.age) newErrors.age = "Age is required.";
  else if (isNaN(form.age) || Number(form.age) <= 0) newErrors.age = "Enter a valid age.";

  if (!form.phone) newErrors.phone = "Phone number is required.";
  else if (!/^[6-9][0-9]{9}$/.test(form.phone))
    newErrors.phone = "Enter a valid 10-digit Indian mobile number.";

  if (!form.password) newErrors.password = "Password is required.";
  else if (form.password.length < 6) newErrors.password = "Password must be at least 6 characters.";

  if (!form.confirmPassword) newErrors.confirmPassword = "Confirm your password.";
  if (form.password && form.confirmPassword && form.password !== form.confirmPassword)
    newErrors.confirmPassword = "Passwords do not match.";

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
const isFormValid = () => {
  return (
    form.name.trim() &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) &&
    form.age &&
    /^[6-9][0-9]{9}$/.test(form.phone) &&
    form.password.length >= 6 &&
    form.password === form.confirmPassword
  );
};
const isFormFilled = () => {
  return Object.values(form).every((value) => value.trim() !== "");
};

// handleSubmit: call validate(), then handle backend duplicate email in catch
const handleSubmit = async (e) => {
  e.preventDefault();

  // clear previous API error before validating
  setErrors((prev) => {
    const copy = { ...prev };
    delete copy.api;
    return copy;
  });

  if (!validate()) return;

  try {
    const res = await axios.post("/api/auth/register", {
      fullName: form.name,
      age: form.age,
      address: form.address,
      phoneNumber: form.phone,
      email: form.email,
      password: form.password,
    });

    const token = res.data?.data?.token ?? res.data?.token;
    const user = res.data?.data?.user ?? res.data?.user;

    if (!token || !user) {
      setErrors({ api: "Registration succeeded but server did not return a token." });
      return;
    }

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    navigate("/dashboard");
  } catch (error) {
    // inspect server response (use console.log while debugging)
    // console.log("Register error response:", error.response?.data);

    const serverMessage = error.response?.data?.message ?? error.response?.data?.error;
    if (serverMessage === "Email is already registered" || error.response?.status === 409) {
      // set email-specific error from backend
      setErrors((prev) => ({ ...prev, email: "Email is already registered." }));
    } else {
      const apiMsg = serverMessage ?? "Registration failed";
      setErrors({ api: apiMsg });
    }
  }
};


  // update form and clear field-specific error when user types
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
    if (errors.api) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy.api;
        return copy;
      });
    }
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
                {errors.name && <small className="error">{errors.name}</small>}
              </label>

              <label className="input-wrap">
                <span className="icon" aria-hidden>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="#8b7be6" strokeWidth="1.2" />
                  </svg>
                </span>
                <input type="number" name="age" value={form.age} onChange={handleChange} placeholder="Age" />
                {errors.age && <small className="error">{errors.age}</small>}
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
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 
                            19.86 19.86 0 0 1-8.63-3.07 
                            19.5 19.5 0 0 1-6-6 
                            19.86 19.86 0 0 1-3.07-8.67 
                            A2 2 0 0 1 4.11 2h3 
                            a2 2 0 0 1 2 1.72 
                            12.84 12.84 0 0 0 .7 2.81 
                            2 2 0 0 1-.45 2.11L8.09 9.91 
                            a16 16 0 0 0 6 6l1.27-1.27 
                            a2 2 0 0 1 2.11-.45 
                            12.84 12.84 0 0 0 2.81.7 
                            a2 2 0 0 1 1.72 2z"
                          stroke="#8b7be6" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>

                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  pattern="^[6-9][0-9]{9}$"
                  title="Enter a valid 10-digit Indian mobile number"
                  required
                />
                {errors.phone && <small className="error">{errors.phone}</small>}
              </label>

              <label className="input-wrap">
                <span className="icon" aria-hidden>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M4 4h16v12H4z" stroke="#8b7be6" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M22 6l-10 7L2 6" stroke="#8b7be6" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
                {errors.email && <small className="error">{errors.email}</small>}
              </label>
              
              <label className="input-wrap">
                <span className="icon" aria-hidden>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="11" width="18" height="10" rx="2" stroke="#8b7be6" strokeWidth="1.2" />
                    <path d="M7 11V8a5 5 0 0 1 10 0v3" stroke="#8b7be6" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Password" required />
                {errors.password && <small className="error">{errors.password}</small>}
              </label>

              <label className="input-wrap">
                <span className="icon" aria-hidden>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="11" width="18" height="10" rx="2" stroke="#8b7be6" strokeWidth="1.2" />
                  </svg>
                </span>
                <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="Confirm Password" required />
                {errors.confirmPassword && <small className="error">{errors.confirmPassword}</small>}
              </label>

              {errors.api && <div className="error-box">{errors.api}</div>}

              <button
                className="btn-register"
                type="submit"
                disabled={!isFormFilled()}
              >
                REGISTER
              </button>
            </form>
            <p className="text-outer">Already a user <a href="/login" className="link">Login</a></p>
          </div>
        </main>
      </div>
    </div>
  );
}
export default RegistrationPage;