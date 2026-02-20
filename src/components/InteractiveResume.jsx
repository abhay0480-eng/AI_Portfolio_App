import React, { useState } from 'react';
import { FileText, Briefcase, Code2, FolderGit2, GraduationCap, Download, ChevronRight } from 'lucide-react';
import { resumeData } from '../data/resumeData';

const TABS = [
    { id: 'summary', label: 'Summary', icon: <FileText size={14} /> },
    { id: 'experience', label: 'Experience', icon: <Briefcase size={14} /> },
    { id: 'skills', label: 'Skills', icon: <Code2 size={14} /> },
    { id: 'projects', label: 'Projects', icon: <FolderGit2 size={14} /> },
    { id: 'education', label: 'Education', icon: <GraduationCap size={14} /> },
];

const TabContent = ({ tabId }) => {
    const { profile, experience, skills, skillProficiency, projects, education, strengths } = resumeData;

    switch (tabId) {
        case 'summary':
            return (
                <div className="space-y-4">
                    <div className="border-l-2 border-green-500/40 pl-4">
                        <h3 className="text-green-300 font-bold text-lg mb-1">{profile.name}</h3>
                        <p className="text-green-500 text-sm font-mono">{profile.role}</p>
                        <p className="text-gray-500 text-xs mt-1">📍 {profile.location} • ✉️ {profile.email}</p>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed font-mono">{profile.summary}</p>
                    <div>
                        <p className="text-[10px] text-green-600 uppercase tracking-wider mb-2">Notable Achievements</p>
                        {strengths.map((s) => (
                            <div key={s} className="flex items-center gap-2 text-xs text-gray-400 font-mono mb-1.5">
                                <ChevronRight size={10} className="text-green-500" />
                                <span>{s}</span>
                            </div>
                        ))}
                    </div>
                </div>
            );

        case 'experience':
            return (
                <div className="space-y-5">
                    {experience.map((job, i) => (
                        <div key={job.id} className="relative">
                            {i < experience.length - 1 && (
                                <div className="absolute left-[7px] top-8 bottom-0 w-px bg-gray-800" />
                            )}
                            <div className="flex items-start gap-3">
                                <div className="w-4 h-4 rounded-full bg-green-500/20 border border-green-500/50 flex-shrink-0 mt-1 flex items-center justify-center">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-1">
                                        <h4 className="text-white font-bold text-sm">{job.role}</h4>
                                        <span className="text-gray-600 text-[10px] font-mono">{job.period}</span>
                                    </div>
                                    <p className="text-green-500 text-xs font-mono mb-1">{job.company} — {job.loc}</p>
                                    <p className="text-gray-500 text-xs font-mono leading-relaxed">{job.desc}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            );

        case 'skills':
            return (
                <div className="space-y-5">
                    {Object.entries(skills).map(([category, skillList]) => {
                        const labels = { core: 'Core Stack', web: 'Web Technologies', tools: 'Tools & Methodologies' };
                        const colors = { core: 'green', web: 'blue', tools: 'purple' };
                        const color = colors[category] || 'green';
                        return (
                            <div key={category}>
                                <p className={`text-[10px] text-${color}-600 uppercase tracking-wider mb-2`}>{labels[category]}</p>
                                <div className="grid grid-cols-2 gap-2">
                                    {skillList.map((s) => {
                                        const prof = skillProficiency.find(sp => sp.name === s || sp.name.includes(s));
                                        return (
                                            <div key={s} className="flex items-center justify-between bg-gray-900 border border-gray-800 rounded-lg px-3 py-2">
                                                <span className="text-xs font-mono text-gray-300">{s}</span>
                                                {prof && (
                                                    <span className={`text-[10px] font-mono font-bold text-${color}-400`}>
                                                        {prof.level}%
                                                    </span>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            );

        case 'projects':
            return (
                <div className="space-y-4">
                    {projects.map((p) => (
                        <div key={p.id} className="bg-gray-900 border border-gray-800 rounded-lg p-4 hover:border-green-500/30 transition-colors">
                            <div className="flex items-start justify-between mb-2">
                                <h4 className="text-green-300 font-bold text-sm">{p.title}</h4>
                                <FolderGit2 size={14} className="text-green-600 flex-shrink-0" />
                            </div>
                            <p className="text-gray-500 text-xs font-mono mb-3">{p.desc}</p>
                            <div className="flex flex-wrap gap-1.5">
                                {p.stack.split(', ').map((tech) => (
                                    <span key={tech} className="text-[10px] text-green-500 bg-green-950 px-2 py-0.5 rounded border border-green-900 font-mono">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            );

        case 'education':
            return (
                <div className="space-y-4">
                    <div className="bg-gray-900 border border-gray-800 rounded-lg p-5">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center flex-shrink-0">
                                <GraduationCap size={22} className="text-purple-400" />
                            </div>
                            <div>
                                <h4 className="text-white font-bold text-sm">{education.degree}</h4>
                                <p className="text-purple-400 text-xs font-mono mt-0.5">{education.school}</p>
                                <p className="text-gray-600 text-[10px] font-mono mt-1">{education.period}</p>
                            </div>
                        </div>
                    </div>
                </div>
            );

        default:
            return null;
    }
};

const InteractiveResume = () => {
    const [activeTab, setActiveTab] = useState('summary');

    return (
        <div className="mt-4 max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="border border-green-500/20 bg-gray-950/90 backdrop-blur-sm rounded-xl overflow-hidden">
                {/* Tab Bar */}
                <div className="border-b border-gray-800 flex overflow-x-auto scrollbar-none">
                    {TABS.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-1.5 px-4 py-3 text-xs font-mono whitespace-nowrap transition-all relative ${activeTab === tab.id
                                    ? 'text-green-400 bg-green-500/5'
                                    : 'text-gray-500 hover:text-gray-300 hover:bg-gray-900'
                                }`}
                        >
                            {tab.icon}
                            <span className="hidden sm:inline">{tab.label}</span>
                            {/* Active indicator */}
                            {activeTab === tab.id && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-500 shadow-lg shadow-green-500/30" />
                            )}
                        </button>
                    ))}

                    {/* Download button on the right */}
                    <div className="ml-auto flex items-center px-3">
                        <a
                            href="/resume.pdf"
                            download="Abhay_Kumar_Resume.pdf"
                            className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-mono text-green-400 border border-green-500/30 rounded-lg bg-green-900/10 hover:bg-green-500/20 transition-all"
                        >
                            <Download size={12} />
                            <span className="hidden sm:inline">PDF</span>
                        </a>
                    </div>
                </div>

                {/* Tab Content */}
                <div className="p-5 min-h-[200px]">
                    <TabContent tabId={activeTab} />
                </div>
            </div>
        </div>
    );
};

export default React.memo(InteractiveResume);
