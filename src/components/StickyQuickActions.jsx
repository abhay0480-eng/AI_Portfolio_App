import React, { useState } from 'react';
import { ChevronUp, ChevronDown, Zap } from 'lucide-react';

const QUICK_ACTIONS = [
    { label: 'Projects', cmd: 'projects', emoji: '📂' },
    { label: 'Experience', cmd: 'experience', emoji: '💼' },
    { label: 'Skills', cmd: 'skills', emoji: '⚡' },
    { label: 'Contact', cmd: 'contact', emoji: '📧' },
    { label: 'Highlights', cmd: 'highlights', emoji: '🏆' },
    { label: 'Resume', cmd: 'resume', emoji: '📄' },
    { label: 'HR Profile', cmd: 'profile card', emoji: '👤' },
    { label: 'Skill Chart', cmd: 'skill chart', emoji: '📊' },
    { label: 'Timeline', cmd: 'timeline', emoji: '🗂️' },
    { label: 'Evaluate', cmd: 'evaluate', emoji: '🎯' },
    { label: 'Full Resume', cmd: 'full resume', emoji: '📋' },
];

const StickyQuickActions = ({ onCommand }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="border-t border-gray-800 bg-gray-900/80 backdrop-blur-sm">
            {/* Toggle Bar */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full flex items-center justify-between px-4 py-2 hover:bg-gray-800/50 transition-colors group"
            >
                <div className="flex items-center gap-2 text-[10px] font-mono text-gray-500 uppercase tracking-wider">
                    <Zap size={10} className="text-green-500" />
                    <span>Quick Actions</span>
                    <span className="text-gray-700">({QUICK_ACTIONS.length})</span>
                </div>
                <div className={`text-gray-600 group-hover:text-green-400 transition-all ${isExpanded ? '' : 'animate-bounce'}`}>
                    {isExpanded ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
                </div>
            </button>

            {/* Expandable Actions Panel */}
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className="px-3 pb-3 flex flex-wrap gap-1.5">
                    {QUICK_ACTIONS.map((action) => (
                        <button
                            key={action.cmd}
                            onClick={() => {
                                onCommand(action.cmd);
                                setIsExpanded(false);
                            }}
                            className="px-2.5 py-1.5 text-[11px] font-mono text-green-400 border border-green-500/30 rounded-md bg-green-900/10 hover:bg-green-500/20 hover:text-green-300 hover:border-green-400/50 transition-all active:scale-95 flex items-center gap-1.5"
                        >
                            <span>{action.emoji}</span>
                            <span>{action.label}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default React.memo(StickyQuickActions);
