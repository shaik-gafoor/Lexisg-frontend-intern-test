import React, { useState, useRef, useEffect } from "react";
import { Send, FileText, ExternalLink, Trash2, Copy } from "lucide-react";
import PdfModal from "./components/PdfModal";
import useKeyboardShortcuts from "./hooks/useKeyboardShortcuts";

const App = () => {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversation, setConversation] = useState([]);
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [selectedCitation, setSelectedCitation] = useState(null);
  const textareaRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Simulated API response data
  const simulatedResponse = {
    answer:
      "Yes, in a motor accident claim under Section 166 of the Motor Vehicles Act, 1988, where the deceased was self-employed and aged 54–55 years at the time of death, the claimant is entitled to an addition towards future prospects. In Dani Devi v. Pritam Singh (FAO No. 4353 of 2012), the Punjab and Haryana High Court held that 10% of annual income should have been awarded on account of future prospects.",
    citations: [
      {
        id: 1,
        text: "as the age of the deceased at the time of accident was held to be about 54-55 years by the learned Tribunal, being self-employed, as such, 10% of annual income should have been awarded on account of future prospects.",
        source: "Dani Devi v. Pritam Singh (P&H)",
        paragraph: "Para 7",
        link: "https://lexisingapore-my.sharepoint.com/:b:/g/personal/harshit_lexi_sg/EdOegeiR_gdBvQxdyW4xE6oBCDgj5E4Bo5wjvhPHpqgIuQ?e=TEu4vz",
      },
    ],
  };

  // Keyboard shortcuts
  useKeyboardShortcuts([
    {
      key: "Enter",
      ctrlKey: true,
      callback: () => {
        if (textareaRef.current && !isLoading) {
          handleSubmit({ preventDefault: () => {} });
        }
      },
    },
    {
      key: "k",
      ctrlKey: true,
      callback: () => {
        setConversation([]);
        setQuery("");
        if (textareaRef.current) {
          textareaRef.current.focus();
        }
      },
    },
    {
      key: "Escape",
      callback: () => {
        if (showPdfModal) {
          closePdfModal();
        }
      },
    },
  ]);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    // Add user message to conversation
    const userMessage = { type: "user", content: query, timestamp: new Date() };
    setConversation((prev) => [...prev, userMessage]);

    setIsLoading(true);
    setQuery("");

    // Simulate API call delay
    setTimeout(() => {
      const assistantMessage = {
        type: "assistant",
        content: simulatedResponse.answer,
        citations: simulatedResponse.citations,
        timestamp: new Date(),
      };
      setConversation((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleCitationClick = (citation) => {
    setSelectedCitation(citation);
    setShowPdfModal(true);
  };

  const closePdfModal = () => {
    setShowPdfModal(false);
    setSelectedCitation(null);
  };

  const clearConversation = () => {
    setConversation([]);
    setQuery("");
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && e.ctrlKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900">
                Lexi Legal Assistant
              </h1>
            </div>
            {conversation.length > 0 && (
              <button
                onClick={clearConversation}
                className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-100 transition-colors"
                title="Clear conversation (Ctrl+K)"
              >
                <Trash2 className="w-4 h-4" />
                <span className="text-sm">Clear</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Chat Container */}
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {conversation.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Welcome to Lexi Legal Assistant
              </h2>
              <p className="text-gray-600 mb-4">
                Ask me any legal question and I'll provide detailed answers with
                citations from relevant case law.
              </p>

              {/* Sample queries */}
              <div className="max-w-2xl mx-auto">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">
                  Try asking:
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={() =>
                      setQuery(
                        "In a motor accident claim where the deceased was self-employed and aged 54–55 years at the time of death, is the claimant entitled to an addition towards future prospects?"
                      )
                    }
                    className="block w-full text-left text-xs text-gray-600 bg-white border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors"
                  >
                    "In a motor accident claim where the deceased was
                    self-employed and aged 54–55 years at the time of death, is
                    the claimant entitled to an addition towards future
                    prospects?"
                  </button>
                </div>
              </div>

              <div className="mt-6 text-xs text-gray-500">
                <p>
                  Shortcuts: Ctrl+Enter to send, Ctrl+K to clear, Esc to close
                  modal
                </p>
              </div>
            </div>
          ) : (
            conversation.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-3xl ${
                    message.type === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-white border border-gray-200"
                  } rounded-lg px-4 py-3 shadow-sm group`}
                >
                  {message.type === "user" ? (
                    <div className="flex items-start justify-between">
                      <p className="text-sm">{message.content}</p>
                      <button
                        onClick={() => copyToClipboard(message.content)}
                        className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Copy"
                      >
                        <Copy className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-start justify-between mb-3">
                        <p className="text-sm text-gray-900 leading-relaxed flex-1">
                          {message.content}
                        </p>
                        <button
                          onClick={() => copyToClipboard(message.content)}
                          className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          title="Copy"
                        >
                          <Copy className="w-3 h-3 text-gray-500" />
                        </button>
                      </div>
                      {message.citations && message.citations.length > 0 && (
                        <div className="border-t border-gray-200 pt-3">
                          <h4 className="text-xs font-semibold text-gray-700 mb-2">
                            CITATIONS
                          </h4>
                          {message.citations.map((citation) => (
                            <div
                              key={citation.id}
                              className="bg-gray-50 border border-gray-200 rounded-md p-3 cursor-pointer hover:bg-gray-100 transition-colors"
                              onClick={() => handleCitationClick(citation)}
                            >
                              <div className="flex items-start space-x-2">
                                <FileText className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                                <div className="flex-1">
                                  <p className="text-xs text-gray-800 italic leading-relaxed">
                                    "{citation.text}"
                                  </p>
                                  <div className="flex items-center justify-between mt-2">
                                    <p className="text-xs text-gray-600">
                                      {citation.source} ({citation.paragraph})
                                    </p>
                                    <ExternalLink className="w-3 h-3 text-blue-600" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <span className="text-sm text-gray-500 ml-2">
                    Analyzing your query...
                  </span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <div className="border-t border-gray-200 bg-white p-4">
          <form onSubmit={handleSubmit} className="flex space-x-3">
            <textarea
              ref={textareaRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask a legal question..."
              className="flex-1 resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows="3"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !query.trim()}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-2 font-medium shadow-sm hover:shadow-md"
              title="Send message (Ctrl+Enter)"
            >
              <span className="text-sm">Send</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
          <div className="flex items-center justify-between mt-2">
            <p className="text-xs text-gray-500">
              Press Ctrl+Enter to send • Ctrl+K to clear • Esc to close modal
            </p>
            <p className="text-xs text-gray-400">
              Lexi Legal Assistant v1.0 • Built with React & Tailwind
            </p>
          </div>
        </div>
      </div>

      {/* PDF Modal */}
      <PdfModal
        isOpen={showPdfModal}
        citation={selectedCitation}
        onClose={closePdfModal}
      />
    </div>
  );
};

export default App;
