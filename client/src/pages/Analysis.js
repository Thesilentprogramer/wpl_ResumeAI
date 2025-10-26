import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadResume } from '../api';

const Analysis = ({ data, onOpenChat, onAnalysisComplete }) => {
  const navigate = useNavigate();
  const analysis = data?.data;
  const [showUpload, setShowUpload] = useState(false);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

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
      <div className="min-h-screen bg-gradient-to-br from-blue-950 via-purple-900 to-blue-950">
        {/* Header */}
        <header className="w-full px-6 sm:px-12 py-4 flex items-center justify-between border-b border-gray-800">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-xl">⚡</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              ResumeAI Analyzer
            </h1>
          </button>
          <div className="flex items-center gap-6">
            <button 
              onClick={() => navigate('/')}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => setShowUpload(true)}
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium hover:from-purple-600 hover:to-blue-600 transition-all shadow-lg shadow-purple-500/30 flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">description</span>
              New Analysis
            </button>
          </div>
        </header>

        {/* Empty State Content */}
        <main className="flex items-center justify-center min-h-[80vh] px-6">
          <div className="text-center max-w-2xl">
            <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-purple-400 text-5xl">
                description
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-6">
              No Analysis Yet
            </h1>
            
            <p className="text-lg text-gray-400 mb-8 leading-relaxed">
              Upload your resume to get comprehensive AI-powered insights, ATS compatibility scores, and personalized recommendations to improve your resume.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setShowUpload(true)}
                className="px-8 py-4 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold hover:from-purple-600 hover:to-blue-600 transition-all shadow-lg shadow-purple-500/30 flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined">upload</span>
                Upload Resume
              </button>
              
              <button
                onClick={onOpenChat}
                className="px-8 py-4 rounded-lg border-2 border-purple-500/30 text-white font-bold hover:bg-purple-500/10 transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined">chat_bubble</span>
                Chat with AI
              </button>
            </div>

            {/* Features Preview */}
            <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-6 rounded-xl bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-purple-500/20">
                <span className="material-symbols-outlined text-purple-400 text-3xl mb-4 inline-block">🎯</span>
                <h3 className="text-white font-bold mb-2">ATS Score</h3>
                <p className="text-gray-400 text-sm">Get your ATS compatibility rating</p>
              </div>
              <div className="p-6 rounded-xl bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-purple-500/20">
                <span className="material-symbols-outlined text-purple-400 text-3xl mb-4 inline-block">📈</span>
                <h3 className="text-white font-bold mb-2">Improvements</h3>
                <p className="text-gray-400 text-sm">Actionable recommendations</p>
              </div>
              <div className="p-6 rounded-xl bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-purple-500/20">
                <span className="material-symbols-outlined text-purple-400 text-3xl mb-4 inline-block">⚡</span>
                <h3 className="text-white font-bold mb-2">AI Insights</h3>
                <p className="text-gray-400 text-sm">AI-powered analysis</p>
              </div>
            </div>
          </div>
        </main>

        {/* Upload Modal */}
        {showUpload && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-purple-500/30 p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black text-white">Upload New Resume</h2>
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
                <div className="border-2 border-dashed border-purple-500/30 rounded-xl p-8 text-center">
                  {file ? (
                    <div className="space-y-4">
                      <span className="material-symbols-outlined text-green-400 text-6xl">check_circle</span>
                      <p className="text-white font-bold text-lg">{file.name}</p>
                      <p className="text-gray-400 text-sm">{(file.size / 1024).toFixed(2)} KB</p>
                      <button
                        type="button"
                        onClick={() => setFile(null)}
                        className="text-purple-400 hover:text-purple-300 text-sm"
                      >
                        Choose different file
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <span className="material-symbols-outlined text-gray-400 text-6xl">cloud_upload</span>
                      <p className="text-white font-bold text-lg">Drag & Drop Your Resume Here</p>
                      <p className="text-gray-400 text-sm">or browse your files</p>
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
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-purple-900 to-blue-950">
      {/* Header */}
      <header className="w-full px-6 sm:px-12 py-4 flex items-center justify-between border-b border-gray-800">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-xl">⚡</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
            ResumeAI Analyzer
          </h1>
        </button>
        <div className="flex items-center gap-6">
          <button 
            onClick={() => navigate('/')}
            className="text-gray-300 hover:text-white transition-colors"
          >
            Home
          </button>
          <button
            onClick={() => setShowUpload(true)}
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium hover:from-purple-600 hover:to-blue-600 transition-all shadow-lg shadow-purple-500/30 flex items-center gap-2"
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
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
              Resume Analysis Results
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Comprehensive AI-powered analysis of your resume with actionable insights to improve your chances
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Results */}
            <div className="lg:col-span-2 space-y-6">
              {/* ATS Score Card */}
              <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/50 border border-purple-500/30 rounded-2xl p-8 shadow-xl">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-black text-white mb-2">ATS Compatibility Score</h2>
                    <p className="text-gray-400 text-sm">How well your resume performs against Applicant Tracking Systems</p>
                  </div>
                  <div className="text-right">
                    <div className={`text-6xl font-black ${getScoreColor(atsScore)}`}>{atsScore}%</div>
                    <div className="text-sm text-gray-400">{getScoreGrade(atsScore)}</div>
                  </div>
                </div>
                
                <div className="relative w-full h-4 bg-gray-800 rounded-full overflow-hidden">
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
              <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/50 border border-purple-500/30 rounded-2xl p-8 shadow-xl">
                <h2 className="text-2xl font-black text-white mb-4">Candidate Summary</h2>
                <p className="text-gray-300 leading-relaxed">{summary || 'No summary available'}</p>
              </div>

              {/* Key Skills */}
              {skills.length > 0 && (
                <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/50 border border-purple-500/30 rounded-2xl p-8 shadow-xl">
                  <h2 className="text-2xl font-black text-white mb-6">Identified Skills</h2>
                  <p className="text-gray-400 text-sm mb-4">Technologies and competencies found in your resume</p>
                  <div className="flex flex-wrap gap-3">
                    {skills.slice(0, 15).map((skill, idx) => (
                      <span 
                        key={idx} 
                        className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 text-purple-300 text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Missing Keywords */}
              {missingKeywords.length > 0 && (
                <div className="bg-gradient-to-br from-orange-900/20 to-red-900/20 border border-orange-500/30 rounded-2xl p-8 shadow-xl">
                  <h2 className="text-2xl font-black text-white mb-6">Missing Keywords</h2>
                  <p className="text-gray-400 text-sm mb-4">Important keywords that could improve your ATS compatibility</p>
                  <div className="flex flex-wrap gap-3">
                    {missingKeywords.map((keyword, idx) => (
                      <span 
                        key={idx} 
                        className="px-4 py-2 rounded-lg bg-orange-500/20 border border-orange-500/30 text-orange-300 text-sm font-medium"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Suggestions */}
              {suggestions.length > 0 && (
                <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/50 border border-purple-500/30 rounded-2xl p-8 shadow-xl">
                  <h2 className="text-2xl font-black text-white mb-6">Improvement Recommendations</h2>
                  <div className="space-y-4">
                    {suggestions.map((suggestion, idx) => (
                      <div key={idx} className="flex items-start gap-4 p-4 bg-slate-800/50 rounded-xl">
                        <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-purple-400 text-sm font-bold">{idx + 1}</span>
                        </div>
                        <p className="text-gray-300">{suggestion}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Strengths */}
              {strengths.length > 0 && (
                <div className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border border-green-500/30 rounded-2xl p-8 shadow-xl">
                  <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-3">
                    <span className="material-symbols-outlined text-green-400">check_circle</span>
                    Key Strengths
                  </h2>
                  <div className="space-y-3">
                    {strengths.map((strength, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-gray-300">
                        <span className="text-green-400">✓</span>
                        <p>{strength}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Weaknesses */}
              {weaknesses.length > 0 && (
                <div className="bg-gradient-to-br from-red-900/20 to-orange-900/20 border border-red-500/30 rounded-2xl p-8 shadow-xl">
                  <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-3">
                    <span className="material-symbols-outlined text-red-400">warning</span>
                    Areas for Improvement
                  </h2>
                  <div className="space-y-3">
                    {weaknesses.map((weakness, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-gray-300">
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
              <div className="bg-gradient-to-br from-purple-900/30 to-slate-900/50 border border-purple-500/30 rounded-2xl p-6 shadow-xl">
                <h3 className="text-xl font-black text-white mb-6">What We Analyze</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-purple-400 text-xl">🎯</span>
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-1">ATS Compatibility</h4>
                      <p className="text-gray-400 text-sm">Keyword optimization and formatting</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-purple-400 text-xl">📝</span>
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-1">Content Quality</h4>
                      <p className="text-gray-400 text-sm">Impact and effectiveness</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-purple-400 text-xl">📄</span>
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-1">Format & Structure</h4>
                      <p className="text-gray-400 text-sm">Organization and layout</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-purple-400 text-xl">📈</span>
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-1">Best Practices</h4>
                      <p className="text-gray-400 text-sm">Industry standards</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI-Powered Analysis Card */}
              <div className="bg-gradient-to-br from-blue-900/30 to-slate-900/50 border border-blue-500/30 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center gap-3 mb-4">
                  <span className="material-symbols-outlined text-blue-400 text-3xl">⚡</span>
                  <h3 className="text-xl font-black text-white">AI-Powered Analysis</h3>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Our advanced AI technology analyzes thousands of successful resumes to provide you with data-driven recommendations tailored to your industry.
                </p>
              </div>

              {/* Quick Actions */}
              <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/50 border border-purple-500/30 rounded-2xl p-6 shadow-xl">
                <h3 className="text-xl font-black text-white mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button
                    onClick={onOpenChat}
                    className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold hover:from-purple-600 hover:to-blue-600 transition-all flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-sm">chat_bubble</span>
                    Chat with AI
                  </button>
                  <button
                    onClick={() => setShowUpload(true)}
                    className="w-full px-4 py-3 rounded-lg border border-purple-500/30 text-white font-bold hover:bg-purple-500/10 transition-all flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-sm">refresh</span>
                    Analyze New Resume
                  </button>
                  <button className="w-full px-4 py-3 rounded-lg border border-purple-500/30 text-white font-bold hover:bg-purple-500/10 transition-all flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-sm">download</span>
                    Download Report
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
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-purple-500/30 p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black text-white">Upload New Resume</h2>
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
              <div className="border-2 border-dashed border-purple-500/30 rounded-xl p-8 text-center">
                {file ? (
                  <div className="space-y-4">
                    <span className="material-symbols-outlined text-green-400 text-6xl">check_circle</span>
                    <p className="text-white font-bold text-lg">{file.name}</p>
                    <p className="text-gray-400 text-sm">{(file.size / 1024).toFixed(2)} KB</p>
                    <button
                      type="button"
                      onClick={() => setFile(null)}
                      className="text-purple-400 hover:text-purple-300 text-sm"
                    >
                      Choose different file
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <span className="material-symbols-outlined text-gray-400 text-6xl">cloud_upload</span>
                    <p className="text-white font-bold text-lg">Drag & Drop Your Resume Here</p>
                    <p className="text-gray-400 text-sm">or browse your files</p>
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleFileInput}
                      accept=".pdf,.docx"
                      id="file-upload-modal"
                    />
                    <label
                      htmlFor="file-upload-modal"
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
};

export default Analysis;
