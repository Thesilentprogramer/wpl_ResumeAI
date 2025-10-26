import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { sendChatMessage } from '../api';

const ChatModal = ({ isOpen, onClose, resumeText }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen && resumeText) {
      setMessages([
        {
          role: 'assistant',
          content: 'Hello! I\'m your AI resume assistant. Ask me anything about your resume, from improving your summary to tailoring it for a specific job.',
          timestamp: new Date()
        }
      ]);
    }
  }, [isOpen, resumeText]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || !resumeText) return;

    const userMessage = { role: 'user', content: inputMessage, timestamp: new Date() };
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setLoading(true);

    try {
      const response = await sendChatMessage(userMessage.content, resumeText);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: response.response, timestamp: new Date() }
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.', timestamp: new Date() }
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const quickQuestions = [
    'Is my resume ATS-friendly?',
    'What are the strongest parts of my resume?',
    'Help me rephrase job responsibilities'
  ];

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4 z-[9999]">
      <div className="flex flex-col w-full max-w-2xl h-[80vh] bg-background-light dark:bg-background-dark rounded-xl shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-secondary-background/50 dark:border-secondary-background-dark/50">
          <h3 className="font-bold text-lg text-text-light dark:text-text-dark">AI Resume Assistant</h3>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-secondary-background/50 dark:hover:bg-secondary-background-dark/50">
            <span className="material-symbols-outlined text-text-light dark:text-text-dark">close</span>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.length === 0 ? (
            <div className="text-center mt-8">
              <p className="text-text-light dark:text-text-dark">Start chatting with the AI assistant!</p>
            </div>
          ) : (
            messages.map((message, idx) => (
              <div key={idx} className={`flex items-end gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {message.role === 'assistant' && (
                  <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-10 shrink-0" style={{backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAJkN7jNvEcl2OLshRaaNGOKNBZvs38OzI2xMKTfn9o99J5rNnf3bWHK8hwyZs6iZ8PBznwFOY2A4iQR9J9X41l1OIBqjZzYXOw4FhYjReZ1v1zB3r963_pgkfOAFZFm9jCnvXWLoBOVnUdMg3HmgdwUTfe7aK9uoGoh7uXsijsSF4EIGzjgFiCPjH4OP509kVRzwxpOHZI3I64z1qoPMFC8On7BH6iP2gFqXppblrOEqmF5n-OiRmAQm7xX6ST78wseyL0j6YEP68')`}} />
                )}
                <div className={`flex flex-col gap-1 ${message.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <p className="text-slate-500 dark:text-slate-400 text-xs font-normal">
                    {message.role === 'user' ? 'You' : 'AI Assistant'}
                  </p>
                  <div className={`text-base font-normal leading-normal max-w-lg rounded-lg px-4 py-3 ${
                    message.role === 'user'
                      ? 'bg-primary dark:bg-primary-dark text-white dark:text-background-dark'
                      : 'bg-secondary-background/50 dark:bg-secondary-background-dark/50 border border-secondary-background dark:border-secondary-background-dark text-text-light dark:text-text-dark'
                  }`}>
                    {message.role === 'assistant' ? (
                      <div className="prose prose-sm dark:prose-invert max-w-none">
                        <ReactMarkdown
                          components={{
                            p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                            strong: ({ children }) => <strong className="font-bold">{children}</strong>,
                            em: ({ children }) => <em className="italic">{children}</em>,
                            ul: ({ children }) => <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>,
                            ol: ({ children }) => <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>,
                            li: ({ children }) => <li className="ml-2">{children}</li>,
                          }}
                        >
                          {message.content}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      <p>{message.content}</p>
                    )}
                  </div>
                  {message.role === 'assistant' && idx === messages.length - 1 && (
                    <div className="flex gap-2 flex-wrap">
                      {quickQuestions.slice(0, 3).map((q, qIdx) => (
                        <button
                          key={qIdx}
                          onClick={() => setInputMessage(q)}
                          className="text-xs font-medium px-3 py-1.5 rounded-lg border border-secondary-background dark:border-secondary-background-dark bg-secondary-background/50 hover:bg-secondary-background dark:bg-secondary-background-dark/50 dark:hover:bg-secondary-background-dark text-text-light dark:text-text-dark"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {message.role === 'user' && (
                  <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-10 shrink-0" style={{backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuADhUi49WoJ2CDOsXCPfKA6GKC4uLVebz6RrUCsCND0fVJ5Jq-C9MVub4HjQopIPAONrHbWItX6OUcHHkCfZNl9ZtYd52ES0E5w0Kc110HKDCn7E2dSuTih5sx5sAvbDXohmuNlJZYIRZ4tr3fnJaE5vOxtzWjwBGOSMY9e5nG5JJnYkheGo-xUwCxsnfkKzFbKawlgQCWH-zP_aYjjmqQF48bAKtckIrmK53FQLm07kV8x2WC1osKX-VzFX760Vu2BsduJ89E1hBs')`}} />
                )}
              </div>
            ))
          )}

          {loading && (
            <div className="flex items-end gap-3">
              <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-10 shrink-0" style={{backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAJkN7jNvEcl2OLshRaaNGOKNBZvs38OzI2xMKTfn9o99J5rNnf3bWHK8hwyZs6iZ8PBznwFOY2A4iQR9J9X41l1OIBqjZzYXOw4FhYjReZ1v1zB3r963_pgkfOAFZFm9jCnvXWLoBOVnUdMg3HmgdwUTfe7aK9uoGoh7uXsijsSF4EIGzjgFiCPjH4OP509kVRzwxpOHZI3I64z1qoPMFC8On7BH6iP2gFqXppblrOEqmF5n-OiRmAQm7xX6ST78wseyL0j6YEP68')`}} />
              <div className="flex flex-col gap-1 items-start">
                <p className="text-slate-500 dark:text-slate-400 text-xs font-normal">AI Assistant is typing...</p>
                <div className="text-base font-normal leading-normal max-w-lg rounded-lg px-4 py-3 bg-secondary-background/50 dark:bg-secondary-background-dark/50 border border-secondary-background dark:border-secondary-background-dark text-text-light dark:text-text-dark">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 bg-highlight-light dark:bg-highlight-dark rounded-full animate-pulse [animation-delay:-0.3s]" />
                    <span className="h-2 w-2 bg-highlight-light dark:bg-highlight-dark rounded-full animate-pulse [animation-delay:-0.15s]" />
                    <span className="h-2 w-2 bg-highlight-light dark:bg-highlight-dark rounded-full animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 bg-secondary-background/30 dark:bg-secondary-background-dark/20 border-t border-secondary-background/50 dark:border-secondary-background-dark/50">
          <div className="flex items-center gap-3">
            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 shrink-0" style={{backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuADhUi49WoJ2CDOsXCPfKA6GKC4uLVebz6RrUCsCND0fVJ5Jq-C9MVub4HjQopIPAONrHbWItX6OUcHHkCfZNl9ZtYd52ES0E5w0Kc110HKDCn7E2dSuTih5sx5sAvbDXohmuNlJZYIRZ4tr3fnJaE5vOxtzWjwBGOSMY9e5nG5JJnYkheGo-xUwCxsnfkKzFbKawlgQCWH-zP_aYjjmqQF48bAKtckIrmK53FQLm07kV8x2WC1osKX-VzFX760Vu2BsduJ89E1hBs')`}} />
            <form onSubmit={handleSendMessage} className="flex flex-1 items-center rounded-lg bg-background-light dark:bg-background-dark border border-secondary-background/50 dark:border-secondary-background-dark/50 h-12">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask me a question about your resume..."
                disabled={!resumeText || loading}
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-l-lg text-text-light dark:text-text-dark focus:outline-0 focus:ring-0 border-none bg-transparent h-full placeholder:text-slate-500 dark:placeholder:text-slate-400 px-4 text-base font-normal leading-normal"
              />
              <div className="flex items-center pr-2">
                <button
                  type="submit"
                  disabled={!resumeText || loading || !inputMessage.trim()}
                  className="flex items-center justify-center p-2 rounded-full bg-primary dark:bg-primary-dark text-white dark:text-background-dark hover:bg-primary/90 dark:hover:bg-primary-dark/90 disabled:opacity-50"
                >
                  <span className="material-symbols-outlined">send</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;

