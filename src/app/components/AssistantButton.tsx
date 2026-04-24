import { useState, useEffect, useRef } from 'react';
import { Bot, X, Send } from 'lucide-react';
import { chatbotAPI } from '../../lib/api';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function AssistantButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Generate session ID on mount
  useEffect(() => {
    setSessionId(crypto.randomUUID());
  }, []);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const suggestions = [
    'Tell me about your projects',
    'What are your skills?',
    'What backend technologies do you use?',
    'Tell me about your system design experience',
    'What is your experience?',
  ];

  const handleToggle = () => {
    console.log('Assistant button clicked, current state:', isOpen);
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async () => {
    if (!message.trim() || loading) return;

    const userMessage = message.trim();
    setMessage('');
    
    // Add user message to chat
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
      const response = await chatbotAPI.query(userMessage, sessionId);
      const data = response.data;
      
      // Add assistant response
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: data.message 
      }]);
    } catch (error) {
      console.error('Chatbot error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please try again.' 
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionClick = async (suggestion: string) => {
    setMessage(suggestion);
    // Auto-send the suggestion
    if (!loading) {
      setMessages(prev => [...prev, { role: 'user', content: suggestion }]);
      setLoading(true);

      try {
        const response = await chatbotAPI.query(suggestion, sessionId);
        const data = response.data;
        
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: data.message 
        }]);
      } catch (error) {
        console.error('Chatbot error:', error);
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: 'Sorry, I encountered an error. Please try again.' 
        }]);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={handleToggle}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 cursor-pointer"
        style={{
          backgroundColor: '#14141c',
          borderWidth: '1px',
          borderColor: '#1f1f28',
          boxShadow: '0 0 20px rgba(107, 81, 224, 0.3), 0 4px 6px rgba(0, 0, 0, 0.5)',
          zIndex: 9999,
        }}
        type="button"
        aria-label="Toggle assistant"
      >
        <Bot className="w-6 h-6" style={{ color: '#6b51e0' }} />
      </button>

      {/* Assistant Panel */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-6 rounded-lg shadow-2xl"
          style={{
            width: '380px',
            height: '500px',
            backgroundColor: '#0b0b0f',
            borderWidth: '1px',
            borderColor: '#1f1f28',
            boxShadow: '0 0 40px rgba(107, 81, 224, 0.2), 0 20px 25px -5px rgba(0, 0, 0, 0.5)',
            zIndex: 9998,
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3 border-b"
            style={{ borderColor: '#1f1f28' }}
          >
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5" style={{ color: '#6b51e0' }} />
              <span className="font-mono" style={{ color: '#e2e2e8' }}>Assistant</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded transition-colors hover:bg-gray-800 cursor-pointer"
              style={{ color: '#757584' }}
              type="button"
              aria-label="Close assistant"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Content */}
          <div className="flex flex-col h-[calc(100%-110px)]">
            {/* Suggestions */}
            <div className="p-4 space-y-2">
              <p className="font-mono mb-3" style={{ fontSize: '13px', color: '#757584' }}>
                // Quick suggestions
              </p>
              {suggestions.map((suggestion, i) => (
                <button
                  key={i}
                  onClick={() => handleSuggestionClick(suggestion)}
                  disabled={loading}
                  className="w-full text-left px-3 py-2 rounded transition-all duration-200 font-mono cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: '#14141c',
                    borderWidth: '1px',
                    borderColor: '#1f1f28',
                    color: '#e2e2e8',
                    fontSize: '13px',
                  }}
                  type="button"
                  onMouseEnter={(e) => {
                    if (!loading) {
                      e.currentTarget.style.borderColor = '#6b51e0';
                      e.currentTarget.style.boxShadow = '0 0 10px rgba(107, 81, 224, 0.2)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#1f1f28';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {suggestion}
                </button>
              ))}
            </div>

            {/* Chat Area */}
            <div className="flex-1 px-4 overflow-y-auto">
              {messages.length === 0 ? (
                <div className="flex items-start gap-3 mb-4">
                  <Bot className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: '#6b51e0' }} />
                  <div 
                    className="flex-1 px-3 py-2 rounded font-mono"
                    style={{ 
                      backgroundColor: '#14141c',
                      color: '#e2e2e8',
                      fontSize: '13px',
                    }}
                  >
                    Hello! I can help you navigate this portfolio. Ask me anything about projects, skills, or experience.
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {messages.map((msg, i) => (
                    <div key={i} className="flex items-start gap-3">
                      {msg.role === 'assistant' && (
                        <Bot className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: '#6b51e0' }} />
                      )}
                      <div 
                        className={`flex-1 px-3 py-2 rounded font-mono ${msg.role === 'user' ? 'ml-auto' : ''}`}
                        style={{ 
                          backgroundColor: msg.role === 'user' ? '#6b51e0' : '#14141c',
                          color: '#e2e2e8',
                          fontSize: '13px',
                          maxWidth: msg.role === 'user' ? '80%' : '100%',
                        }}
                      >
                        {msg.content}
                      </div>
                    </div>
                  ))}
                  {loading && (
                    <div className="flex items-start gap-3">
                      <Bot className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: '#6b51e0' }} />
                      <div 
                        className="flex-1 px-3 py-2 rounded font-mono"
                        style={{ 
                          backgroundColor: '#14141c',
                          color: '#757584',
                          fontSize: '13px',
                        }}
                      >
                        Thinking...
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>
              )}
            </div>
          </div>

          {/* Input */}
          <div 
            className="p-4 border-t"
            style={{ borderColor: '#1f1f28' }}
          >
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                disabled={loading}
                placeholder="Type a message..."
                className="flex-1 px-3 py-2 rounded font-mono outline-none disabled:opacity-50"
                style={{
                  backgroundColor: '#14141c',
                  borderWidth: '1px',
                  borderColor: '#1f1f28',
                  color: '#e2e2e8',
                  fontSize: '13px',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#6b51e0';
                  e.currentTarget.style.boxShadow = '0 0 10px rgba(107, 81, 224, 0.2)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#1f1f28';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
              <button
                className="px-3 py-2 rounded transition-all duration-200 hover:opacity-80 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: '#6b51e0',
                  color: '#ffffff',
                }}
                type="button"
                aria-label="Send message"
                onClick={handleSendMessage}
                disabled={loading || !message.trim()}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
