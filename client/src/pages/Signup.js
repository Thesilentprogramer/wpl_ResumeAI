import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const Signup = () => {
  const { signup } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await signup(name, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 relative overflow-hidden ${
      theme === 'dark' 
        ? 'bg-gradient-to-b from-[#0a0f2d] via-[#0a1338] to-[#0b1a4a]'
        : 'bg-gradient-to-b from-white via-gray-50 to-gray-100'
    }`}>
      <div className={`pointer-events-none absolute inset-0 transition-opacity duration-300 ${
        theme === 'dark'
          ? '[background-image:linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] opacity-[0.08]'
          : '[background-image:linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.05)_1px,transparent_1px)] opacity-50'
      } bg-[length:40px_40px]`}></div>

      <header className={`w-full px-6 sm:px-12 py-4 flex items-center justify-between bg-transparent border-b transition-colors duration-300 ${
        theme === 'dark' ? 'border-white/10' : 'border-gray-200'
      }`}>
        <button onClick={() => navigate('/')} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
            <span className="text-white text-xl font-bold">R</span>
          </div>
          <h1 className={`text-xl sm:text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>ResumeAI</h1>
        </button>
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'}`}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <span className="material-symbols-outlined text-yellow-400">light_mode</span>
          ) : (
            <span className="material-symbols-outlined text-gray-700">dark_mode</span>
          )}
        </button>
      </header>

      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-6">
        <form
          onSubmit={onSubmit}
          className={`w-full max-w-md space-y-5 rounded-2xl p-8 backdrop-blur-sm transition-colors duration-300 ${
            theme === 'dark'
              ? 'bg-white/5 border border-white/10 text-white'
              : 'bg-white border border-gray-200 shadow-xl text-gray-900'
          }`}
        >
          <div className="space-y-1">
            <h1 className="text-3xl font-black">Create your account</h1>
            <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Start building a job‑ready resume</p>
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <input className={`w-full px-4 py-3 rounded-lg border ${theme === 'dark' ? 'bg-white/5 border-white/10 placeholder-gray-500' : 'bg-white border-gray-300 placeholder-gray-400'}`} placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <input className={`w-full px-4 py-3 rounded-lg border ${theme === 'dark' ? 'bg-white/5 border-white/10 placeholder-gray-500' : 'bg-white border-gray-300 placeholder-gray-400'}`} placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" className={`w-full px-4 py-3 rounded-lg border ${theme === 'dark' ? 'bg-white/5 border-white/10 placeholder-gray-500' : 'bg-white border-gray-300 placeholder-gray-400'}`} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button disabled={loading} className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold hover:from-green-600 hover:to-green-700 transition-all shadow-lg shadow-green-500/30">{loading ? 'Loading...' : 'Sign up'}</button>
          <p className={theme === 'dark' ? 'text-gray-400 text-sm' : 'text-gray-600 text-sm'}>
            Already have an account? <Link className="text-blue-500 font-semibold" to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;


