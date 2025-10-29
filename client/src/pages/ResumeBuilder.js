import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import ResumeEditor from '../components/ResumeEditor';

const ResumeBuilder = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [searchParams] = useSearchParams();
  const resumeId = searchParams.get('resumeId');
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const templates = [
    {
      id: 'google',
      name: 'Google',
      company: 'Google',
      color: 'from-blue-500 to-blue-600',
      accent: 'bg-blue-500',
      description: 'Clean, minimalist design favored by Google',
      features: ['ATS Friendly', 'Modern Layout', 'Clean Typography']
    },
    {
      id: 'microsoft',
      name: 'Microsoft',
      company: 'Microsoft',
      color: 'from-orange-500 to-orange-600',
      accent: 'bg-orange-500',
      description: 'Professional corporate style used at Microsoft',
      features: ['Corporate Ready', 'Professional', 'Structured Format']
    },
    {
      id: 'apple',
      name: 'Apple',
      company: 'Apple',
      color: 'from-gray-800 to-gray-900',
      accent: 'bg-gray-800',
      description: 'Sophisticated minimalist design inspired by Apple',
      features: ['Elegant', 'Minimalist', 'Premium Look']
    },
    {
      id: 'amazon',
      name: 'Amazon',
      company: 'Amazon',
      color: 'from-yellow-400 to-orange-500',
      accent: 'bg-yellow-400',
      description: 'Result-oriented format preferred by Amazon',
      features: ['Results Focused', 'Data Driven', 'Action Oriented']
    },
    {
      id: 'meta',
      name: 'Meta',
      company: 'Meta',
      color: 'from-blue-600 to-blue-800',
      accent: 'bg-blue-600',
      description: 'Creative and innovative design for Meta',
      features: ['Creative', 'Innovative', 'Tech Forward']
    },
    {
      id: 'netflix',
      name: 'Netflix',
      company: 'Netflix',
      color: 'from-red-600 to-red-700',
      accent: 'bg-red-600',
      description: 'Bold and distinctive style for Netflix',
      features: ['Bold Design', 'Distinctive', 'Eye Catching']
    },
    {
      id: 'tesla',
      name: 'Tesla',
      company: 'Tesla',
      color: 'from-red-500 to-red-600',
      accent: 'bg-red-500',
      description: 'Innovation-focused design for Tesla',
      features: ['Innovative', 'Future Forward', 'Impact Driven']
    },
    {
      id: 'uber',
      name: 'Uber',
      company: 'Uber',
      color: 'from-gray-900 to-black',
      accent: 'bg-gray-900',
      description: 'Modern urban design for Uber',
      features: ['Urban Style', 'Modern', 'Streamlined']
    }
  ];

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
  };

  const handleBack = () => {
    setSelectedTemplate(null);
  };

  if (selectedTemplate) {
    return <ResumeEditor template={selectedTemplate} onBack={handleBack} resumeId={resumeId} />;
  }

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

      {/* Decorative gradient glow */}
      {theme === 'dark' && (
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[32rem] w-[32rem] rounded-full bg-gradient-to-b from-cyan-400/20 via-blue-500/10 to-transparent blur-3xl"></div>
      )}

      {/* Header */}
      <header className={`w-full px-6 sm:px-12 py-4 flex items-center justify-between border-b bg-transparent transition-colors duration-300 relative z-10 ${
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
            Resume Builder
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
            onClick={() => navigate('/analysis')}
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg shadow-blue-500/30 flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">description</span>
            Analysis
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 sm:px-12 py-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Title Section */}
          <div className="text-center mb-12">
            <h1 className={`text-4xl sm:text-5xl font-black mb-4 transition-colors duration-300 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Choose Your Resume Template
            </h1>
            <p className={`text-lg max-w-2xl mx-auto transition-colors duration-300 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Select a template inspired by top tech companies. Each template is optimized for ATS and designed to impress recruiters.
            </p>
          </div>

          {/* Templates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {templates.map((template) => (
              <button
                key={template.id}
                onClick={() => handleTemplateSelect(template)}
                className={`group relative rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 ${
                  theme === 'dark'
                    ? 'bg-white/5 border border-white/10 backdrop-blur-sm hover:border-blue-500/40 hover:bg-white/10'
                    : 'bg-white border border-gray-200 shadow-md hover:border-blue-500 hover:shadow-xl'
                }`}
              >
                {/* Template Preview */}
                <div className="aspect-[3/4] relative overflow-hidden">
                  {/* Template Preview Design */}
                  <div className={`h-full bg-gradient-to-br ${template.color} p-4 flex flex-col`}>
                    {/* Header Bar */}
                    <div className="flex items-center justify-between mb-4">
                      <div className={`${template.accent} w-16 h-2 rounded`}></div>
                      <div className={`${template.accent} w-8 h-8 rounded-full`}></div>
                    </div>
                    
                    {/* Content Sections */}
                    <div className="space-y-3 flex-1">
                      <div className={`bg-white/20 backdrop-blur-sm rounded p-2 ${template.id === 'google' ? 'h-12' : template.id === 'apple' ? 'h-8' : 'h-10'}`}></div>
                      <div className={`bg-white/20 backdrop-blur-sm rounded p-2 ${template.id === 'microsoft' ? 'h-16' : template.id === 'amazon' ? 'h-14' : 'h-12'}`}></div>
                      <div className={`bg-white/20 backdrop-blur-sm rounded p-2 ${template.id === 'netflix' ? 'h-14' : template.id === 'tesla' ? 'h-10' : 'h-12'}`}></div>
                      {template.id === 'google' && (
                        <div className="bg-white/20 backdrop-blur-sm rounded p-2 h-8"></div>
                      )}
                      {template.id === 'apple' && (
                        <>
                          <div className="bg-white/20 backdrop-blur-sm rounded p-2 h-10"></div>
                          <div className="bg-white/20 backdrop-blur-sm rounded p-2 h-8"></div>
                        </>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="mt-4 flex items-center gap-2">
                      <div className={`${template.accent} w-12 h-1 rounded`}></div>
                      <div className={`${template.accent} w-12 h-1 rounded`}></div>
                    </div>
                  </div>

                  {/* Overlay on Hover */}
                  <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 opacity-0 group-hover:opacity-100 ${
                    theme === 'dark' ? 'bg-black/60' : 'bg-white/80'
                  }`}>
                    <div className={`px-6 py-3 rounded-xl font-bold transition-colors duration-300 ${
                      theme === 'dark' ? 'bg-blue-500 text-white' : 'bg-blue-600 text-white'
                    }`}>
                      Select Template
                    </div>
                  </div>
                </div>

                {/* Template Info */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className={`text-xl font-black transition-colors duration-300 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {template.name}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      theme === 'dark' ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {template.company}
                    </span>
                  </div>
                  <p className={`text-sm mb-4 transition-colors duration-300 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {template.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {template.features.map((feature, idx) => (
                      <span key={idx} className={`px-2 py-1 rounded text-xs transition-colors duration-300 ${
                        theme === 'dark' ? 'bg-white/10 text-gray-300' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Info Section */}
          <div className={`mt-16 p-8 rounded-2xl backdrop-blur-sm transition-all duration-300 ${
            theme === 'dark'
              ? 'bg-white/5 border border-white/10 shadow-[0_30px_60px_-15px] shadow-blue-600/20'
              : 'bg-white border border-gray-200 shadow-xl'
          }`}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-3xl">check_circle</span>
                </div>
                <h3 className={`text-lg font-bold mb-2 transition-colors duration-300 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>ATS Optimized</h3>
                <p className={`text-sm transition-colors duration-300 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  All templates are designed to pass ATS screening
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-3xl">edit</span>
                </div>
                <h3 className={`text-lg font-bold mb-2 transition-colors duration-300 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>Easy Editing</h3>
                <p className={`text-sm transition-colors duration-300 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Simple drag-and-drop interface for easy customization
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-3xl">download</span>
                </div>
                <h3 className={`text-lg font-bold mb-2 transition-colors duration-300 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>Export Options</h3>
                <p className={`text-sm transition-colors duration-300 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Download as PDF, DOCX, or share directly
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResumeBuilder;

