import React, { forwardRef } from 'react';
import { Send } from 'lucide-react';

const ChatInput = forwardRef(({ input, onInputChange, onSubmit, aiMode = false, sarvamMode = false }, ref) => (
    <div className="p-3 sm:p-4 bg-theme-panel/50 border-t border-theme transition-colors duration-300">
        <form onSubmit={onSubmit} className="relative flex items-center group">
            <span className="absolute left-3 text-theme-primary font-bold font-mono text-xs sm:text-sm pointer-events-none select-none transition-colors duration-300">
                guest@abhay:~$
            </span>
            <input
                ref={ref}
                type="text"
                value={input}
                onChange={(e) => onInputChange(e.target.value)}
                placeholder={
                    sarvamMode
                        ? "Hindi, Tamil, Telugu... any language!"
                        : aiMode
                            ? "Ask me anything about Abhay..."
                            : "Type 'help' for commands..."
                }
                className="w-full bg-theme-base border border-theme text-theme-primary font-mono text-xs sm:text-sm rounded-md py-2.5 sm:py-3 pl-32 sm:pl-36 pr-11 sm:pr-12 focus:outline-none focus:border-theme focus:ring-1 focus:ring-theme transition-colors duration-300 shadow-inner"
                autoComplete="off"
            />
            <button
                type="submit"
                className="absolute right-2 p-1.5 bg-theme-panel text-theme-primary rounded hover:bg-theme-primary hover:text-black transition-colors active:scale-90 opacity-80 hover:opacity-100"
                disabled={!input.trim()}
            >
                <Send size={16} />
            </button>
        </form>
        <div className="mt-1.5 sm:mt-2 flex justify-between px-1">
            <div className="text-[9px] sm:text-[10px] text-gray-600 font-mono">
                Status: <span className="text-green-500">ON</span> | AI:{' '}
                {sarvamMode ? (
                    <span className="text-orange-400">SARVAM 🇮🇳</span>
                ) : aiMode ? (
                    <span className="text-yellow-400">GROQ</span>
                ) : (
                    <span className="text-gray-500">OFF</span>
                )}
            </div>
            <div className="text-[9px] sm:text-[10px] text-gray-600 font-mono">
                {sarvamMode
                    ? "Multilingual • Free"
                    : aiMode
                        ? "Ask naturally"
                        : "Enter to execute"}
            </div>
        </div>
    </div>
));

ChatInput.displayName = 'ChatInput';

export default React.memo(ChatInput);
