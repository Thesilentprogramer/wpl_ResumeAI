import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadResume } from '../api';

const Home = ({ onOpenChat, onAnalysisComplete }) => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleDrop = (e) => {
    e.preventDefault();
    const selectedFile = e.dataTransfer.files[0];
    if (selectedFile) handleFile(selectedFile);
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
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <div className="flex flex-1 justify-center">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            {/* Header */}
            <header className="flex items-center justify-between whitespace-nowrap px-10 py-3">
              <div className="flex items-center gap-4">
                <div className="size-6 text-primary dark:text-primary-dark">
                  <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                    <path clipRule="evenodd" d="M12.0799 24L4 19.2479L9.95537 8.75216L18.04 13.4961L18.0446 4H29.9554L29.96 13.4961L38.0446 8.75216L44 19.2479L35.92 24L44 28.7521L38.0446 39.2479L29.96 34.5039L29.9554 44H18.0446L18.04 34.5039L9.95537 39.2479L4 28.7521L12.0799 24Z" fill="currentColor" fillRule="evenodd"/>
                  </svg>
                </div>
                <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">Resume AI</h2>
              </div>
              <div className="flex flex-1 justify-end items-center gap-8">
                <div className="flex items-center gap-9">
                  <a href="#" className="text-text-light dark:text-text-dark text-sm font-medium leading-normal hover:text-primary dark:hover:text-primary-dark">Home</a>
                  <a href="#" className="text-text-light-secondary dark:text-text-dark-secondary text-sm font-medium leading-normal hover:text-primary dark:hover:text-primary-dark">Resume Analysis</a>
                  <button onClick={onOpenChat} className="text-text-light-secondary dark:text-text-dark-secondary text-sm font-medium leading-normal hover:text-primary dark:hover:text-primary-dark">AI Chat</button>
                </div>
              </div>
            </header>

            {/* Main Content */}
            <main className="py-10 px-4">
              <div className="flex flex-col items-center text-center gap-8">
                <div className="flex flex-col gap-2">
                  <h1 className="text-text-light dark:text-text-dark text-4xl font-black leading-tight tracking-[-0.033em] sm:text-5xl">
                    Get Your Resume AI-Analyzed
                  </h1>
                  <h2 className="text-text-light-secondary dark:text-text-dark-secondary text-base font-normal leading-normal max-w-lg">
                    Upload your resume to receive instant feedback and chat with an AI assistant.
                  </h2>
                </div>

                {/* Upload Area */}
                <div className="w-full max-w-[560px]">
                  <form onSubmit={handleSubmit} className="flex flex-col p-4">
                    <div className="flex flex-col items-center gap-6 rounded-xl border-2 border-dashed border-background-light-secondary dark:border-background-dark-secondary bg-background-light-secondary/20 dark:bg-background-dark-secondary/50 px-6 py-14">
                      {file ? (
                        <div className="flex max-w-[480px] flex-col items-center gap-2">
                          <span className="material-symbols-outlined text-green-600 text-6xl">check_circle</span>
                          <p className="text-text-light dark:text-text-dark text-lg font-bold leading-tight tracking-[-0.015em]">{file.name}</p>
                          <p className="text-text-light-secondary dark:text-text-dark-secondary text-sm font-normal leading-normal">{(file.size / 1024).toFixed(2)} KB</p>
                          <button type="button" onClick={() => setFile(null)} className="text-blue-600 hover:text-blue-800 text-sm">Choose different file</button>
                          <input type="file" className="hidden" onChange={handleFileInput} accept=".pdf,.docx" id="file-upload" />
                          <label htmlFor="file-upload" className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary dark:bg-primary-dark text-white dark:text-background-dark text-sm font-bold leading-normal tracking-[0.015em] mt-4">
                            <span className="truncate">Browse Files</span>
                          </label>
                        </div>
                      ) : (
                        <div className="flex max-w-[480px] flex-col items-center gap-2">
                          <p className="text-text-light dark:text-text-dark text-lg font-bold leading-tight tracking-[-0.015em] max-w-[480px] text-center">
                            Drag & Drop Your Resume Here
                          </p>
                          <p className="text-text-light-secondary dark:text-text-dark-secondary text-sm font-normal leading-normal max-w-[480px] text-center">
                            or browse your files
                          </p>
                          <input type="file" className="hidden" onChange={handleFileInput} accept=".pdf,.docx" id="file-upload" />
                          <label htmlFor="file-upload" className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary dark:bg-primary-dark text-white dark:text-background-dark text-sm font-bold leading-normal tracking-[0.015em]">
                            <span className="truncate">Browse Files</span>
                          </label>
                        </div>
                      )}
                    </div>
                    <p className="text-text-light-secondary dark:text-text-dark-secondary text-sm font-normal leading-normal pb-3 pt-1 px-4 text-center">
                      Supported formats: PDF, DOCX
                    </p>

                    {error && (
                      <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded text-red-600 text-sm">
                        {error}
                      </div>
                    )}

                    {file && (
                      <button
                        type="submit"
                        disabled={uploading}
                        className="mt-6 flex min-w-[84px] max-w-[480px] items-center justify-center rounded-lg h-10 bg-primary dark:bg-primary-dark text-white dark:text-background-dark text-sm font-bold leading-normal tracking-[0.015em] disabled:opacity-50"
                      >
                        {uploading ? 'Analyzing...' : 'Analyze Resume'}
                      </button>
                    )}
                  </form>
                </div>

                {/* Why use section */}
                <div className="flex flex-col gap-10 px-4 py-10 mt-10">
                  <div className="flex flex-col gap-6 items-center text-center">
                    <div className="flex flex-col gap-4">
                      <h1 className="text-text-light dark:text-text-dark tracking-light text-[32px] font-bold leading-tight sm:text-4xl sm:font-black sm:leading-tight sm:tracking-[-0.033em] max-w-[720px]">
                        Why use our service?
                      </h1>
                      <p className="text-text-light-secondary dark:text-text-dark-secondary text-base font-normal leading-normal max-w-[720px]">
                        Our AI-powered platform provides you with the tools you need to create a winning resume.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4 p-0">
                    <div className="flex flex-1 gap-3 rounded-xl border border-background-light-secondary dark:border-background-dark-secondary bg-background-light-secondary/50 dark:bg-background-dark-secondary p-4 flex-col">
                      <div className="text-highlight-light dark:text-highlight-dark material-symbols-outlined">document_scanner</div>
                      <div className="flex flex-col gap-1">
                        <h2 className="text-text-light dark:text-text-dark text-base font-bold leading-tight">Instant Analysis</h2>
                        <p className="text-text-light-secondary dark:text-text-dark-secondary text-sm font-normal leading-normal">
                          Receive immediate feedback on your resume's content, formatting, and keywords.
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-1 gap-3 rounded-xl border border-background-light-secondary dark:border-background-dark-secondary bg-background-light-secondary/50 dark:bg-background-dark-secondary p-4 flex-col">
                      <div className="text-highlight-light dark:text-highlight-dark material-symbols-outlined">chat</div>
                      <div className="flex flex-col gap-1">
                        <h2 className="text-text-light dark:text-text-dark text-base font-bold leading-tight">AI Chatbot</h2>
                        <p className="text-text-light-secondary dark:text-text-dark-secondary text-sm font-normal leading-normal">
                          Chat with our AI assistant to get answers to your career questions.
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-1 gap-3 rounded-xl border border-background-light-secondary dark:border-background-dark-secondary bg-background-light-secondary/50 dark:bg-background-dark-secondary p-4 flex-col">
                      <div className="text-highlight-light dark:text-highlight-dark material-symbols-outlined">workspace_premium</div>
                      <div className="flex flex-col gap-1">
                        <h2 className="text-text-light dark:text-text-dark text-base font-bold leading-tight">Personalized Feedback</h2>
                        <p className="text-text-light-secondary dark:text-text-dark-secondary text-sm font-normal leading-normal">
                          Get tailored suggestions to improve your resume and land your dream job.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>

            {/* Footer */}
            <footer className="text-center py-6 border-t border-background-light-secondary dark:border-background-dark-secondary mt-10">
              <div className="flex justify-center gap-6 text-sm">
                <a className="text-text-light-secondary dark:text-text-dark-secondary hover:text-primary dark:hover:text-primary-dark" href="#">About Us</a>
                <a className="text-text-light-secondary dark:text-text-dark-secondary hover:text-primary dark:hover:text-primary-dark" href="#">Privacy Policy</a>
                <a className="text-text-light-secondary dark:text-text-dark-secondary hover:text-primary dark:hover:text-primary-dark" href="#">Contact</a>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

