import React, { useState, useEffect } from 'react';
import { Zap } from 'lucide-react';
import { resumeData } from '../data/resumeData';

const CATEGORY_CONFIG = {
    core: { label: 'Core Stack', color: 'green', barBg: 'bg-green-500', borderColor: 'border-green-500/30', textColor: 'text-green-400', glowColor: 'shadow-green-500/20' },
    web: { label: 'Web Technologies', color: 'blue', barBg: 'bg-blue-500', borderColor: 'border-blue-500/30', textColor: 'text-blue-400', glowColor: 'shadow-blue-500/20' },
    tools: { label: 'Tools & Methodologies', color: 'purple', barBg: 'bg-purple-500', borderColor: 'border-purple-500/30', textColor: 'text-purple-400', glowColor: 'shadow-purple-500/20' },
};

const SkillBar = ({ skill, index, animate }) => {
    const config = CATEGORY_CONFIG[skill.category];
    const [hovered, setHovered] = useState(false);

    return (
        <div
            className="group mb-2.5 last:mb-0"
            style={{ animationDelay: `${index * 80}ms` }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div className="flex items-center justify-between mb-1">
                <span className={`text-xs font-mono ${hovered ? config.textColor : 'text-gray-400'} transition-colors`}>
                    {skill.name}
                </span>
                <span className={`text-[10px] font-mono font-bold ${config.textColor} transition-all ${hovered ? 'opacity-100 scale-110' : 'opacity-70 scale-100'}`}>
                    {skill.level}%
                </span>
            </div>
            <div className="h-2.5 bg-gray-800/80 rounded-full overflow-hidden border border-gray-700/50">
                <div
                    className={`h-full rounded-full ${config.barBg} transition-all duration-1000 ease-out relative`}
                    style={{
                        width: animate ? `${skill.level}%` : '0%',
                        transitionDelay: `${index * 80}ms`,
                        boxShadow: hovered ? `0 0 12px rgba(var(--${config.color}-rgb, 34,197,94), 0.4)` : 'none',
                    }}
                >
                    {/* Shimmer */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
            </div>
        </div>
    );
};

const SkillRadar = () => {
    const [animate, setAnimate] = useState(false);
    const [activeCategory, setActiveCategory] = useState('all');

    useEffect(() => {
        const timer = setTimeout(() => setAnimate(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const skills = activeCategory === 'all'
        ? resumeData.skillProficiency
        : resumeData.skillProficiency.filter(s => s.category === activeCategory);

    const avgProficiency = Math.round(
        resumeData.skillProficiency.reduce((sum, s) => sum + s.level, 0) / resumeData.skillProficiency.length
    );

    return (
        <div className="mt-4 max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="border border-green-500/20 bg-gray-950/90 backdrop-blur-sm rounded-xl overflow-hidden">
                {/* Header */}
                <div className="p-4 border-b border-gray-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Zap size={16} className="text-yellow-400" />
                        <span className="text-sm font-mono font-bold text-gray-200">Skill Proficiency Chart</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-gray-500">AVG</span>
                        <div className="px-2 py-0.5 bg-green-900/30 rounded text-xs font-mono font-bold text-green-400">
                            {avgProficiency}%
                        </div>
                    </div>
                </div>

                {/* Category Filters */}
                <div className="px-4 pt-3 flex flex-wrap gap-2">
                    {[
                        { key: 'all', label: 'All Skills' },
                        ...Object.entries(CATEGORY_CONFIG).map(([key, val]) => ({ key, label: val.label })),
                    ].map((cat) => (
                        <button
                            key={cat.key}
                            onClick={() => setActiveCategory(cat.key)}
                            className={`px-3 py-1 text-[10px] font-mono rounded-full border transition-all uppercase tracking-wider ${activeCategory === cat.key
                                    ? 'bg-green-500/20 border-green-500/50 text-green-400'
                                    : 'bg-gray-900 border-gray-700 text-gray-500 hover:border-gray-600 hover:text-gray-400'
                                }`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* Skill Bars */}
                <div className="p-4">
                    {skills.map((skill, i) => (
                        <SkillBar key={skill.name} skill={skill} index={i} animate={animate} />
                    ))}
                </div>

                {/* Legend */}
                <div className="px-4 pb-3 flex flex-wrap gap-4">
                    {Object.entries(CATEGORY_CONFIG).map(([key, config]) => (
                        <div key={key} className="flex items-center gap-1.5">
                            <div className={`w-2.5 h-2.5 rounded-sm ${config.barBg}`} />
                            <span className="text-[10px] font-mono text-gray-500">{config.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default React.memo(SkillRadar);
