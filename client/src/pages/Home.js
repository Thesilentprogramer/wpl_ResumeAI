import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadResume } from '../api';

const Home = ({ onOpenChat, onAnalysisComplete }) => {
  const navigate = useNavigate();
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
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-purple-900 to-blue-950">
      {/* Header */}
      <header className="w-full px-6 sm:px-12 py-4 flex items-center justify-between">
        <button 
          onClick={() => navigate('/analysis')}
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
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-gray-300 hover:text-white transition-colors"
          >
            Home
          </button>
          <button
            onClick={() => navigate('/analysis')}
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium hover:from-purple-600 hover:to-blue-600 transition-all shadow-lg shadow-purple-500/30 flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">description</span>
            Analyze Resume
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 sm:px-12 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left Content */}
            <div className="flex-1 space-y-8">
              <div className="inline-block">
                <span className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 text-purple-300 text-sm font-medium">
                  AI-Powered Resume Analysis
                </span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight">
                Transform Your Resume,<br />Transform Your Career.
              </h1>
              
              <p className="text-lg text-gray-300 max-w-xl">
                Get professional, AI-driven insights to create a resume that stands out. Beat the ATS, impress recruiters, and land more interviews with our advanced resume analyzer.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold hover:from-purple-600 hover:to-blue-600 transition-all shadow-lg shadow-purple-500/30 flex items-center gap-2"
                  disabled={uploading}
                >
                  <span>Analyze My Resume Free</span>
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
                <button className="px-8 py-4 rounded-lg border-2 border-purple-500/30 text-white font-bold hover:border-purple-500/50 transition-colors">
                  See How It Works
                </button>
              </div>

              {/* Feature Badges */}
              <div className="flex flex-wrap gap-6 pt-4">
                <div className="flex items-center gap-2 text-green-400">
                  <span className="material-symbols-outlined text-lg">check_circle</span>
                  <span className="text-sm font-medium">No credit card required</span>
                </div>
                <div className="flex items-center gap-2 text-green-400">
                  <span className="material-symbols-outlined text-lg">check_circle</span>
                  <span className="text-sm font-medium">Instant results</span>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="flex-1">
              <div className="relative w-full h-[500px] rounded-2xl overflow-hidden border border-purple-500/30 shadow-2xl shadow-purple-500/20">
                <img
                  src="https://images.unsplash.com/photo-1425421669292-0c3da3b8f529?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHBlcnNvbnxlbnwxfHx8fDE3NjE0MzkyNzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Professional Career Success"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mt-20 pt-12 border-t border-gray-800">
            <div className="text-center">
              <div className="text-4xl font-black text-white mb-2">50K+</div>
              <div className="text-gray-400 text-sm">Resumes Analyzed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-white mb-2">95%</div>
              <div className="text-gray-400 text-sm">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-white mb-2">4.9/5</div>
              <div className="text-gray-400 text-sm">User Rating</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-white mb-2">2x</div>
              <div className="text-gray-400 text-sm">More Interviews</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 sm:px-12 py-20" id="features">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
              Powerful Features to Boost Your Career
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Our AI-powered analyzer provides comprehensive insights to help you create a resume that gets results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: '🎯', title: 'ATS Optimization', desc: 'Ensure your resume passes Applicant Tracking Systems with our advanced keyword analysis and formatting checks.' },
              { icon: '📈', title: 'Skill Matching', desc: 'Match your skills with industry standards and get personalized recommendations for improvement.' },
              { icon: '📑', title: 'Format Analysis', desc: 'Get expert feedback on your resume structure, layout, and visual presentation.' },
              { icon: '⚡', title: 'Instant Feedback', desc: 'Receive detailed insights and actionable suggestions in seconds.' },
              { icon: '🛡️', title: 'Content Review', desc: 'Analyze your work experience, achievements, and bullet points for maximum impact.' },
              { icon: '⭐', title: 'AI-Powered Insights', desc: 'Leverage cutting-edge AI technology to optimize your resume for your target role.' },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="group p-6 rounded-xl bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 mb-4 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-6 sm:px-12 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { num: '01', title: 'Upload Your Resume', desc: 'Simply upload your existing resume or paste the content directly.' },
              { num: '02', title: 'AI Analysis', desc: 'Our advanced AI scans and evaluates every aspect of your resume.' },
              { num: '03', title: 'Get Insights', desc: 'Receive a comprehensive report with actionable recommendations.' },
              { num: '04', title: 'Improve & Succeed', desc: 'Apply the suggestions and land your dream job faster.' },
            ].map((step, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-purple-500/20 hover:border-purple-500/40 transition-all"
              >
                <div className="text-6xl font-black text-purple-500/30 mb-4">{step.num}</div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-gray-400 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-6 sm:px-12 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
              Loved by Job Seekers Worldwide
            </h2>
            <p className="text-lg text-gray-400">
              Join thousands of professionals who have transformed their careers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { rating: 5, text: 'This tool helped me optimize my resume and I landed 3 interviews in just one week!' },
              { rating: 5, text: 'The ATS optimization feature is a game-changer. My resume now gets past the initial screening.' },
              { rating: 5, text: 'Incredible insights! The AI caught things I never would have noticed on my own.' },
            ].map((testimonial, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-purple-500/20"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
                <p className="text-gray-300">{testimonial.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upload Section */}
      <section id="upload-section" className="px-6 sm:px-12 py-20">
        <div className="max-w-3xl mx-auto">
          <div className="p-8 sm:p-12 rounded-2xl bg-gradient-to-br from-purple-900/20 to-slate-900/50 border border-purple-500/30 text-center space-y-6">
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Ready to Land Your Dream Job?
            </h2>
            <p className="text-lg text-gray-300">
              Start analyzing your resume now and get professional insights in seconds. No credit card required.
            </p>

            <form onSubmit={handleSubmit} className="mt-8">
              <div
                className={`border-2 border-dashed rounded-xl p-12 transition-all ${isDragging ? 'border-purple-500 bg-purple-500/10' : 'border-gray-700'} ${error ? 'border-red-500' : ''}`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
              >
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
                    <p className="text-white font-bold text-lg">
                      Drag & Drop Your Resume Here
                    </p>
                    <p className="text-gray-400 text-sm">or browse your files</p>
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleFileInput}
                      accept=".pdf,.docx"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="inline-block px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold hover:from-purple-600 hover:to-blue-600 transition-all cursor-pointer"
                    >
                      Browse Files
                    </label>
                  </div>
                )}
                <input type="file" className="hidden" onChange={handleFileInput} accept=".pdf,.docx" id="file-upload-hidden" />
              </div>

              {error && (
                <div className="mt-4 p-3 bg-red-500/10 border border-red-500 rounded text-red-400 text-sm">
                  {error}
                </div>
              )}

              {file && (
                <button
                  type="submit"
                  disabled={uploading}
                  className="mt-6 w-full px-8 py-4 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold hover:from-purple-600 hover:to-blue-600 transition-all shadow-lg shadow-purple-500/30 disabled:opacity-50"
                >
                  {uploading ? 'Analyzing...' : 'Get Your Free Analysis'}
                </button>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 sm:px-12 py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-xl">⚡</span>
                </div>
                <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                  ResumeAI Analyzer
                </h3>
              </div>
              <p className="text-gray-400 text-sm">
                AI-powered resume analysis for better career outcomes.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">How it works</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Resume Tips</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Career Advice</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
