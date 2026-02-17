import React from 'react';
import { Terminal, Sparkles } from 'lucide-react';

const TerminalHeader = ({ aiMode = false }) => (
    <div className="h-10 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-4 select-none">
        <div className="flex items-center gap-2 text-green-500">
            <Terminal size={16} />
            <span className="text-xs font-bold tracking-widest opacity-80">ABHAY_OS_TERMINAL -- BASH</span>
        </div>
        <div className="flex items-center gap-3">
            {/* AI Mode Indicator */}
            <div className="flex items-center gap-1.5">
                {aiMode ? (
                    <>
                        <Sparkles size={12} className="text-yellow-400 animate-pulse" />
                        <span className="text-[10px] font-mono text-yellow-400 tracking-wider">AI MODE</span>
                    </>
                ) : (
                    <>
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-500"></div>
                        <span className="text-[10px] font-mono text-gray-500 tracking-wider">OFFLINE</span>
                    </>
                )}
            </div>
            <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
            </div>
        </div>
    </div>
);

export default React.memo(TerminalHeader);
