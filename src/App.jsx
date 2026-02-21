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
import { useEffect } from 'react';

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

  // Increment view on first load
  useEffect(() => {
    incrementView();
  }, []);

  return (
    <div className="min-h-screen bg-theme-base text-theme-main font-mono p-2 sm:p-4 md:p-8 flex items-center justify-center selection-theme overflow-hidden transition-colors duration-500">

      <BackgroundDecor />

      {/* Main Terminal Window */}
      <div className="relative z-10 w-full max-w-5xl h-[100dvh] sm:h-[92vh] md:h-[85vh] bg-theme-panel/90 backdrop-blur-md sm:rounded-lg border border-theme shadow-theme flex flex-col overflow-hidden ring-1 ring-white/10 transition-colors duration-500">

        <TerminalHeader aiMode={aiMode} sarvamMode={sarvamMode} viewCount={viewCount} />

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