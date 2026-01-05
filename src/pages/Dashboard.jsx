import React from 'react';
import { useNavigate } from "react-router-dom";

export default function StudentDashboard() {
 const navigate = useNavigate();

const handleLogout = () => {
  localStorage.clear();
  window.location.href = "/login";
};


  const student = {
    name: 'fname lname ',
    role: 'Student',
    email: 'abcd@example.com',
    progressText: 'You have learned 80% of your course',
  };

  const courses = [
    { id: 1, name: 'English', class: 'BCS-4A', percent: 70 },
    { id: 2, name: 'Science', class: 'BCS-4A', percent: 30 },
    { id: 3, name: 'Social', class: 'BCS-4A', percent: 50 },
    { id: 4, name: 'Projects', class: 'BCS-4A', percent: 40 },
    { id: 5, name: 'Arts', class: 'BCS-4A', percent: 100 },
  ];

  const recentResults = [
    { id: 1, title: 'English - Quiz 01', percent: 37, color: 'bg-red-400' },
    { id: 2, title: 'English - Quiz 02', percent: 87, color: 'bg-green-400' },
    { id: 3, title: 'Science - Quiz 01', percent: 50, color: 'bg-yellow-400' },
    { id: 4, title: 'English - Quiz 03', percent: 100, color: 'bg-blue-400' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-white via-blue-50 to-white text-slate-800">
      <div className="max-w-[1300px] mx-auto px-6 py-8">
        <div className="flex gap-6">
          {/* Sidebar */}
          <aside className="w-64 bg-blue-700 text-white rounded-2xl shadow-lg p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center"> 
                  {/* avatar placeholder */}
                  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 20a6 6 0 0112 0" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold">{student.name}</div>
                  <div className="text-sm text-blue-200">{student.role}</div>
                </div>
              </div>

              <nav className="space-y-2 mt-4">
                <NavItem label="Dashboard" active />
                <NavItem label="Time Schedule" />
                <NavItem label="Notifications" />
                <NavItem label="Messages" />
                <NavItem label="Learning Plan" />
                <NavItem label="Help/Report" />
              </nav>
            </div>
            
            {/* logout */}
            <div>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-md"
            >
              Logout
            </button>

            </div>
            <div className="mt-6">
              <button className="w-full bg-white text-blue-700 py-2 rounded-lg font-medium">Upgrade</button>
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1">
            {/* Top header */}
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-semibold text-slate-700">Dashboard</h1>
              <div className="flex items-center gap-3">
                <div className="text-sm text-slate-600">1 hour remaining</div>
                <button className="bg-blue-600 text-white px-3 py-2 rounded-md">New Courses</button>
              </div>
            </div>

            {/* Hero card */}
            <div className="bg-blue-50 rounded-2xl p-6 mb-6 shadow-sm flex items-center justify-between">
              <div>
                <div className="text-lg font-semibold">Hello {student.name.split(' ')[0]},</div>
                <div className="text-sm text-slate-600 mt-2">{student.progressText}</div>
                <button className="mt-4 bg-white text-blue-700 px-3 py-2 rounded-md shadow-sm">View Result</button>
              </div>

              <div className="w-48 h-48 bg-white rounded-lg flex items-center justify-center">
                {/* Illustration placeholder */}
                <svg className="w-28 h-28 text-blue-400" viewBox="0 0 64 64" fill="none" stroke="currentColor">
                  <circle cx="32" cy="20" r="8" strokeWidth="1.5" />
                  <rect x="12" y="34" width="40" height="16" rx="3" strokeWidth="1.5" />
                </svg>
              </div>
            </div>

            {/* Grid: Courses + Recent Results */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Courses card (span 2 columns on large) */}
              <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Your Courses</h3>
                  <div className="text-sm text-slate-500">Search Course</div>
                </div>

                <div className="space-y-3">
                  {courses.map((c) => (
                    <div key={c.id} className="flex items-center justify-between bg-blue-50 rounded-lg p-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-md bg-white flex items-center justify-center font-semibold text-blue-700">{c.name.charAt(0)}</div>
                        <div>
                          <div className="font-medium">{c.name}</div>
                          <div className="text-sm text-slate-500">{c.class}</div>
                        </div>
                      </div>

                      <div className="w-40 text-right">
                        <div className="text-sm text-slate-500 mb-2">{c.percent}%</div>
                        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                          <div className={`h-2 rounded-full ${c.percent > 70 ? 'bg-green-400' : c.percent > 40 ? 'bg-yellow-400' : 'bg-red-400'}`} style={{ width: `${c.percent}%` }} />
                        </div>
                      </div>

                      <div>
                        <button className="ml-4 bg-white border border-slate-200 px-3 py-1 rounded-md text-sm">View</button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between mt-6">
                  <button className="bg-white border border-slate-200 px-4 py-2 rounded-md">View More</button>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md">Enroll Course</button>
                </div>
              </div>

              {/* Recent results */}
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Recent Results</h3>
                  <a className="text-sm text-slate-500">View More</a>
                </div>

                <div className="space-y-4">
                  {recentResults.map((r) => (
                    <div key={r.id}>
                      <div className="flex items-center justify-between text-sm text-slate-700 mb-1">
                        <div>{r.title}</div>
                        <div className="text-sm text-slate-500">{r.percent}%</div>
                      </div>
                      <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mb-2">
                        <div className={`${r.color} h-2`} style={{ width: `${r.percent}%` }} />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 space-y-3">
                  <div className="bg-blue-50 p-3 rounded-md">Leave - Want to take a Leave?</div>
                  <div className="bg-blue-50 p-3 rounded-md">Complaint - Want to complain?</div>
                </div>
              </div>
            </div>

            {/* Additional row for tables or cards (optional) */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-md">Other stats / widgets</div>
              <div className="bg-white rounded-2xl p-6 shadow-md">Notifications / quick actions</div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

function NavItem({ label, active = false }) {
  return (
    <div className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer ${active ? 'bg-white/10' : 'hover:bg-white/5'}`}>
      <svg className="w-5 h-5 text-white/90" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 7h18M3 12h18M3 17h18" />
      </svg>
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}
