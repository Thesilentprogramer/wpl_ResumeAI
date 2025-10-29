import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Home from './pages/Home';
import Analysis from './pages/Analysis';
import ResumeBuilder from './pages/ResumeBuilder';
import ChatModal from './components/ChatModal';

function App() {
  const [chatOpen, setChatOpen] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);

  return (
    <ThemeProvider>
      <Router>
        <div className="bg-background-light dark:bg-background-dark font-display text-text-light dark:text-text-dark min-h-screen">
          <Routes>
            <Route 
              path="/" 
              element={<Home onOpenChat={() => setChatOpen(true)} onAnalysisComplete={setAnalysisData} />} 
            />
            <Route 
              path="/analysis" 
              element={
                <Analysis 
                  data={analysisData}
                  onOpenChat={() => setChatOpen(true)}
                />
              } 
            />
            <Route 
              path="/builder" 
              element={<ResumeBuilder />} 
            />
          </Routes>

          <ChatModal 
            isOpen={chatOpen}
            onClose={() => setChatOpen(false)}
            resumeText={analysisData?.resumeText || ''}
          />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;

