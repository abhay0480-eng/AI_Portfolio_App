import React, { forwardRef } from 'react';
import { Send } from 'lucide-react';

const ChatInput = forwardRef(({ input, onInputChange, onSubmit, aiMode = false }, ref) => (
    <div className="p-4 bg-gray-900/50 border-t border-gray-800">
        <form onSubmit={onSubmit} className="relative flex items-center group">
            <span className="absolute left-3 text-green-500 font-bold font-mono text-sm pointer-events-none select-none">
                guest@abhay:~$
            </span>
            <input
                ref={ref}
                type="text"
                value={input}
                onChange={(e) => onInputChange(e.target.value)}
                placeholder={aiMode ? "Ask me anything about Abhay..." : "Type 'help' for commands..."}
                className="w-full bg-gray-950 border border-gray-700 text-green-400 font-mono text-sm rounded-md py-3 pl-36 pr-12 focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/20 transition-all shadow-inner"
                autoComplete="off"
            />
            <button
                type="submit"
                className="absolute right-2 p-1.5 bg-green-900/20 text-green-500 rounded hover:bg-green-500 hover:text-black transition-colors"
                disabled={!input.trim()}
            >
                <Send size={16} />
            </button>
        </form>
        <div className="mt-2 flex justify-between px-1">
            <div className="text-[10px] text-gray-600 font-mono">
                System Status: <span className="text-green-500">ONLINE</span> | AI:{' '}
                {aiMode ? (
                    <span className="text-yellow-400">GEMINI</span>
                ) : (
                    <span className="text-gray-500">OFFLINE</span>
                )}
            </div>
            <div className="text-[10px] text-gray-600 font-mono hidden sm:block">
                {aiMode ? "Ask naturally or use commands" : "Press 'Enter' to execute"}
            </div>
        </div>
    </div>
));

ChatInput.displayName = 'ChatInput';

export default React.memo(ChatInput);
