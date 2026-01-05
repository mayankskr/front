// src/components/RegistrationPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegistrationPage() {
  const [form, setForm] = useState({
    name: "",
    age: "",
    className: "",
    address: "",
    phone: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

 const navigate = useNavigate();

const handleSubmit = (e) => {
  e.preventDefault();

  localStorage.setItem("isRegistered", "true");
  localStorage.setItem("isLoggedIn", "true");

  navigate("/dashboard");
};



  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
      <div className="w-full max-w-6xl h-[520px] rounded-xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 bg-white">
        {/* LEFT HERO */}
        <div className="relative p-12 md:p-16 flex flex-col justify-center text-white bg-gradient-to-br from-indigo-700 via-purple-600 to-pink-400">
          <div className="relative z-10 max-w-lg">
            <h1 className="text-3xl md:text-4xl font-semibold leading-tight">Welcome to website</h1>
            <p className="mt-4 text-sm md:text-base opacity-90">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>

          {/* decorative shapes */}
          <div className="absolute left-0 bottom-0 w-full h-40 opacity-70 pointer-events-none">
            <svg viewBox="0 0 300 100" preserveAspectRatio="none" className="w-full h-full">
              <defs>
                <linearGradient id="g1" x1="0" x2="1">
                  <stop offset="0" stopColor="#FFD27A" />
                  <stop offset="1" stopColor="#FF6B9A" />
                </linearGradient>
              </defs>
              <g fill="url(#g1)">
                <rect x="10" y="55" width="80" height="10" rx="6" transform="rotate(-18 50 60)" />
                <rect x="90" y="45" width="100" height="14" rx="8" transform="rotate(-18 140 52)" />
                <rect x="200" y="38" width="70" height="16" rx="8" transform="rotate(-18 235 46)" />
              </g>
            </svg>
          </div>

          {/* subtle overlay rectangle like sample */}
          <div className="absolute inset-0 bg-white/6 left-12 top-6 w-11/12 rounded-md pointer-events-none"></div>
        </div>

        {/* RIGHT CARD (Registration) */}
        <div className="flex items-center justify-center bg-white p-8 md:p-10">
          <div className="w-full max-w-sm">
<h3
  className="text-xs text-purple-600 text-right font-semibold cursor-pointer"
  onClick={() => navigate("/login")}
>
  ALREADY A USER: LOGIN
</h3>
            <form className="mt-6 space-y-3" onSubmit={handleSubmit}>

              {/* Name */}
              <div className="relative">
                <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 4a3 3 0 110 6 3 3 0 010-6z" />
                    <path fillRule="evenodd" d="M3 16a7 7 0 0114 0v1H3v-1z" clipRule="evenodd" />
                  </svg>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    type="text"
                    placeholder="Full Name"
                    className="ml-3 bg-transparent w-full outline-none text-sm text-black"
                    required
                  />
                </div>
              </div>

              {/* Age */}
              <div className="relative">
                <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 11h3v2h-5V7h2v6z" />
                  </svg>
                  <input
                    name="age"
                    value={form.age}
                    onChange={handleChange}
                    type="number"
                    placeholder="Age"
                    className="ml-3 bg-transparent w-full outline-none text-sm text-black"
                    required
                    min="1"
                  />
                </div>
              </div>

              {/* Class */}
              <div className="relative">
                <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 6v12h18V6H3zm2 2h14v2H5V8zm0 4h8v2H5v-2z" />
                  </svg>
                  <input
                    name="className"
                    value={form.className}
                    onChange={handleChange}
                    type="text"
                    placeholder="Class"
                    className="ml-3 bg-transparent w-full outline-none text-sm text-black"
                    required
                  />
                </div>
              </div>

              {/* Address */}
              <div className="relative">
                <div className="flex items-start bg-gray-100 rounded-2xl px-4 py-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="mt-1 h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.1 2 5 5.1 5 9c0 7 7 13 7 13s7-6 7-13c0-3.9-3.1-7-7-7z" />
                    <path d="M12 11.5A2.5 2.5 0 1012 6.5a2.5 2.5 0 000 5z" />
                  </svg>
                  <textarea
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Address"
                    rows="2"
                    className="ml-3 bg-transparent w-full outline-none text-sm resize-none text-black"
                    required
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="relative">
                <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6.6 10.8a15.1 15.1 0 006.6 6.6l2.2-2.2a1 1 0 011.1-.27c1.2.5 2.6.8 4 .8a1 1 0 011 1v3.5a1 1 0 01-1 1C10.7 21 3 13.3 3 3a1 1 0 011-1H7.5a1 1 0 011 1c0 1.4.3 2.8.8 4a1 1 0 01-.3 1.1L6.6 10.8z" />
                  </svg>
                  <input
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    placeholder="Phone Number"
                    className="ml-3 bg-transparent w-full outline-none text-sm text-black"
                    required
                  />

                </div>
              </div>

              {/* Email */}
              <div className="relative">
                <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M2 6.5V18a2 2 0 002 2h16a2 2 0 002-2V6.5L12 12 2 6.5z" />
                    <path d="M22 5H2l10 6 10-6z" />
                  </svg>
                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    type="email"
                    placeholder="Email"
                    className="ml-3 bg-transparent w-full outline-none text-sm text-black"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="relative">
                <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 17a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M6 8V7a6 6 0 0112 0v1h1a2 2 0 012 2v7a2 2 0 01-2 2H5a2 2 0 01-2-2v-7a2 2 0 012-2h1zm2 0h8V7a4 4 0 00-8 0v1z" />
                  </svg>
                  <input
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    type="password"
                    placeholder="Password"
                    className="ml-3 bg-transparent w-full outline-none text-sm text-black"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm font-semibold"
              >
                REGISTER
              </button>

              <p className="mt-4 text-xs text-gray-400 text-center">By registering, you agree to our terms and conditions.</p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
