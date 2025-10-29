import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { listMyResumes } from '../api';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    listMyResumes()
      .then((res) => setItems(res.items || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-300 relative overflow-hidden ${
      theme === 'dark' 
        ? 'bg-gradient-to-b from-[#0a0f2d] via-[#0a1338] to-[#0b1a4a]'
        : 'bg-gradient-to-b from-white via-gray-50 to-gray-100'
    }`}>
      {/* Grid overlay */}
      <div className={`pointer-events-none absolute inset-0 transition-opacity duration-300 ${
        theme === 'dark'
          ? '[background-image:linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] opacity-[0.08]'
          : '[background-image:linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.05)_1px,transparent_1px)] opacity-50'
      } bg-[length:40px_40px]`}></div>

      {/* Header */}
      <header className={`w-full px-6 sm:px-12 py-4 flex items-center justify-between bg-transparent border-b transition-colors duration-300 ${
        theme === 'dark' ? 'border-white/10' : 'border-gray-200'
      }`}>
        <button onClick={() => navigate('/')} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
            <span className="text-white text-xl font-bold">R</span>
          </div>
          <h1 className={`text-xl sm:text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Dashboard</h1>
        </button>
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            {theme === 'dark' ? (
              <span className="material-symbols-outlined text-yellow-400">light_mode</span>
            ) : (
              <span className="material-symbols-outlined text-gray-700">dark_mode</span>
            )}
          </button>
          <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-red-500 to-red-600 text-white font-medium" onClick={logout}>Logout</button>
        </div>
      </header>

      <main className="relative z-10 px-6 sm:px-12 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className={`text-2xl font-black ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Hi, {user?.name}</h2>
              <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Manage your resumes</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 rounded-lg border font-medium transition-all hover:shadow-sm" onClick={() => navigate('/') }>
                Home
              </button>
              <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium shadow-lg shadow-blue-500/30" onClick={() => navigate('/builder')}>
                <span className="material-symbols-outlined text-sm">add</span>
                Create Resume
              </button>
            </div>
          </div>

          {loading ? (
            <div className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>Loading...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((it) => (
                <div key={it._id} className={`p-5 rounded-2xl backdrop-blur-sm transition-colors duration-300 ${
                  theme === 'dark' ? 'bg-white/5 border border-white/10' : 'bg-white border border-gray-200 shadow-md'
                }`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className={theme === 'dark' ? 'text-white font-semibold' : 'text-gray-900 font-semibold'}>Resume</div>
                      <div className={theme === 'dark' ? 'text-gray-400 text-sm' : 'text-gray-600 text-sm'}>
                        Updated {new Date(it.updatedAt || it.savedAt).toLocaleDateString()}
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-3xl text-blue-500">description</span>
                  </div>
                  <div className="mt-4 flex gap-3">
                    <button className="px-3 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium" onClick={() => navigate(`/builder?resumeId=${it._id}`)}>Edit</button>
                    <button className={`px-3 py-2 rounded-lg font-medium ${theme === 'dark' ? 'border border-white/10 text-white hover:bg-white/5' : 'border border-gray-300 text-gray-700 hover:bg-gray-50'}`} onClick={() => navigate('/analysis')}>Analyze</button>
                  </div>
                </div>
              ))}
              {items.length === 0 && (
                <div className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>No resumes yet. Create your first one!</div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;


