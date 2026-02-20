import React, { useState } from 'react';
import { Target, CheckCircle, Copy, Check, Star, Zap, Users, Award } from 'lucide-react';
import { resumeData } from '../data/resumeData';

const FitBadge = ({ label, score, icon }) => {
    const getColor = (s) => {
        if (s >= 90) return { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-400', barBg: 'bg-green-500' };
        if (s >= 75) return { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400', barBg: 'bg-blue-500' };
        return { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400', barBg: 'bg-amber-500' };
    };
    const color = getColor(score);

    return (
        <div className={`${color.bg} border ${color.border} rounded-lg p-3 text-center`}>
            <div className={`flex justify-center mb-1.5 ${color.text}`}>{icon}</div>
            <p className={`text-xl font-bold font-mono ${color.text}`}>{score}%</p>
            <p className="text-[10px] text-gray-500 uppercase tracking-wider mt-0.5">{label}</p>
            <div className="mt-2 h-1 bg-gray-800 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${color.barBg} transition-all duration-1000`} style={{ width: `${score}%` }} />
            </div>
        </div>
    );
};

const CandidateSnapshot = () => {
    const [copied, setCopied] = useState(false);
    const { profile, experience, strengths, idealRoles, availability, education } = resumeData;

    const handleExport = () => {
        const summary = `
═══════════════════════════════════════
  CANDIDATE EVALUATION SUMMARY
═══════════════════════════════════════

Name:         ${profile.name}
Role:         ${profile.role}
Location:     ${profile.location}
Email:        ${profile.email}

AVAILABILITY
Status:       ${availability.label}
Notice:       ${availability.noticePeriod}
Work Mode:    ${availability.workMode.join(', ')}

FIT SCORES
Experience:   92% — ${experience.length} companies, 3+ years
Skills:       88% — React, Redux, TypeScript, Next.js
Availability: 95% — ${availability.noticePeriod}

KEY STRENGTHS
${strengths.map(s => `  ✓ ${s}`).join('\n')}

IDEAL FOR
${idealRoles.map(r => `  • ${r}`).join('\n')}

EDUCATION
${education.degree} — ${education.school} (${education.period})

LinkedIn: ${profile.social.linkedin}
GitHub:   ${profile.social.github}
═══════════════════════════════════════
`.trim();

        navigator.clipboard.writeText(summary);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
    };

    return (
        <div className="mt-4 max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="border border-green-500/20 bg-gray-950/90 backdrop-blur-sm rounded-xl overflow-hidden">
                {/* Header */}
                <div className="p-4 border-b border-gray-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Target size={16} className="text-green-400" />
                        <span className="text-sm font-mono font-bold text-gray-200">Candidate Evaluation</span>
                    </div>
                    <div className="px-2.5 py-1 bg-green-500/10 border border-green-500/30 rounded-full">
                        <span className="text-[10px] font-mono text-green-400 uppercase tracking-wider">
                            Strong Match
                        </span>
                    </div>
                </div>

                {/* Fit Scores */}
                <div className="p-4 grid grid-cols-3 gap-3">
                    <FitBadge label="Experience" score={92} icon={<Star size={18} />} />
                    <FitBadge label="Skills" score={88} icon={<Zap size={18} />} />
                    <FitBadge label="Availability" score={95} icon={<Users size={18} />} />
                </div>

                {/* Key Strengths */}
                <div className="px-4 pb-4">
                    <p className="text-[10px] font-mono text-green-600 uppercase tracking-wider mb-2">Key Strengths</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        {strengths.map((s) => (
                            <div key={s} className="flex items-start gap-2 text-xs text-gray-400 font-mono">
                                <CheckCircle size={12} className="text-green-500 flex-shrink-0 mt-0.5" />
                                <span>{s}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Ideal For Tags */}
                <div className="px-4 pb-4">
                    <p className="text-[10px] font-mono text-blue-600 uppercase tracking-wider mb-2">Ideal For</p>
                    <div className="flex flex-wrap gap-2">
                        {idealRoles.map((role) => (
                            <span
                                key={role}
                                className="px-3 py-1.5 text-[11px] font-mono border border-blue-500/30 bg-blue-900/10 rounded-lg text-blue-400 hover:bg-blue-500/20 transition-colors cursor-default"
                            >
                                <Award size={10} className="inline mr-1.5 -mt-0.5" />
                                {role}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Education */}
                <div className="px-4 pb-4">
                    <p className="text-[10px] font-mono text-purple-600 uppercase tracking-wider mb-1">Education</p>
                    <p className="text-xs text-gray-400 font-mono">
                        🎓 {education.degree} — {education.school} ({education.period})
                    </p>
                </div>

                {/* Export Button */}
                <div className="p-4 border-t border-gray-800 flex items-center justify-between">
                    <p className="text-[10px] text-gray-600 font-mono">
                        Assessment generated by AbhayOS
                    </p>
                    <button
                        onClick={handleExport}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-medium transition-all ${copied
                                ? 'bg-green-500/20 text-green-400 border border-green-500/40'
                                : 'bg-gray-900 text-gray-400 border border-gray-700 hover:border-green-500/40 hover:text-green-400'
                            }`}
                    >
                        {copied ? <Check size={14} /> : <Copy size={14} />}
                        {copied ? 'Exported!' : 'Export Summary'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default React.memo(CandidateSnapshot);
