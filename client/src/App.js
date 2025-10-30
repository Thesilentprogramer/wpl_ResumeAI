import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import Home from './pages/Home';
import Analysis from './pages/Analysis';
import ResumeBuilder from './pages/ResumeBuilder';
import ChatModal from './components/ChatModal';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import OAuthCallback from './pages/OAuthCallback';

function App() {
  const [chatOpen, setChatOpen] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);

  return (
    <ThemeProvider>
      <AuthProvider>
      <Router>
        <div className="bg-background-light dark:bg-background-dark font-display text-text-light dark:text-text-dark min-h-screen">
          <Routes>
            <Route 
              path="/" 
              element={<Home onOpenChat={() => setChatOpen(true)} onAnalysisComplete={setAnalysisData} />} 
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/auth-callback" element={<OAuthCallback />} />
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route 
              path="/analysis" 
              element={
                <PrivateRoute>
                  <Analysis 
                    data={analysisData}
                    onOpenChat={() => setChatOpen(true)}
                  />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/builder" 
              element={<PrivateRoute><ResumeBuilder /></PrivateRoute>} 
            />
          </Routes>

          <ChatModal 
            isOpen={chatOpen}
            onClose={() => setChatOpen(false)}
            resumeText={analysisData?.resumeText || ''}
          />
        </div>
      </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

