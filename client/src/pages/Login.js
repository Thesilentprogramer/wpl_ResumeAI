import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const Login = () => {
  const { login } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${process.env.REACT_APP_API_URL}/auth/google`;
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
            <h1 className="text-3xl font-black">Welcome back</h1>
            <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Log in to continue building your resume</p>
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <input className={`w-full px-4 py-3 rounded-lg border ${theme === 'dark' ? 'bg-white/5 border-white/10 placeholder-gray-500' : 'bg-white border-gray-300 placeholder-gray-400'}`} placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" className={`w-full px-4 py-3 rounded-lg border ${theme === 'dark' ? 'bg-white/5 border-white/10 placeholder-gray-500' : 'bg-white border-gray-300 placeholder-gray-400'}`} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button disabled={loading} className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg shadow-blue-500/30">{loading ? 'Loading...' : 'Login'}</button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className={`w-full border-t ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'}`}></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className={`px-2 ${theme === 'dark' ? 'bg-white/5 text-gray-400' : 'bg-white text-gray-500'}`}>
                Or continue with
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={handleGoogleLogin}
            className={`w-full px-4 py-3 rounded-lg border flex items-center justify-center gap-2 transition-colors ${
              theme === 'dark'
                ? 'bg-white/5 border-white/10 hover:bg-white/10'
                : 'bg-white border-gray-300 hover:bg-gray-50'
            }`}
          >
            <svg className="w-5 h-5" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
              <path fill="none" d="M0 0h48v48H0z"></path>
            </svg>
            <span>Sign in with Google</span>
          </button>
          <p className={theme === 'dark' ? 'text-gray-400 text-sm' : 'text-gray-600 text-sm'}>
            No account? <Link className="text-blue-500 font-semibold" to="/signup">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;


