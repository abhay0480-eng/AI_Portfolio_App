import React, { useState } from 'react';
import { MapPin, Briefcase, Calendar, Copy, Check, ExternalLink, Linkedin, Github, Mail } from 'lucide-react';
import { resumeData } from '../data/resumeData';

const HRProfileCard = () => {
    const [copied, setCopied] = useState(false);
    const { profile, availability, experience } = resumeData;

    const handleCopy = () => {
        const summary = `${profile.name} — ${profile.role}\n${profile.location}\n${profile.email}\n\n${profile.summary}\n\nExperience: ${experience.length} companies, 3+ years\nAvailability: ${availability.label} (${availability.noticePeriod})\nLinkedIn: ${profile.social.linkedin}`;
        navigator.clipboard.writeText(summary);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="mt-4 max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Main Card */}
            <div
                className="relative overflow-hidden rounded-xl border border-green-500/30 bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 p-[1px]"
                style={{
                    background: 'linear-gradient(135deg, rgba(34,197,94,0.2), rgba(59,130,246,0.15), rgba(168,85,247,0.15), rgba(34,197,94,0.1))',
                }}
            >
                <div className="rounded-xl bg-gray-950/95 backdrop-blur-xl p-6">
                    {/* Glow Effect */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

                    {/* Header Row */}
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                            {/* Avatar */}
                            <div className="relative">
                                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-2xl font-bold text-black shadow-lg shadow-green-500/20">
                                    {profile.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                {/* Status dot */}
                                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gray-950 rounded-full flex items-center justify-center">
                                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                                </div>
                            </div>

                            <div>
                                <h2 className="text-xl font-bold text-white tracking-tight">{profile.name}</h2>
                                <p className="text-green-400 text-sm font-mono font-medium">{profile.role}</p>
                                <div className="flex items-center gap-1 mt-1 text-gray-500 text-xs">
                                    <MapPin size={11} />
                                    <span>{profile.location}</span>
                                </div>
                            </div>
                        </div>

                        {/* Availability Badge */}
                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500/10 border border-green-500/30 rounded-full">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                            <span className="text-[10px] font-mono text-green-400 uppercase tracking-wider whitespace-nowrap">
                                {availability.label}
                            </span>
                        </div>
                    </div>

                    {/* Summary */}
                    <p className="text-gray-400 text-sm leading-relaxed mb-5 font-mono border-l-2 border-green-500/30 pl-3">
                        {profile.summary}
                    </p>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-3 gap-3 mb-5">
                        {[
                            { value: '3+', label: 'Years Exp', icon: <Calendar size={14} /> },
                            { value: String(experience.length), label: 'Companies', icon: <Briefcase size={14} /> },
                            { value: '30 days', label: 'Notice Period', icon: <Calendar size={14} /> },
                        ].map((stat) => (
                            <div
                                key={stat.label}
                                className="bg-gray-900/80 border border-gray-800 rounded-lg p-3 text-center hover:border-green-500/30 transition-all"
                            >
                                <div className="text-green-500 flex justify-center mb-1">{stat.icon}</div>
                                <p className="text-lg font-bold text-white font-mono">{stat.value}</p>
                                <p className="text-[10px] text-gray-500 uppercase tracking-wider">{stat.label}</p>
                            </div>
                        ))}
                    </div>

                    {/* Work Mode Tags */}
                    <div className="flex flex-wrap gap-2 mb-5">
                        {availability.workMode.map((mode) => (
                            <span
                                key={mode}
                                className="px-2.5 py-1 text-[10px] font-mono border border-gray-700 bg-gray-900 rounded-full text-gray-400 uppercase tracking-wider"
                            >
                                {mode}
                            </span>
                        ))}
                        {availability.preferredRoles.slice(0, 2).map((role) => (
                            <span
                                key={role}
                                className="px-2.5 py-1 text-[10px] font-mono border border-blue-500/30 bg-blue-900/10 rounded-full text-blue-400 uppercase tracking-wider"
                            >
                                {role}
                            </span>
                        ))}
                    </div>

                    {/* Social Links + Copy */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                        <div className="flex gap-3">
                            {[
                                { href: `mailto:${profile.email}`, icon: <Mail size={16} />, color: 'hover:text-green-400 hover:bg-green-900/30' },
                                { href: profile.social.linkedin, icon: <Linkedin size={16} />, color: 'hover:text-blue-400 hover:bg-blue-900/30', ext: true },
                                { href: profile.social.github, icon: <Github size={16} />, color: 'hover:text-white hover:bg-gray-800', ext: true },
                            ].map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    {...(link.ext ? { target: '_blank', rel: 'noreferrer' } : {})}
                                    className={`p-2 rounded-lg bg-gray-900 border border-gray-800 text-gray-500 transition-all ${link.color}`}
                                >
                                    {link.icon}
                                </a>
                            ))}
                        </div>

                        <button
                            onClick={handleCopy}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-medium transition-all ${copied
                                    ? 'bg-green-500/20 text-green-400 border border-green-500/40'
                                    : 'bg-gray-900 text-gray-400 border border-gray-700 hover:border-green-500/40 hover:text-green-400'
                                }`}
                        >
                            {copied ? <Check size={14} /> : <Copy size={14} />}
                            {copied ? 'Copied!' : 'Copy Profile'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(HRProfileCard);
