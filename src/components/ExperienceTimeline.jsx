import React, { useState } from 'react';
import { Briefcase, MapPin, ChevronDown, ChevronUp, TrendingUp } from 'lucide-react';
import { resumeData } from '../data/resumeData';

const ROLE_COLORS = [
    { bg: 'bg-green-500', border: 'border-green-500', text: 'text-green-400', glow: 'shadow-green-500/30', bgLight: 'bg-green-500/10' },
    { bg: 'bg-blue-500', border: 'border-blue-500', text: 'text-blue-400', glow: 'shadow-blue-500/30', bgLight: 'bg-blue-500/10' },
    { bg: 'bg-purple-500', border: 'border-purple-500', text: 'text-purple-400', glow: 'shadow-purple-500/30', bgLight: 'bg-purple-500/10' },
    { bg: 'bg-amber-500', border: 'border-amber-500', text: 'text-amber-400', glow: 'shadow-amber-500/30', bgLight: 'bg-amber-500/10' },
];

const TimelineNode = ({ job, index, isActive, onToggle, color }) => {
    return (
        <div className="relative flex-shrink-0 group" style={{ minWidth: '260px', maxWidth: '300px' }}>
            {/* Connecting line */}
            {index < resumeData.experience.length - 1 && (
                <div className="absolute top-6 left-[calc(50%+20px)] w-[calc(100%-40px)] h-0.5 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 z-0">
                    <div
                        className={`h-full ${color.bg} transition-all duration-700`}
                        style={{ width: isActive ? '100%' : '0%' }}
                    />
                </div>
            )}

            {/* Node dot */}
            <div className="flex justify-center mb-3 relative z-10">
                <button
                    onClick={onToggle}
                    className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${isActive
                            ? `${color.border} ${color.bgLight} shadow-lg ${color.glow}`
                            : 'border-gray-700 bg-gray-900 hover:border-gray-500'
                        }`}
                >
                    <Briefcase size={18} className={isActive ? color.text : 'text-gray-500'} />
                </button>
            </div>

            {/* Period Label */}
            <div className="text-center mb-2">
                <span className={`text-[10px] font-mono ${color.text} uppercase tracking-wider`}>
                    {job.period}
                </span>
            </div>

            {/* Card */}
            <div
                className={`border rounded-xl p-4 transition-all duration-300 cursor-pointer ${isActive
                        ? `${color.border}/30 bg-gray-900 shadow-lg ${color.glow}`
                        : 'border-gray-800 bg-gray-950 hover:border-gray-700'
                    }`}
                onClick={onToggle}
            >
                <div className="flex items-start justify-between mb-2">
                    <h3 className={`font-bold text-sm ${isActive ? 'text-white' : 'text-gray-400'} transition-colors`}>
                        {job.role}
                    </h3>
                    {isActive ? (
                        <ChevronUp size={14} className="text-gray-500 flex-shrink-0 mt-0.5" />
                    ) : (
                        <ChevronDown size={14} className="text-gray-500 flex-shrink-0 mt-0.5" />
                    )}
                </div>

                <div className={`flex items-center gap-1 text-xs ${color.text} font-mono mb-2`}>
                    <Briefcase size={10} />
                    <span>{job.company}</span>
                </div>

                <div className="flex items-center gap-1 text-[10px] text-gray-600 mb-2">
                    <MapPin size={10} />
                    <span>{job.loc}</span>
                </div>

                {/* Expandable Description */}
                <div
                    className={`overflow-hidden transition-all duration-300 ${isActive ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'
                        }`}
                >
                    <div className="border-t border-gray-800 pt-2">
                        <p className="text-gray-400 text-xs leading-relaxed font-mono">{job.desc}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ExperienceTimeline = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="mt-4 max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="border border-green-500/20 bg-gray-950/90 backdrop-blur-sm rounded-xl overflow-hidden">
                {/* Header */}
                <div className="p-4 border-b border-gray-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <TrendingUp size={16} className="text-green-400" />
                        <span className="text-sm font-mono font-bold text-gray-200">Career Progression</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-gray-500">
                            {resumeData.experience.length} ROLES
                        </span>
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    </div>
                </div>

                {/* Scrollable Timeline */}
                <div className="p-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent">
                    <div className="flex gap-6 pb-2" style={{ minWidth: 'max-content' }}>
                        {resumeData.experience.map((job, i) => (
                            <TimelineNode
                                key={job.id}
                                job={job}
                                index={i}
                                isActive={activeIndex === i}
                                onToggle={() => setActiveIndex(activeIndex === i ? -1 : i)}
                                color={ROLE_COLORS[i % ROLE_COLORS.length]}
                            />
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="px-4 pb-3 flex items-center gap-2 text-[10px] text-gray-600 font-mono">
                    <span>← Scroll to explore</span>
                    <span>•</span>
                    <span>Click nodes to expand details</span>
                </div>
            </div>
        </div>
    );
};

export default React.memo(ExperienceTimeline);
