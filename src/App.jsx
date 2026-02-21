import React, { useEffect, useState } from 'react';
import { useChatbot } from './hooks/useChatbot';
import BackgroundDecor from './components/BackgroundDecor';
import TerminalHeader from './components/TerminalHeader';
import ChatMessage from './components/ChatMessage';
import TypingIndicator from './components/TypingIndicator';
import ChatInput from './components/ChatInput';
import StickyQuickActions from './components/StickyQuickActions';
import EmojiReactions from './components/EmojiReactions';
import { incrementView, subscribeToStats } from './services/analyticsService';

export default function App() {
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

  const [viewCount, setViewCount] = useState(0);

  // Increment view on first load & subscribe to stats
  useEffect(() => {
    incrementView();
    const unsub = subscribeToStats((data) => {
      setViewCount(data.views || 0);
    });
    return unsub;
  }, []);

  return (
    <div className="min-h-screen bg-black text-gray-200 font-mono p-2 sm:p-4 md:p-8 flex items-center justify-center selection:bg-green-500/30 selection:text-green-200 overflow-hidden">

      <BackgroundDecor />

      {/* Main Terminal Window */}
      <div className="relative z-10 w-full max-w-5xl h-[100dvh] sm:h-[92vh] md:h-[85vh] bg-gray-950/90 backdrop-blur-md sm:rounded-lg border border-gray-800 shadow-2xl flex flex-col overflow-hidden ring-1 ring-white/10">

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