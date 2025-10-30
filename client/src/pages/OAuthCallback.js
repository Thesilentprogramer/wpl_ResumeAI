import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const OAuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, loading } = useAuth();
  const [error, setError] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');
    const userParam = searchParams.get('user');
    const errorParam = searchParams.get('error');

    if (errorParam) {
      setError('OAuth login failed. Please try again.');
      setTimeout(() => navigate('/login'), 2000);
      return;
    }

    if (token && userParam) {
      try {
        localStorage.setItem('token', token);
        const userData = JSON.parse(decodeURIComponent(userParam));
        localStorage.setItem('user', JSON.stringify(userData));
        
        // Redirect to dashboard after a short delay
        setTimeout(() => navigate('/dashboard'), 500);
      } catch (err) {
        setError('Failed to process login. Please try again.');
        setTimeout(() => navigate('/login'), 2000);
      }
    } else if (!token && !errorParam) {
      setError('Invalid callback parameters');
      setTimeout(() => navigate('/login'), 2000);
    }
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100">
      <div className="text-center">
        {error ? (
          <>
            <h1 className="text-2xl font-bold text-red-600 mb-2">{error}</h1>
            <p className="text-gray-600">Redirecting...</p>
          </>
        ) : (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Completing login...</h1>
            <p className="text-gray-600">Please wait while we set up your account</p>
          </>
        )}
      </div>
    </div>
  );
};

export default OAuthCallback;
