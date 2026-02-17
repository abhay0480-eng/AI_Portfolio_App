import React from 'react';
import { ChevronRight, Mail, Linkedin, Github, Download, TrendingUp, Zap, Award, Clock } from 'lucide-react';
import { resumeData } from '../data/resumeData';
import SkillTag from './SkillTag';
import ProjectCard from './ProjectCard';
import ExperienceCard from './ExperienceCard';

// --- Dynamic widget config map ---
const widgetMap = {
    projects: () => (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 w-full max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            {resumeData.projects.map((p) => (
                <ProjectCard key={p.id} project={p} />
            ))}
        </div>
    ),

    experience: () => (
        <div className="mt-4 max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            {resumeData.experience.map((job) => (
                <ExperienceCard key={job.id} job={job} />
            ))}
        </div>
    ),

    skills: () => (
        <div className="mt-4 p-4 border border-green-500/20 bg-green-900/10 rounded max-w-xl animate-in fade-in zoom-in-95 duration-500">
            {Object.entries(resumeData.skills).map(([category, skills]) => {
                const labels = { core: 'Core Stack', web: 'Web Technologies', tools: 'Tools & Methodologies' };
                return (
                    <div key={category} className="mb-4 last:mb-0">
                        <p className="text-xs text-green-600 mb-2 uppercase tracking-wider">
                            {labels[category] || category}
                        </p>
                        {skills.map((s) => (
                            <SkillTag key={s} skill={s} />
                        ))}
                    </div>
                );
            })}
        </div>
    ),

    contact: () => {
        const contactLinks = [
            {
                href: `mailto:${resumeData.profile.email}`,
                icon: <Mail className="text-green-500 group-hover:scale-110 transition-transform" size={20} />,
                label: 'Email',
                value: resumeData.profile.email,
                valueClass: 'text-green-300',
            },
            {
                href: resumeData.profile.social.linkedin,
                icon: <Linkedin className="text-blue-400 group-hover:scale-110 transition-transform" size={20} />,
                label: 'LinkedIn',
                value: 'Connect Profile',
                valueClass: 'text-blue-300',
                external: true,
            },
            {
                href: resumeData.profile.social.github,
                icon: <Github className="text-white group-hover:scale-110 transition-transform" size={20} />,
                label: 'GitHub',
                value: 'Code Repos',
                valueClass: 'text-gray-200',
                external: true,
            },
        ];

        return (
            <div className="mt-4 flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {contactLinks.map((link) => (
                    <a
                        key={link.label}
                        href={link.href}
                        {...(link.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                        className="flex items-center gap-3 p-3 bg-gray-800 rounded hover:bg-gray-700 transition border border-gray-700 hover:border-green-500 group"
                    >
                        {link.icon}
                        <div className="text-sm">
                            <p className="text-gray-400 text-xs">{link.label}</p>
                            <p className={`${link.valueClass} font-mono`}>{link.value}</p>
                        </div>
                    </a>
                ))}
            </div>
        );
    },

    'quick-actions': ({ onCommand }) => {
        const actions = [
            { label: 'View Projects', cmd: 'projects' },
            { label: 'Experience Logs', cmd: 'experience' },
            { label: 'Tech Stack', cmd: 'skills' },
            { label: 'Contact Info', cmd: 'contact' },
            { label: 'Key Highlights', cmd: 'highlights' },
            { label: 'Download Resume', cmd: 'resume' },
        ];

        return (
            <div className="flex flex-wrap gap-2 mt-3 animate-in fade-in duration-700">
                {actions.map((action) => (
                    <button
                        key={action.cmd}
                        onClick={() => onCommand(action.cmd)}
                        className="px-3 py-1.5 text-xs font-mono text-green-400 border border-green-500/50 rounded bg-green-900/10 hover:bg-green-500/20 hover:text-green-300 transition-all flex items-center gap-2"
                    >
                        <ChevronRight size={12} />
                        {action.label}
                    </button>
                ))}
            </div>
        );
    },

    profile: () => (
        <div className="mt-4 p-4 border border-green-500/20 bg-green-900/10 rounded max-w-xl animate-in fade-in zoom-in-95 duration-500">
            <p className="text-green-100 text-sm font-mono leading-relaxed">{resumeData.profile.summary}</p>
            <div className="mt-3 text-xs text-gray-500 font-mono">
                <p>📍 {resumeData.profile.location}</p>
                <p>🎓 {resumeData.education.degree} — {resumeData.education.school} ({resumeData.education.period})</p>
            </div>
        </div>
    ),

    // --- NEW: Key Highlights / Achievement Stats ---
    highlights: () => {
        const stats = [
            { icon: <Clock size={20} />, value: '3+', label: 'Years Experience', color: 'text-green-400' },
            { icon: <Zap size={20} />, value: '30%', label: 'Load Speed Boost', color: 'text-yellow-400' },
            { icon: <Award size={20} />, value: '90+', label: 'Lighthouse Score', color: 'text-blue-400' },
            { icon: <TrendingUp size={20} />, value: '40%', label: 'Dev Time Saved', color: 'text-purple-400' },
        ];

        return (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 max-w-2xl animate-in fade-in zoom-in-95 duration-500">
                {stats.map((stat) => (
                    <div
                        key={stat.label}
                        className="bg-gray-900 border border-gray-700 rounded-lg p-4 text-center hover:border-green-500/50 transition-all group"
                    >
                        <div className={`${stat.color} flex justify-center mb-2 group-hover:scale-110 transition-transform`}>
                            {stat.icon}
                        </div>
                        <p className={`text-2xl font-bold ${stat.color} font-mono`}>{stat.value}</p>
                        <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-wider">{stat.label}</p>
                    </div>
                ))}
            </div>
        );
    },

    // --- NEW: Resume Download ---
    'resume-download': () => (
        <div className="mt-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <a
                href="/resume.pdf"
                download="Abhay_Kumar_Resume.pdf"
                className="inline-flex items-center gap-3 px-6 py-3 bg-green-900/30 text-green-400 border border-green-500/50 rounded-lg hover:bg-green-500 hover:text-black transition-all font-mono text-sm font-bold group"
            >
                <Download size={18} className="group-hover:animate-bounce" />
                Download Resume (PDF)
            </a>
            <p className="text-[10px] text-gray-600 mt-2 font-mono">
                Last updated: Feb 2025 | Format: PDF
            </p>
        </div>
    ),
};

const WidgetRenderer = ({ type, onCommand }) => {
    const Widget = widgetMap[type];
    if (!Widget) return null;
    return <Widget onCommand={onCommand} />;
};

export default React.memo(WidgetRenderer);
