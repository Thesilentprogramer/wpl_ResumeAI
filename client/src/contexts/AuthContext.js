import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { fetchMe, login as apiLogin, signup as apiSignup } from '../api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }
    fetchMe()
      .then((res) => setUser(res.user))
      .catch(() => localStorage.removeItem('token'))
      .finally(() => setLoading(false));
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      login: async (email, password) => {
        const res = await apiLogin({ email, password });
        if (res.token) localStorage.setItem('token', res.token);
        setUser(res.user);
        return res;
      },
      signup: async (name, email, password) => {
        const res = await apiSignup({ name, email, password });
        if (res.token) localStorage.setItem('token', res.token);
        setUser(res.user);
        return res;
      },
      logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
      },
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);


