import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach Authorization header if token is present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const signup = async (payload) => {
  const res = await api.post('/auth/signup', payload);
  return res.data;
};

export const login = async (payload) => {
  const res = await api.post('/auth/login', payload);
  return res.data;
};

export const fetchMe = async () => {
  const res = await api.get('/auth/me');
  return res.data;
};

export const uploadResume = async (file) => {
  const formData = new FormData();
  formData.append('resume', file);

  const response = await api.post('/resume/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const sendChatMessage = async (message, resumeText) => {
  const response = await api.post('/chat', {
    message,
    resumeText,
  });

  return response.data;
};

export const downloadAnalysisReport = async (analysisData) => {
  try {
    const response = await api.post('/export/analysis', analysisData, {
      responseType: 'blob',
    });
    
    // Create a blob and download it
    const blob = new Blob([response.data], { type: 'text/html' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `resume_analysis_report_${Date.now()}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    return true;
  } catch (error) {
    console.error('Download failed:', error);
    throw error;
  }
};

export const saveResume = async (resumeData) => {
  try {
    const response = await api.post('/resume/save', resumeData);
    return response.data;
  } catch (error) {
    console.error('Failed to save resume:', error);
    throw error;
  }
};

export const listMyResumes = async () => {
  const res = await api.get('/resume/list/my');
  return res.data;
};

export default api;

