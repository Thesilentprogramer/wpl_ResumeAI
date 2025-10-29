import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadResume, downloadAnalysisReport } from '../api';
import { useTheme } from '../contexts/ThemeContext';

const Analysis = ({ data, onOpenChat, onAnalysisComplete }) => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const analysis = data?.data;
  const [showUpload, setShowUpload] = useState(false);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [downloading, setDownloading] = useState(false);

  const handleDownloadReport = async () => {
    if (!analysis) return;
    
    setDownloading(true);
    try {
      await downloadAnalysisReport(analysis);
    } catch (err) {
      console.error('Download error:', err);
      alert('Failed to download report. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files[0]) handleFile(e.target.files[0]);
  };

  const handleFile = (selectedFile) => {
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(selectedFile.type)) {
      setError('Only PDF and DOCX files are allowed');
      return;
    }
    if (selectedFile.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB');
      return;
    }
    setFile(selectedFile);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file');
      return;
    }

    setUploading(true);
    setError('');

    try {
      const response = await uploadResume(file);
      if (response.success) {
        if (onAnalysisComplete) {
          onAnalysisComplete(response);
        }
        setShowUpload(false);
        // Reload the page to show new analysis
        window.location.reload();
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  if (!analysis) {
  return (
    <div className={`min-h-screen transition-colors duration-300 relative overflow-hidden ${
      theme === 'dark' 
        ? 'bg-gradient-to-b from-[#0a0f2d] via-[#0a1338] to-[#0b1a4a]' 
        : 'bg-gradient-to-b from-white via-gray-50 to-gray-100'
    }`}>
      {/* Grid overlay + spotlight */}
      <div className={`pointer-events-none absolute inset-0 transition-opacity duration-300 ${
        theme === 'dark'
          ? '[background-image:linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] opacity-[0.08]'
          : '[background-image:linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.05)_1px,transparent_1px)] opacity-50'
      } bg-[length:40px_40px]`}></div>
      <div className={`pointer-events-none absolute inset-0 transition-opacity duration-300 ${
        theme === 'dark'
          ? 'bg-[radial-gradient(650px_circle_at_50%_0%,rgba(56,189,248,0.15),transparent_60%)]'
          : 'bg-[radial-gradient(650px_circle_at_50%_0%,rgba(59,130,246,0.08),transparent_60%)]'
      }`}></div>
        {/* Header */}
        <header className={`w-full px-6 sm:px-12 py-4 flex items-center justify-between border-b bg-transparent transition-colors duration-300 ${
          theme === 'dark' ? 'border-white/10' : 'border-gray-200'
        }`}>
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
              <span className="text-white text-xl font-bold">R</span>
            </div>
            <h1 className={`text-xl sm:text-2xl font-bold transition-colors duration-300 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              ResumeAI Analyzer
            </h1>
          </button>
          <div className="flex items-center gap-6">
            <button 
              onClick={() => navigate('/')}
              className={`transition-colors duration-300 ${
                theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setShowUpload(true)}
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg shadow-blue-500/30 flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">description</span>
              New Analysis
            </button>
          </div>
        </header>

        {/* Empty State Content */}
        <main className="flex items-center justify-center min-h-[80vh] px-6">
          <div className="text-center max-w-2xl">
            <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-blue-500/20 to-indigo-600/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-blue-400 text-5xl">
                description
              </span>
            </div>
            
            <h1 className={`text-4xl sm:text-5xl font-black mb-6 transition-colors duration-300 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              No Analysis Yet
            </h1>
            
            <p className={`text-lg mb-8 leading-relaxed transition-colors duration-300 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Upload your resume to get comprehensive AI-powered insights, ATS compatibility scores, and personalized recommendations to improve your resume.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setShowUpload(true)}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold hover:from-blue-600 hover:to-indigo-700 transition-all shadow-[0_10px_30px_-10px] shadow-blue-600/50 flex items-center justify-center gap-2 ring-1 ring-inset ring-white/10"
              >
                <span className="material-symbols-outlined">upload</span>
                Upload Resume
              </button>
              
              <button
                onClick={onOpenChat}
                className={`px-8 py-4 rounded-xl border font-bold backdrop-blur-sm transition-colors flex items-center justify-center gap-2 ${
                  theme === 'dark'
                    ? 'border-white/10 text-white hover:border-white/20 hover:bg-white/5'
                    : 'border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50'
                }`}
              >
                <span className="material-symbols-outlined">chat_bubble</span>
                Chat with AI
              </button>
            </div>

            {/* Features Preview */}
            <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className={`p-6 rounded-xl backdrop-blur-sm transition-all duration-300 ${
                theme === 'dark'
                  ? 'bg-white/5 border border-white/10'
                  : 'bg-white border border-gray-200 shadow-md'
              }`}>
                <span className="text-blue-400 text-3xl mb-4 inline-block">🎯</span>
                <h3 className={`font-bold mb-2 transition-colors duration-300 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>ATS Score</h3>
                <p className={`text-sm transition-colors duration-300 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>Get your ATS compatibility rating</p>
              </div>
              <div className={`p-6 rounded-xl backdrop-blur-sm transition-all duration-300 ${
                theme === 'dark'
                  ? 'bg-white/5 border border-white/10'
                  : 'bg-white border border-gray-200 shadow-md'
              }`}>
                <span className="text-blue-400 text-3xl mb-4 inline-block">📈</span>
                <h3 className={`font-bold mb-2 transition-colors duration-300 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>Improvements</h3>
                <p className={`text-sm transition-colors duration-300 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>Actionable recommendations</p>
              </div>
              <div className={`p-6 rounded-xl backdrop-blur-sm transition-all duration-300 ${
                theme === 'dark'
                  ? 'bg-white/5 border border-white/10'
                  : 'bg-white border border-gray-200 shadow-md'
              }`}>
                <span className="text-blue-400 text-3xl mb-4 inline-block">⚡</span>
                <h3 className={`font-bold mb-2 transition-colors duration-300 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>AI Insights</h3>
                <p className={`text-sm transition-colors duration-300 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>AI-powered analysis</p>
              </div>
            </div>
          </div>
        </main>

        {/* Upload Modal */}
        {showUpload && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className={`backdrop-blur-md rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto transition-all duration-300 ${
              theme === 'dark'
                ? 'bg-white/5 border border-white/10 shadow-[0_30px_60px_-15px] shadow-blue-600/20'
                : 'bg-white border border-gray-200 shadow-2xl'
            }`}>
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-2xl font-black transition-colors duration-300 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>Upload New Resume</h2>
                <button
                  onClick={() => {
                    setShowUpload(false);
                    setFile(null);
                    setError('');
                  }}
                  className={`transition-colors duration-300 ${
                    theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors duration-300 ${
                  theme === 'dark' ? 'border-white/20' : 'border-gray-300'
                }`}>
                  {file ? (
                    <div className="space-y-4">
                      <span className="material-symbols-outlined text-green-400 text-6xl">check_circle</span>
                      <p className={`font-bold text-lg transition-colors duration-300 ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>{file.name}</p>
                      <p className={`text-sm transition-colors duration-300 ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>{(file.size / 1024).toFixed(2)} KB</p>
                      <button
                        type="button"
                        onClick={() => setFile(null)}
                        className="text-blue-400 hover:text-blue-300 text-sm"
                      >
                        Choose different file
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <span className={`material-symbols-outlined text-6xl transition-colors duration-300 ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-400'
                      }`}>cloud_upload</span>
                      <p className={`font-bold text-lg transition-colors duration-300 ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>Drag & Drop Your Resume Here</p>
                      <p className={`text-sm transition-colors duration-300 ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>or browse your files</p>
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleFileInput}
                        accept=".pdf,.docx"
                        id="file-upload-modal-empty"
                      />
                      <label
                        htmlFor="file-upload-modal-empty"
                        className="inline-block px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold hover:from-purple-600 hover:to-blue-600 transition-all cursor-pointer"
                      >
                        Browse Files
                      </label>
                    </div>
                  )}
                </div>

                {error && (
                  <div className="p-3 bg-red-500/10 border border-red-500/30 rounded text-red-400 text-sm">
                    {error}
                  </div>
                )}

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowUpload(false);
                      setFile(null);
                      setError('');
                    }}
                    className="flex-1 px-6 py-3 rounded-lg border border-purple-500/30 text-white font-bold hover:bg-purple-500/10 transition-all"
                  >
                    Cancel
                  </button>
                  {file && (
                    <button
                      type="submit"
                      disabled={uploading}
                      className="flex-1 px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold hover:from-purple-600 hover:to-blue-600 transition-all shadow-lg shadow-purple-500/30 disabled:opacity-50"
                    >
                      {uploading ? 'Analyzing...' : 'Analyze Resume'}
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  const { summary, skills = [], atsScore = 85, missingKeywords = [], suggestions = [], strengths = [], weaknesses = [] } = analysis;

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreGrade = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    return 'Needs Improvement';
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 relative overflow-hidden ${
      theme === 'dark' 
        ? 'bg-gradient-to-b from-[#0a0f2d] via-[#0a1338] to-[#0b1a4a]' 
        : 'bg-gradient-to-b from-white via-gray-50 to-gray-100'
    }`}>
      {/* Grid overlay + spotlight */}
      <div className={`pointer-events-none absolute inset-0 transition-opacity duration-300 ${
        theme === 'dark'
          ? '[background-image:linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] opacity-[0.08]'
          : '[background-image:linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.05)_1px,transparent_1px)] opacity-50'
      } bg-[length:40px_40px]`}></div>
      <div className={`pointer-events-none absolute inset-0 transition-opacity duration-300 ${
        theme === 'dark'
          ? 'bg-[radial-gradient(650px_circle_at_50%_0%,rgba(56,189,248,0.15),transparent_60%)]'
          : 'bg-[radial-gradient(650px_circle_at_50%_0%,rgba(59,130,246,0.08),transparent_60%)]'
      }`}></div>
      {/* Header */}
      <header className={`w-full px-6 sm:px-12 py-4 flex items-center justify-between border-b bg-transparent transition-colors duration-300 ${
        theme === 'dark' ? 'border-white/10' : 'border-gray-200'
      }`}>
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
            <span className="text-white text-xl font-bold">R</span>
          </div>
          <h1 className={`text-xl sm:text-2xl font-bold transition-colors duration-300 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            ResumeAI Analyzer
          </h1>
        </button>
        <div className="flex items-center gap-6">
          <button 
            onClick={() => navigate('/')}
            className={`transition-colors duration-300 ${
              theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => setShowUpload(true)}
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg shadow-blue-500/30 flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">description</span>
            New Analysis
          </button>
        </div>
      </header>

      <main className="px-6 sm:px-12 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Title Section */}
          <div className="text-center mb-12">
            <h1 className={`text-4xl sm:text-5xl font-black mb-4 transition-colors duration-300 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Resume Analysis Results
            </h1>
            <p className={`text-lg max-w-2xl mx-auto transition-colors duration-300 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Comprehensive AI-powered analysis of your resume with actionable insights to improve your chances
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Results */}
            <div className="lg:col-span-2 space-y-6">
              {/* ATS Score Card */}
              <div className={`rounded-2xl p-8 backdrop-blur-sm transition-all duration-300 ${
                theme === 'dark'
                  ? 'bg-white/5 border border-white/10 shadow-[0_30px_60px_-15px] shadow-blue-600/20'
                  : 'bg-white border border-gray-200 shadow-xl'
              }`}>
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className={`text-2xl font-black mb-2 transition-colors duration-300 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>ATS Compatibility Score</h2>
                    <p className={`text-sm transition-colors duration-300 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>How well your resume performs against Applicant Tracking Systems</p>
                  </div>
                  <div className="text-right">
                    <div className={`text-6xl font-black ${getScoreColor(atsScore)}`}>{atsScore}%</div>
                    <div className={`text-sm transition-colors duration-300 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>{getScoreGrade(atsScore)}</div>
                  </div>
                </div>
                
                <div className={`relative w-full h-4 rounded-full overflow-hidden transition-colors duration-300 ${
                  theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'
                }`}>
                  <div 
                    className={`h-full ${
                      atsScore >= 80 ? 'bg-gradient-to-r from-green-500 to-green-400' : 
                      atsScore >= 60 ? 'bg-gradient-to-r from-yellow-500 to-yellow-400' : 
                      'bg-gradient-to-r from-red-500 to-red-400'
                    } transition-all duration-1000`}
                    style={{ width: `${atsScore}%` }}
                  />
                </div>
              </div>

              {/* Candidate Summary */}
              <div className={`rounded-2xl p-8 backdrop-blur-sm transition-all duration-300 ${
                theme === 'dark'
                  ? 'bg-white/5 border border-white/10 shadow-[0_30px_60px_-15px] shadow-blue-600/20'
                  : 'bg-white border border-gray-200 shadow-xl'
              }`}>
                <h2 className={`text-2xl font-black mb-4 transition-colors duration-300 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>Candidate Summary</h2>
                <p className={`leading-relaxed transition-colors duration-300 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>{summary || 'No summary available'}</p>
              </div>

              {/* Key Skills */}
              {skills.length > 0 && (
                <div className={`rounded-2xl p-8 backdrop-blur-sm transition-all duration-300 ${
                  theme === 'dark'
                    ? 'bg-white/5 border border-white/10 shadow-[0_30px_60px_-15px] shadow-blue-600/20'
                    : 'bg-white border border-gray-200 shadow-xl'
                }`}>
                  <h2 className={`text-2xl font-black mb-6 transition-colors duration-300 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>Identified Skills</h2>
                  <p className={`text-sm mb-4 transition-colors duration-300 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>Technologies and competencies found in your resume</p>
                  <div className="flex flex-wrap gap-3">
                    {skills.slice(0, 15).map((skill, idx) => (
                      <span 
                        key={idx} 
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                          theme === 'dark'
                            ? 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 text-purple-300'
                            : 'bg-gradient-to-r from-blue-100 to-indigo-100 border border-blue-200 text-blue-700'
                        }`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Missing Keywords */}
              {missingKeywords.length > 0 && (
                <div className={`rounded-2xl p-8 backdrop-blur-sm transition-all duration-300 ${
                  theme === 'dark'
                    ? 'bg-orange-900/20 border border-orange-500/30 shadow-xl'
                    : 'bg-orange-50 border border-orange-200 shadow-xl'
                }`}>
                  <h2 className={`text-2xl font-black mb-6 transition-colors duration-300 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>Missing Keywords</h2>
                  <p className={`text-sm mb-4 transition-colors duration-300 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>Important keywords that could improve your ATS compatibility</p>
                  <div className="flex flex-wrap gap-3">
                    {missingKeywords.map((keyword, idx) => (
                      <span 
                        key={idx} 
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                          theme === 'dark'
                            ? 'bg-orange-500/20 border border-orange-500/30 text-orange-300'
                            : 'bg-orange-100 border border-orange-300 text-orange-700'
                        }`}
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Suggestions */}
              {suggestions.length > 0 && (
                <div className={`rounded-2xl p-8 backdrop-blur-sm transition-all duration-300 ${
                  theme === 'dark'
                    ? 'bg-white/5 border border-white/10 shadow-[0_30px_60px_-15px] shadow-blue-600/20'
                    : 'bg-white border border-gray-200 shadow-xl'
                }`}>
                  <h2 className={`text-2xl font-black mb-6 transition-colors duration-300 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>Improvement Recommendations</h2>
                  <div className="space-y-4">
                    {suggestions.map((suggestion, idx) => (
                      <div key={idx} className={`flex items-start gap-4 p-4 rounded-xl transition-all duration-300 ${
                        theme === 'dark'
                          ? 'bg-white/5 border border-white/10'
                          : 'bg-gray-50 border border-gray-200'
                      }`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 transition-colors duration-300 ${
                          theme === 'dark' ? 'bg-purple-500/20' : 'bg-purple-100'
                        }`}>
                          <span className={`text-sm font-bold transition-colors duration-300 ${
                            theme === 'dark' ? 'text-purple-400' : 'text-purple-700'
                          }`}>{idx + 1}</span>
                        </div>
                        <p className={`transition-colors duration-300 ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>{suggestion}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Strengths */}
              {strengths.length > 0 && (
                <div className={`rounded-2xl p-8 backdrop-blur-sm transition-all duration-300 ${
                  theme === 'dark'
                    ? 'bg-green-900/20 border border-green-500/30 shadow-xl'
                    : 'bg-green-50 border border-green-200 shadow-xl'
                }`}>
                  <h2 className={`text-2xl font-black mb-6 flex items-center gap-3 transition-colors duration-300 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    <span className="material-symbols-outlined text-green-400">check_circle</span>
                    Key Strengths
                  </h2>
                  <div className="space-y-3">
                    {strengths.map((strength, idx) => (
                      <div key={idx} className={`flex items-center gap-3 transition-colors duration-300 ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        <span className="text-green-400">✓</span>
                        <p>{strength}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Weaknesses */}
              {weaknesses.length > 0 && (
                <div className={`rounded-2xl p-8 backdrop-blur-sm transition-all duration-300 ${
                  theme === 'dark'
                    ? 'bg-red-900/20 border border-red-500/30 shadow-xl'
                    : 'bg-red-50 border border-red-200 shadow-xl'
                }`}>
                  <h2 className={`text-2xl font-black mb-6 flex items-center gap-3 transition-colors duration-300 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    <span className="material-symbols-outlined text-red-400">warning</span>
                    Areas for Improvement
                  </h2>
                  <div className="space-y-3">
                    {weaknesses.map((weakness, idx) => (
                      <div key={idx} className={`flex items-center gap-3 transition-colors duration-300 ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        <span className="text-red-400">⚠</span>
                        <p>{weakness}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* What We Analyze Card */}
              <div className={`rounded-2xl p-6 backdrop-blur-sm transition-all duration-300 ${
                theme === 'dark'
                  ? 'bg-white/5 border border-white/10 shadow-[0_30px_60px_-15px] shadow-blue-600/20'
                  : 'bg-white border border-gray-200 shadow-xl'
              }`}>
                <h3 className={`text-xl font-black mb-6 transition-colors duration-300 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>What We Analyze</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                      theme === 'dark' ? 'bg-purple-500/20' : 'bg-purple-100'
                    }`}>
                      <span className={`text-xl transition-colors duration-300 ${
                        theme === 'dark' ? 'text-purple-400' : 'text-purple-600'
                      }`}>🎯</span>
                    </div>
                    <div>
                      <h4 className={`font-bold mb-1 transition-colors duration-300 ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>ATS Compatibility</h4>
                      <p className={`text-sm transition-colors duration-300 ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>Keyword optimization and formatting</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                      theme === 'dark' ? 'bg-purple-500/20' : 'bg-purple-100'
                    }`}>
                      <span className={`text-xl transition-colors duration-300 ${
                        theme === 'dark' ? 'text-purple-400' : 'text-purple-600'
                      }`}>📝</span>
                    </div>
                    <div>
                      <h4 className={`font-bold mb-1 transition-colors duration-300 ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>Content Quality</h4>
                      <p className={`text-sm transition-colors duration-300 ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>Impact and effectiveness</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                      theme === 'dark' ? 'bg-purple-500/20' : 'bg-purple-100'
                    }`}>
                      <span className={`text-xl transition-colors duration-300 ${
                        theme === 'dark' ? 'text-purple-400' : 'text-purple-600'
                      }`}>📄</span>
                    </div>
                    <div>
                      <h4 className={`font-bold mb-1 transition-colors duration-300 ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>Format & Structure</h4>
                      <p className={`text-sm transition-colors duration-300 ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>Organization and layout</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                      theme === 'dark' ? 'bg-purple-500/20' : 'bg-purple-100'
                    }`}>
                      <span className={`text-xl transition-colors duration-300 ${
                        theme === 'dark' ? 'text-purple-400' : 'text-purple-600'
                      }`}>📈</span>
                    </div>
                    <div>
                      <h4 className={`font-bold mb-1 transition-colors duration-300 ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>Best Practices</h4>
                      <p className={`text-sm transition-colors duration-300 ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>Industry standards</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI-Powered Analysis Card */}
              <div className={`rounded-2xl p-6 backdrop-blur-sm transition-all duration-300 ${
                theme === 'dark'
                  ? 'bg-white/5 border border-white/10 shadow-[0_30px_60px_-15px] shadow-blue-600/20'
                  : 'bg-white border border-gray-200 shadow-xl'
              }`}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="material-symbols-outlined text-blue-400 text-3xl">⚡</span>
                  <h3 className={`text-xl font-black transition-colors duration-300 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>AI-Powered Analysis</h3>
                </div>
                <p className={`text-sm leading-relaxed transition-colors duration-300 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Our advanced AI technology analyzes thousands of successful resumes to provide you with data-driven recommendations tailored to your industry.
                </p>
              </div>

              {/* Quick Actions */}
              <div className={`rounded-2xl p-6 backdrop-blur-sm transition-all duration-300 ${
                theme === 'dark'
                  ? 'bg-white/5 border border-white/10 shadow-[0_30px_60px_-15px] shadow-blue-600/20'
                  : 'bg-white border border-gray-200 shadow-xl'
              }`}>
                <h3 className={`text-xl font-black mb-4 transition-colors duration-300 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>Quick Actions</h3>
                <div className="space-y-3">
                  <button
                    onClick={onOpenChat}
                    className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold hover:from-blue-600 hover:to-indigo-700 transition-all flex items-center justify-center gap-2 ring-1 ring-inset ring-white/10 shadow-[0_10px_30px_-10px] shadow-blue-600/40"
                  >
                    <span className="material-symbols-outlined text-sm">chat_bubble</span>
                    Chat with AI
                  </button>
                  <button
                    onClick={() => setShowUpload(true)}
                    className={`w-full px-4 py-3 rounded-xl border font-bold transition-all flex items-center justify-center gap-2 ${
                      theme === 'dark'
                        ? 'border-white/10 text-white hover:bg-white/5'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm">refresh</span>
                    Analyze New Resume
                  </button>
                  <button 
                    onClick={handleDownloadReport}
                    disabled={downloading}
                    className={`w-full px-4 py-3 rounded-xl border font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50 ${
                      theme === 'dark'
                        ? 'border-white/10 text-white hover:bg-white/5'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm">download</span>
                    {downloading ? 'Downloading...' : 'Download Report'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Upload Modal */}
        {showUpload && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className={`backdrop-blur-md rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto transition-all duration-300 ${
              theme === 'dark'
                ? 'bg-white/5 border border-white/10 shadow-[0_30px_60px_-15px] shadow-blue-600/20'
                : 'bg-white border border-gray-200 shadow-2xl'
            }`}>
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-2xl font-black transition-colors duration-300 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>Upload New Resume</h2>
              <button
                onClick={() => {
                  setShowUpload(false);
                  setFile(null);
                  setError('');
                }}
                className="text-gray-400 hover:text-white"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors duration-300 ${
                  theme === 'dark' ? 'border-white/20' : 'border-gray-300'
                }`}>
                  {file ? (
                    <div className="space-y-4">
                      <span className="material-symbols-outlined text-green-400 text-6xl">check_circle</span>
                      <p className={`font-bold text-lg transition-colors duration-300 ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>{file.name}</p>
                      <p className={`text-sm transition-colors duration-300 ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>{(file.size / 1024).toFixed(2)} KB</p>
                      <button
                        type="button"
                        onClick={() => setFile(null)}
                        className="text-blue-400 hover:text-blue-300 text-sm"
                      >
                        Choose different file
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <span className={`material-symbols-outlined text-6xl transition-colors duration-300 ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-400'
                      }`}>cloud_upload</span>
                      <p className={`font-bold text-lg transition-colors duration-300 ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>Drag & Drop Your Resume Here</p>
                      <p className={`text-sm transition-colors duration-300 ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>or browse your files</p>
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleFileInput}
                      accept=".pdf,.docx"
                      id="file-upload-modal"
                    />
                    <label
                      htmlFor="file-upload-modal"
                      className="inline-block px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold hover:from-blue-600 hover:to-indigo-700 transition-all cursor-pointer ring-1 ring-inset ring-white/10"
                    >
                      Browse Files
                    </label>
                  </div>
                )}
              </div>

                {error && (
                  <div className={`p-3 border rounded text-sm transition-colors duration-300 ${
                    theme === 'dark'
                      ? 'bg-red-500/10 border-red-500/30 text-red-400'
                      : 'bg-red-50 border-red-200 text-red-600'
                  }`}>
                    {error}
                  </div>
                )}

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowUpload(false);
                      setFile(null);
                      setError('');
                    }}
                    className={`flex-1 px-6 py-3 rounded-xl border font-bold transition-all ${
                      theme === 'dark'
                        ? 'border-white/10 text-white hover:bg-white/5'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Cancel
                  </button>
                {file && (
                  <button
                    type="submit"
                    disabled={uploading}
                    className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold hover:from-blue-600 hover:to-indigo-700 transition-all shadow-[0_10px_30px_-10px] shadow-blue-600/50 disabled:opacity-50"
                  >
                    {uploading ? 'Analyzing...' : 'Analyze Resume'}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Analysis;
