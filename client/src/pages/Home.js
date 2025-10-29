import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadResume } from '../api';
import { useTheme } from '../contexts/ThemeContext';

const Home = ({ onOpenChat, onAnalysisComplete }) => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const selectedFile = e.dataTransfer.files[0];
    if (selectedFile) handleFile(selectedFile);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
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
        onAnalysisComplete(response);
        navigate('/analysis');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 relative overflow-hidden ${
      theme === 'dark' 
        ? 'bg-gradient-to-b from-[#0a0f2d] via-[#0a1338] to-[#0b1a4a]' 
        : 'bg-gradient-to-b from-white via-gray-50 to-gray-100'
    }`}>
      {/* Grid overlay + spotlight for AuthKit vibe */}
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
      {/* Decorative gradient glows */}
      {theme === 'dark' && (
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[32rem] w-[32rem] rounded-full bg-gradient-to-b from-cyan-400/20 via-blue-500/10 to-transparent blur-3xl"></div>
      )}
      {/* Header */}
      <header className={`w-full px-6 sm:px-12 py-4 flex items-center justify-between bg-transparent border-b transition-colors duration-300 ${
        theme === 'dark' ? 'border-white/10' : 'border-gray-200'
      }`}>
        <button 
          onClick={() => navigate('/analysis')}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
            <span className="text-white text-xl font-bold">R</span>
          </div>
          <h1 className={`text-xl sm:text-2xl font-bold transition-colors duration-300 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            ResumeAI
          </h1>
        </button>
        <div className="flex items-center gap-6">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={`transition-colors duration-300 ${
              theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Home
          </button>
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition-colors duration-300 ${
              theme === 'dark' 
                ? 'bg-gray-800 hover:bg-gray-700' 
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <span className="material-symbols-outlined text-yellow-400">light_mode</span>
            ) : (
              <span className="material-symbols-outlined text-gray-700">dark_mode</span>
            )}
          </button>
          <button
            onClick={() => navigate('/builder')}
            className={`px-6 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
              theme === 'dark'
                ? 'border border-white/10 text-white hover:bg-white/5'
                : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <span className="material-symbols-outlined text-sm">edit</span>
            Build Resume
          </button>
          <button
            onClick={() => navigate('/analysis')}
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg shadow-blue-500/30 flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">description</span>
            Analyze Resume
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 sm:px-12 py-20 bg-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block mb-6">
              <span className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                theme === 'dark'
                  ? 'bg-blue-500/20 border border-blue-500/30 text-blue-400'
                  : 'bg-blue-100 border border-blue-200 text-blue-700'
              }`}>
                AI-Powered Resume Builder
              </span>
            </div>
            <h1 className={`text-5xl sm:text-6xl lg:text-7xl font-black mb-6 leading-tight transition-colors duration-300 ${
              theme === 'dark'
                ? 'text-white drop-shadow-[0_0_30px_rgba(56,189,248,0.25)]'
                : 'text-gray-900'
            }`}>
              Create a Resume That
              <br />
              <span className={`text-transparent bg-clip-text bg-gradient-to-r transition-all duration-300 ${
                theme === 'dark'
                  ? 'from-cyan-300 via-blue-400 to-indigo-500 drop-shadow-[0_0_30px_rgba(56,189,248,0.35)]'
                  : 'from-blue-600 via-blue-700 to-indigo-800'
              }`}>
                Gets You Hired
              </span>
            </h1>
            <p className={`text-xl max-w-2xl mx-auto mb-8 transition-colors duration-300 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Build a professional resume in minutes with our AI-powered builder. Get past ATS systems and land more interviews.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center mb-12">
              <button
                onClick={() => navigate('/builder')}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold hover:from-blue-600 hover:to-indigo-700 transition-all shadow-[0_10px_30px_-10px] shadow-blue-600/50 flex items-center gap-2 ring-1 ring-inset ring-white/10"
              >
                <span>Build Resume</span>
                <span className="material-symbols-outlined">edit</span>
              </button>
              <button
                onClick={() => document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' })}
                className={`px-8 py-4 rounded-xl border font-bold backdrop-blur-sm transition-colors duration-300 ${
                  theme === 'dark'
                    ? 'border-white/10 text-white hover:border-white/20 hover:bg-white/5'
                    : 'border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50'
                }`}
              >
                Analyze Resume
              </button>
            </div>

            {/* Feature Badges */}
            <div className="flex flex-wrap gap-6 justify-center">
              <div className={`flex items-center gap-2 transition-colors duration-300 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                <span className="material-symbols-outlined text-lg text-green-400">check_circle</span>
                <span className="text-sm font-medium">No credit card required</span>
              </div>
              <div className={`flex items-center gap-2 transition-colors duration-300 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                <span className="material-symbols-outlined text-lg text-green-400">check_circle</span>
                <span className="text-sm font-medium">Free templates</span>
              </div>
              <div className={`flex items-center gap-2 transition-colors duration-300 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                <span className="material-symbols-outlined text-lg text-green-400">check_circle</span>
                <span className="text-sm font-medium">Instant download</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-6 sm:px-12 py-12 bg-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            <div className="text-center">
              <div className={`text-4xl font-black mb-2 transition-colors duration-300 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>500K+</div>
              <div className={`text-sm transition-colors duration-300 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>Resumes Created</div>
            </div>
            <div className="text-center">
              <div className={`text-4xl font-black mb-2 transition-colors duration-300 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>95%</div>
              <div className={`text-sm transition-colors duration-300 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>ATS Success Rate</div>
            </div>
            <div className="text-center">
              <div className={`text-4xl font-black mb-2 transition-colors duration-300 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>4.9/5</div>
              <div className={`text-sm transition-colors duration-300 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>User Rating</div>
            </div>
            <div className="text-center">
              <div className={`text-4xl font-black mb-2 transition-colors duration-300 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>24/7</div>
              <div className={`text-sm transition-colors duration-300 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 sm:px-12 py-20 bg-transparent" id="features">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-4xl sm:text-5xl font-black mb-4 transition-colors duration-300 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Why Choose <span className="text-blue-500">ResumeAI</span>?
            </h2>
            <p className={`text-lg max-w-2xl mx-auto transition-colors duration-300 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Everything you need to create a winning resume that stands out to recruiters
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {  
                title: 'ATS-Optimized', 
                desc: 'Every resume is optimized to pass Applicant Tracking Systems. Our AI analyzes keywords and formatting to maximize your chances.' 
              },
              { 
                title: 'Professional Templates', 
                desc: 'Choose from dozens of professionally designed templates. All templates are ATS-friendly and recruiter-approved.' 
              },
              { 
                title: 'Quick & Easy', 
                desc: 'Create a complete resume in minutes. Our intuitive builder makes it simple for anyone to create a professional resume.' 
              },
              { 
                title: '100% Secure', 
                desc: 'Your data is encrypted and secure. We never share your information with third parties. Build with confidence.' 
              },
              { 
                title: 'Real-Time Feedback', 
                desc: 'Get instant suggestions as you type. Our AI helps you improve your resume content in real-time.' 
              },
              { 
                title: 'Industry-Tested', 
                desc: 'Used by professionals across all industries. Our templates and formats are proven to get results.' 
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className={`p-8 rounded-xl transition-all duration-300 backdrop-blur-sm ${
                  theme === 'dark'
                    ? 'bg-white/5 border border-white/10 hover:border-blue-500/40 hover:bg-white/10'
                    : 'bg-white border border-gray-200 hover:border-blue-400 hover:shadow-lg shadow-gray-200'
                }`}
              >

                <h3 className={`text-2xl font-bold mb-4 transition-colors duration-300 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>{feature.title}</h3>
                <p className={`leading-relaxed transition-colors duration-300 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-6 sm:px-12 py-20 bg-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-4xl sm:text-5xl font-black mb-4 transition-colors duration-300 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              How It Works
            </h2>
            <p className={`text-lg max-w-2xl mx-auto transition-colors duration-300 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Get started in three simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                num: '01', 
                title: 'Upload or Build', 
                desc: 'Upload your existing resume or start from scratch with our AI-powered builder. Add your experience, skills, and education.' 
              },
              { 
                num: '02', 
                title: 'AI Analysis & Optimization', 
                desc: 'Our AI analyzes your resume and provides real-time feedback. Get suggestions for keywords, formatting, and content improvements.' 
              },
              { 
                num: '03', 
                title: 'Download & Apply', 
                desc: 'Export your resume as PDF or Word document. Download and start applying to jobs with confidence.' 
              },
            ].map((step, idx) => (
              <div
                key={idx}
                className={`p-8 rounded-xl transition-all backdrop-blur-sm ${
                  theme === 'dark'
                    ? 'bg-white/5 border border-white/10 hover:border-blue-500/40 hover:bg-white/10'
                    : 'bg-white border border-gray-200 hover:border-blue-400 hover:shadow-lg shadow-gray-200'
                }`}
              >
                <div className={`text-7xl font-black mb-6 transition-colors duration-300 ${
                  theme === 'dark' ? 'text-blue-500/20' : 'text-blue-200'
                }`}>{step.num}</div>
                <h3 className={`text-2xl font-bold mb-4 transition-colors duration-300 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>{step.title}</h3>
                <p className={`leading-relaxed transition-colors duration-300 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upload Section */}
      <section id="upload-section" className="px-6 sm:px-12 py-20 bg-transparent">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className={`text-4xl sm:text-5xl font-black mb-4 transition-colors duration-300 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Ready to Build Your Resume?
            </h2>
            <p className={`text-lg max-w-2xl mx-auto transition-colors duration-300 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Upload your existing resume for AI analysis or start fresh with our builder
            </p>
          </div>

          <div className={`p-8 sm:p-12 rounded-2xl backdrop-blur-md transition-all duration-300 ${
            theme === 'dark'
              ? 'bg-white/5 border border-white/10 shadow-[0_30px_60px_-15px] shadow-blue-600/20'
              : 'bg-white border border-gray-200 shadow-xl'
          }`}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div
                className={`border-2 border-dashed rounded-xl p-12 transition-all ${
                  isDragging 
                    ? 'border-blue-500 bg-blue-500/10' 
                    : theme === 'dark' 
                      ? 'border-white/10' 
                      : 'border-gray-300'
                } ${error ? 'border-red-500' : ''}`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
              >
                {file ? (
                  <div className="space-y-4 text-center">
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
                      className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                    >
                      Choose different file
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4 text-center">
                    <span className={`material-symbols-outlined text-6xl transition-colors duration-300 ${
                      theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                    }`}>cloud_upload</span>
                    <p className={`font-bold text-lg transition-colors duration-300 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      Drag & Drop Your Resume Here
                    </p>
                    <p className={`text-sm transition-colors duration-300 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>or browse your files</p>
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleFileInput}
                      accept=".pdf,.docx"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="inline-block px-8 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold hover:from-blue-600 hover:to-indigo-700 transition-all cursor-pointer ring-1 ring-inset ring-white/10"
                    >
                      Browse Files
                    </label>
                  </div>
                )}
                <input type="file" className="hidden" onChange={handleFileInput} accept=".pdf,.docx" id="file-upload-hidden" />
              </div>

              {error && (
                <div className={`p-4 border rounded-lg text-sm transition-colors duration-300 ${
                  theme === 'dark'
                    ? 'bg-red-500/10 border-red-500/30 text-red-400'
                    : 'bg-red-50 border-red-200 text-red-600'
                }`}>
                  {error}
                </div>
              )}

              {file && (
                <button
                  type="submit"
                  disabled={uploading}
                  className="w-full px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold hover:from-blue-600 hover:to-indigo-700 transition-all shadow-[0_10px_30px_-10px] shadow-blue-600/50 disabled:opacity-50 disabled:cursor-not-allowed ring-1 ring-inset ring-white/10"
                >
                  {uploading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="animate-spin">⏳</span>
                      Analyzing Resume...
                    </span>
                  ) : (
                    'Analyze My Resume'
                  )}
                </button>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`px-6 sm:px-12 py-12 border-t bg-transparent transition-colors duration-300 ${
        theme === 'dark' ? 'border-white/10' : 'border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                  <span className="text-white text-xl font-bold">R</span>
                </div>
                <h3 className="text-xl font-bold text-white">
                  ResumeAI
                </h3>
              </div>
              <p className={`text-sm transition-colors duration-300 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Build professional resumes that get you hired. AI-powered, ATS-optimized, and recruiter-approved.
              </p>
            </div>
            <div>
              <h4 className={`font-bold mb-4 transition-colors duration-300 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>Product</h4>
              <ul className={`space-y-2 text-sm transition-colors duration-300 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Templates</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className={`font-bold mb-4 transition-colors duration-300 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>Resources</h4>
              <ul className={`space-y-2 text-sm transition-colors duration-300 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Resume Tips</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Career Advice</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className={`font-bold mb-4 transition-colors duration-300 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>Company</h4>
              <ul className={`space-y-2 text-sm transition-colors duration-300 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                <li><a href="#" className="hover:text-blue-400 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className={`pt-8 border-t text-center text-sm transition-colors duration-300 ${
            theme === 'dark'
              ? 'border-gray-700 text-gray-400'
              : 'border-gray-200 text-gray-600'
          }`}>
            © 2024 ResumeAI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
