import React from 'react';
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
  e.preventDefault();

  localStorage.setItem("isLoggedIn", "true");
  navigate("/dashboard");
};

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-purple-600 via-pink-500 to-indigo-500">
      <div className="w-full max-w-5xl bg-white/0 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* LEFT PANEL */}
        <div className="relative p-12 md:p-16 flex flex-col justify-center bg-gradient-to-br from-purple-700 via-pink-500 to-orange-400 text-white">
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            {/* Decorative slashes using SVG for the style in the design */}
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="g" x1="0" x2="1">
                  <stop offset="0" stopColor="#FFD27A" />
                  <stop offset="1" stopColor="#FF6B9A" />
                </linearGradient>
              </defs>
              <g fill="url(#g)">
                <rect x="5" y="70" width="30" height="6" rx="3" transform="rotate(-20 20 73)" />
                <rect x="30" y="60" width="36" height="8" rx="4" transform="rotate(-20 50 64)" />
                <rect x="60" y="50" width="28" height="10" rx="5" transform="rotate(-20 74 55)" />
                <rect x="10" y="40" width="20" height="5" rx="3" transform="rotate(-15 20 42)" />
              </g>
            </svg>
          </div>

          <div className="relative z-10 max-w-lg">
            <h1 className="text-3xl md:text-4xl font-semibold">Welcome to website</h1>
            <p className="mt-4 text-sm md:text-base opacity-90">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="p-8 md:p-12 bg-white flex items-center justify-center">
          <div className="w-full max-w-sm">
            <h3 className="text-sm font-medium text-gray-500 text-right">USER LOGIN</h3>

            <form className="mt-6 space-y-4">
              <div className="relative">
                <label className="sr-only">Email</label>
                <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.94 6.94a.75.75 0 011.06 0L10 12.94l5.99-6a.75.75 0 011.06 1.06l-6.5 6.5a.75.75 0 01-1.06 0l-6.5-6.5a.75.75 0 010-1.06z" />
                  </svg>
                  <input type="email" placeholder="Email" className="ml-3 bg-transparent w-full outline-none text-sm text-black" />
                </div>
              </div>

              <div className="relative">
                <label className="sr-only">Password</label>
                <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9a3 3 0 116 0v1h4a1 1 0 011 1v4a1 1 0 01-1 1H4a1 1 0 01-1-1v-4a1 1 0 011-1h1V9zm3-3a2 2 0 00-2 2v1h4V8a2 2 0 00-2-2z" clipRule="evenodd" />
                  </svg>
                  <input type="password" placeholder="Password" className="ml-3 bg-transparent w-full outline-none text-sm text-black" />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-500">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="h-4 w-4 rounded" />
                  Remember me
                </label>
                <a href="#" className="underline">Forgot password?</a>
              </div>

              <button type="submit" className="w-full mt-3 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-medium">LOGIN</button>

              <div className="mt-5 text-center text-sm text-gray-400">or login with</div>

              <div className="mt-4 flex gap-3">
                <button type="button" className="flex-1 py-2 rounded-full bg-white border border-gray-200 text-gray-700 flex items-center justify-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 48 48"><path fill="#4285F4" d="M44.5 20H24v8.5h11.9C34.6 32.5 30 36 24 36c-7 0-12.7-5.7-12.7-12.7S17 10.5 24 10.5c3.3 0 6.3 1.2 8.6 3.3l6.9-6.9C37.8 4.3 31.3 2 24 2 11.9 2 2 11.9 2 24s9.9 22 22 22 20-8.9 20-22c0-1.3-.1-2.6-.5-3.8z"/></svg>
                  Google
                </button>
              </div>

              <p className="mt-6 text-xs text-gray-400 text-center">
                New user?{" "}
                <span
                className="text-purple-600 font-semibold cursor-pointer"
                onClick={() => navigate("/register")}
                >
                  Register here
                </span>
              </p>

              <p className="mt-6 text-xs text-gray-400 text-center">Designed with care.</p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
