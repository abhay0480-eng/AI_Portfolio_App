import React from 'react';
import { Terminal, Sparkles, Eye } from 'lucide-react';
import ThemeSwitcher from './ThemeSwitcher';

const TerminalHeader = ({ aiMode = false, sarvamMode = false, viewCount = 0, onCloseApp }) => (
    <div className="h-9 sm:h-10 bg-theme-panel border-b border-theme flex items-center justify-between px-3 sm:px-4 select-none shrink-0 transition-colors duration-300">
        <div className="flex items-center gap-1.5 sm:gap-2 text-theme-primary transition-colors duration-300">
            <Terminal size={14} className="sm:w-4 sm:h-4" />
            <span className="text-[10px] sm:text-xs font-bold tracking-widest opacity-80">
                <span className="hidden sm:inline">ABHAY_OS_TERMINAL -- BASH</span>
                <span className="sm:hidden">ABHAY_OS</span>
            </span>
        </div>
        <div className="flex items-center gap-3 sm:gap-4">
            <ThemeSwitcher />

            <div className="flex items-center gap-2 sm:gap-3">
                {/* View Counter */}
                {viewCount > 0 && (
                    <div className="flex items-center gap-1 text-theme-muted transition-colors duration-300">
                        <Eye size={10} />
                        <span className="text-[9px] sm:text-[10px] font-mono">{viewCount}</span>
                    </div>
                )}

                {/* AI Mode Indicator */}
                <div className="flex items-center gap-1 sm:gap-1.5 hide-on-mobile">
                    {sarvamMode ? (
                        <>
                            <span className="text-xs sm:text-sm">🇮🇳</span>
                            <span className="text-[9px] sm:text-[10px] font-mono text-orange-400 tracking-wider">SARVAM</span>
                        </>
                    ) : aiMode ? (
                        <>
                            <Sparkles size={10} className="text-yellow-400 animate-pulse sm:w-3 sm:h-3" />
                            <span className="text-[9px] sm:text-[10px] font-mono text-yellow-400 tracking-wider">AI</span>
                        </>
                    ) : (
                        <>
                            <div className="w-1.5 h-1.5 rounded-full bg-gray-500"></div>
                            <span className="text-[9px] sm:text-[10px] font-mono text-gray-500 tracking-wider">OFFLINE</span>
                        </>
                    )}
                </div>
                <div className="flex gap-1 sm:gap-1.5 ml-1">
                    <button
                        onClick={onCloseApp}
                        className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/50 hover:bg-red-500 transition-colors cursor-pointer"
                        title="Close Session"
                    ></button>
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/50"></div>
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500/50"></div>
                </div>
            </div>
        </div>
    </div>
);

export default React.memo(TerminalHeader);
