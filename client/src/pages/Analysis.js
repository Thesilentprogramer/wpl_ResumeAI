import React from 'react';
import { useNavigate } from 'react-router-dom';

const Analysis = ({ data, onOpenChat }) => {
  const navigate = useNavigate();
  const analysis = data?.data;

  if (!analysis) {
    return (
      <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center">
        <div className="text-center">
          <p className="text-text-light dark:text-text-dark mb-4">No analysis data available</p>
          <button
            onClick={() => navigate('/')}
            className="bg-primary dark:bg-primary-dark text-white px-6 py-2 rounded-lg"
          >
            Upload Resume
          </button>
        </div>
      </div>
    );
  }

  const { summary, skills = [], atsScore = 85, missingKeywords = [], suggestions = [], strengths = [], weaknesses = [] } = analysis;

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-background-light dark:bg-background-dark">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm border-b border-secondary-background-light dark:border-secondary-background-dark">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <div className="text-primary">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 48 48">
                  <path clipRule="evenodd" d="M47.2426 24L24 47.2426L0.757355 24L24 0.757355L47.2426 24ZM12.2426 21H35.7574L24 9.24264L12.2426 21Z" fill="currentColor" fillRule="evenodd"/>
                </svg>
              </div>
              <h2 className="text-lg font-bold leading-tight text-text-light dark:text-text-dark">Resume Analyzer</h2>
            </div>
            <div className="flex items-center gap-4">
              <nav className="hidden md:flex items-center gap-6">
                <button className="text-sm font-medium hover:text-primary transition-colors text-text-light dark:text-text-dark">Dashboard</button>
                <button onClick={() => navigate('/')} className="text-sm font-medium hover:text-primary transition-colors text-text-light dark:text-text-dark">Upload</button>
                <button onClick={onOpenChat} className="text-sm font-medium hover:text-primary transition-colors text-text-light dark:text-text-dark">Chat</button>
              </nav>
              <button className="flex items-center justify-center rounded-full h-10 w-10 bg-secondary-background-light dark:bg-secondary-background-dark text-text-light dark:text-text-dark">
                <span className="material-symbols-outlined text-lg">person</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
            <div className="flex flex-col gap-2">
              <p className="text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em] text-text-light dark:text-text-dark">
                Resume Analysis Report
              </p>
              <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal">
                Here's a detailed breakdown of your resume's performance.
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={onOpenChat}
                className="flex items-center justify-center rounded-lg h-10 bg-primary text-white gap-2 text-sm font-bold px-4"
              >
                <span className="material-symbols-outlined text-base">chat_bubble</span>
                Chat with AI
              </button>
              <button className="flex items-center justify-center rounded-lg h-10 bg-secondary-background-light dark:bg-secondary-background-dark text-text-light dark:text-text-dark gap-2 text-sm font-bold px-4">
                <span className="material-symbols-outlined text-base">download</span>
                Download Report
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* ATS Score */}
            <div className="lg:col-span-1 flex flex-col gap-8">
              <div className="bg-secondary-background-light dark:bg-secondary-background-dark p-6 rounded-xl shadow-sm">
                <h3 className="text-lg font-bold mb-4 text-text-light dark:text-text-dark">Your ATS Score</h3>
                <div className="relative flex items-center justify-center w-48 h-48 mx-auto">
                  <svg className="w-full h-full" viewBox="0 0 36 36">
                    <path className="text-background-light dark:text-background-dark" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeWidth="3"/>
                    <path className="text-green-600" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeDasharray={`${atsScore}, 100`} strokeLinecap="round" strokeWidth="3"/>
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center">
                    <span className={`text-4xl font-black ${getScoreColor(atsScore)}`}>{atsScore}%</span>
                    <span className="text-sm text-slate-500 dark:text-slate-400">Excellent</span>
                  </div>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-normal mt-4 text-center">
                  This score represents how well your resume is optimized for Applicant Tracking Systems.
                </p>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 flex flex-col gap-8">
              {/* Candidate Summary */}
              <div className="bg-secondary-background-light dark:bg-secondary-background-dark rounded-xl shadow-sm overflow-hidden">
                <div className="p-6">
                  <p className="text-lg font-bold leading-tight tracking-[-0.015em] text-text-light dark:text-text-dark mb-2">Candidate Summary</p>
                  <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal">{summary || 'No summary available'}</p>
                </div>
              </div>

              {/* Key Skills */}
              {skills.length > 0 && (
                <div className="bg-secondary-background-light dark:bg-secondary-background-dark rounded-xl shadow-sm overflow-hidden">
                  <div className="p-6">
                    <p className="text-lg font-bold leading-tight tracking-[-0.015em] text-text-light dark:text-text-dark mb-2">Key Skills</p>
                    <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal mb-4">A list of the most relevant skills identified in your resume, categorized by type.</p>
                    <div className="flex flex-wrap gap-2">
                      {skills.slice(0, 10).map((skill, idx) => (
                        <span key={idx} className="bg-primary/20 text-primary dark:bg-primary-dark/30 dark:text-primary-dark text-sm font-medium px-2.5 py-1 rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Missing Keywords */}
              {missingKeywords.length > 0 && (
                <div className="bg-secondary-background-light dark:bg-secondary-background-dark rounded-xl shadow-sm overflow-hidden">
                  <div className="p-6">
                    <p className="text-lg font-bold leading-tight tracking-[-0.015em] text-text-light dark:text-text-dark mb-2">Missing Keywords</p>
                    <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal mb-4">Important keywords missing from your resume that could improve visibility.</p>
                    <div className="flex flex-wrap gap-2">
                      {missingKeywords.map((keyword, idx) => (
                        <span key={idx} className="bg-orange-200 text-orange-800 dark:bg-orange-300/30 dark:text-orange-400 text-sm font-medium px-2.5 py-1 rounded-full">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Suggestions */}
              {suggestions.length > 0 && (
                <div className="bg-secondary-background-light dark:bg-secondary-background-dark rounded-xl shadow-sm overflow-hidden">
                  <div className="p-6">
                    <p className="text-lg font-bold leading-tight tracking-[-0.015em] text-text-light dark:text-text-dark mb-2">Suggestions for Improvement</p>
                    <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal mb-4">Actionable recommendations for enhancing your resume.</p>
                    <ul className="space-y-3 list-disc list-inside text-slate-600 dark:text-slate-300">
                      {suggestions.map((suggestion, idx) => (
                        <li key={idx} className="marker:text-highlight-light dark:marker:text-highlight-dark">
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Analysis;

