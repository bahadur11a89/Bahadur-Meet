import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';
import httpStatus from 'http-status';
import server from '../environment';

const defaultAuthValue = {
  user: null,
  setUser: () => {},
  userData: null,
  setUserData: () => {},
  isAuthenticated: false,
  isLoading: false,
  login: async () => {},
  handleLogin: async () => {},
  register: async () => {},
  handleRegister: async () => {},
  logout: () => {},
  getHistoryOfUser: async () => [],
  addToUserHistory: async () => {},
};

export const AuthContext = createContext(defaultAuthValue);

const apiBase = server.endsWith('/api/v1') ? server : `${server}/api/v1`;
const client = axios.create({
  baseURL: `${apiBase}/users`,
});

client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token') || localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Synchronize token and user session on mount
  const initialize = useCallback(async () => {
    const token = localStorage.getItem('token') || localStorage.getItem('authToken');
    if (token) {
      try {
        // Retrieve stored user if present
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        } else {
          setUser({ token });
        }
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Session validation error:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('authToken');
        setUser(null);
        setIsAuthenticated(false);
      }
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // Object-based login (used by LoginForm)
  const login = useCallback(async (credentials) => {
    const username = credentials.username || credentials.email;
    const password = credentials.password;
    
    const response = await client.post('/login', { username, password });
    if (response.status === httpStatus.OK || response.data?.token) {
      const token = response.data.token;
      const userData = response.data.user || { username, token };
      localStorage.setItem('token', token);
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      setIsAuthenticated(true);
      return response.data;
    }
    throw new Error(response.data?.message || 'Login failed');
  }, []);

  // Handler-based login (legacy signature)
  const handleLogin = useCallback(async (username, password) => {
    return login({ username, password });
  }, [login]);

  // Object-based register (used by RegisterForm)
  const register = useCallback(async (userData) => {
    const name = userData.name || `${userData.firstName || ''} ${userData.lastName || ''}`.trim();
    const username = userData.username || userData.email;
    const password = userData.password;

    const response = await client.post('/register', { name, username, password });
    if (response.status === httpStatus.CREATED || response.status === httpStatus.OK) {
      return response.data?.message || 'Registration successful';
    }
    throw new Error(response.data?.message || 'Registration failed');
  }, []);

  // Handler-based register (legacy signature)
  const handleRegister = useCallback(async (name, username, password) => {
    return register({ name, username, password });
  }, [register]);

  // Logout method
  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  // History tracking methods
  const getHistoryOfUser = useCallback(async () => {
    try {
      const token = localStorage.getItem('token') || localStorage.getItem('authToken');
      const response = await client.get('/get_all_activity', {
        params: { token },
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  }, []);

  const addToUserHistory = useCallback(async (meetingCode) => {
    try {
      const token = localStorage.getItem('token') || localStorage.getItem('authToken');
      const response = await client.post('/add_to_activity', {
        token,
        meeting_code: meetingCode,
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  }, []);

  const value = useMemo(
    () => ({
      user,
      setUser,
      userData: user,
      setUserData: setUser,
      isAuthenticated,
      isLoading,
      login,
      handleLogin,
      register,
      handleRegister,
      logout,
      getHistoryOfUser,
      addToUserHistory,
    }),
    [
      user,
      isAuthenticated,
      isLoading,
      login,
      handleLogin,
      register,
      handleRegister,
      logout,
      getHistoryOfUser,
      addToUserHistory,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context || defaultAuthValue;
};

export default AuthContext;

