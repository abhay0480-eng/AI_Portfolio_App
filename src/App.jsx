import React from 'react';
import { useChatbot } from './hooks/useChatbot';
import BackgroundDecor from './components/BackgroundDecor';
import TerminalHeader from './components/TerminalHeader';
import ChatMessage from './components/ChatMessage';
import TypingIndicator from './components/TypingIndicator';
import ChatInput from './components/ChatInput';
import StickyQuickActions from './components/StickyQuickActions';
import EmojiReactions from './components/EmojiReactions';
import { incrementView } from './services/analyticsService';
import { StatsProvider, useStats } from './contexts/StatsContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { useEffect, useState } from 'react';
import FeedbackForm from './components/FeedbackForm';

function AppContent() {
  const {
    input,
    setInput,
    messages,
    isBotTyping,
    aiMode,
    sarvamMode,
    scrollRef,
    inputRef,
    handleCommand,
    handleSubmit,
  } = useChatbot();

  const stats = useStats();
  const viewCount = stats.views || 0;

  const [isClosing, setIsClosing] = useState(false);
  const [isAppClosed, setIsAppClosed] = useState(false);

  // Increment view on first load
  useEffect(() => {
    incrementView();
  }, []);

  const handleCloseApp = () => setIsClosing(true);
  const handleFinalClose = () => {
    setIsClosing(false);
    setIsAppClosed(true);
  };
  const handleCancelClose = () => setIsClosing(false);

  if (isAppClosed) {
    return (
      <div className="min-h-screen bg-theme-base text-theme-main font-mono p-4 flex items-center justify-center selection-theme flex-col gap-4">
        <BackgroundDecor />
        <div className="relative z-10 text-center space-y-4 max-w-md w-full bg-theme-panel/90 backdrop-blur-md p-8 rounded-lg border border-theme shadow-theme">
          <div className="text-5xl mb-6">👋</div>
          <h1 className="text-xl font-bold tracking-widest uppercase text-theme-primary">Session Ended</h1>
          <p className="text-theme-muted text-sm">Thank you for visiting Abhay's portfolio.</p>
          <button
            onClick={() => setIsAppClosed(false)}
            className="mt-6 px-6 py-2.5 border border-theme rounded hover:bg-theme-hover transition-colors text-theme-main text-xs font-bold uppercase tracking-wider"
          >
            Restart Terminal
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-theme-base text-theme-main font-mono p-2 sm:p-4 md:p-8 flex items-center justify-center selection-theme overflow-hidden transition-colors duration-500">

      <BackgroundDecor />

      {/* Main Terminal Window */}
      <div className="relative z-10 w-full max-w-5xl h-[100dvh] sm:h-[92vh] md:h-[85vh] bg-theme-panel/90 backdrop-blur-md sm:rounded-lg border border-theme shadow-theme flex flex-col overflow-hidden ring-1 ring-white/10 transition-colors duration-500">

        <TerminalHeader aiMode={aiMode} sarvamMode={sarvamMode} viewCount={viewCount} onCloseApp={handleCloseApp} />

        {/* Exit Intent / Close Modal */}
        {isClosing && (
          <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
            <div className="w-full max-w-sm bg-theme-panel border border-theme rounded-xl p-5 shadow-2xl relative animate-in zoom-in-95 duration-300">
              <button
                onClick={handleCancelClose}
                className="absolute right-4 top-4 text-theme-muted hover:text-white transition-colors"
              >
                ✕
              </button>
              <div className="text-center mb-2 mt-2">
                <h2 className="text-lg font-bold text-theme-primary tracking-wider uppercase">Leaving so soon?</h2>
                <p className="text-xs text-theme-muted mt-1.5">We'd love to hear your thoughts before you go.</p>
              </div>
              <FeedbackForm onSkip={handleFinalClose} onSubmitSuccess={handleFinalClose} />
            </div>
          </div>
        )}

        {/* Chat Area */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent space-y-4 sm:space-y-6"
        >
          {messages.map((msg) => (
            <ChatMessage key={msg.id} msg={msg} onCommand={handleCommand} />
          ))}

          {isBotTyping && <TypingIndicator />}
        </div>

        {/* Emoji Reactions */}
        <EmojiReactions />

        {/* Sticky Quick Actions */}
        <StickyQuickActions onCommand={handleCommand} />

        <ChatInput
          ref={inputRef}
          input={input}
          onInputChange={setInput}
          onSubmit={handleSubmit}
          aiMode={aiMode}
          sarvamMode={sarvamMode}
        />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <StatsProvider>
        <AppContent />
      </StatsProvider>
    </ThemeProvider>
  );
}