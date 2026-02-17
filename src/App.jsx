import React from 'react';
import { useChatbot } from './hooks/useChatbot';
import BackgroundDecor from './components/BackgroundDecor';
import TerminalHeader from './components/TerminalHeader';
import ChatMessage from './components/ChatMessage';
import TypingIndicator from './components/TypingIndicator';
import ChatInput from './components/ChatInput';

export default function App() {
  const {
    input,
    setInput,
    messages,
    isBotTyping,
    aiMode,
    scrollRef,
    inputRef,
    handleCommand,
    handleSubmit,
  } = useChatbot();

  return (
    <div className="min-h-screen bg-black text-gray-200 font-mono p-4 md:p-8 flex items-center justify-center selection:bg-green-500/30 selection:text-green-200 overflow-hidden">

      <BackgroundDecor />

      {/* Main Terminal Window */}
      <div className="relative z-10 w-full max-w-5xl h-[85vh] bg-gray-950/90 backdrop-blur-md rounded-lg border border-gray-800 shadow-2xl flex flex-col overflow-hidden ring-1 ring-white/10">

        <TerminalHeader aiMode={aiMode} />

        {/* Chat Area */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-4 md:p-6 scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent space-y-6"
        >
          {messages.map((msg) => (
            <ChatMessage key={msg.id} msg={msg} onCommand={handleCommand} />
          ))}

          {isBotTyping && <TypingIndicator />}
        </div>

        <ChatInput
          ref={inputRef}
          input={input}
          onInputChange={setInput}
          onSubmit={handleSubmit}
          aiMode={aiMode}
        />
      </div>
    </div>
  );
}