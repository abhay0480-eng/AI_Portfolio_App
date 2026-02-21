import React from 'react';
import { Award, ExternalLink, Calendar, Hash } from 'lucide-react';
import { resumeData } from '../data/resumeData';

const issuerColors = {
    'Google': 'from-blue-500/20 to-green-500/20 border-blue-500/30',
    'Google Analytics Academy': 'from-yellow-500/20 to-orange-500/20 border-yellow-500/30',
    'TCS iON LifeLong Learning': 'from-purple-500/20 to-indigo-500/20 border-purple-500/30',
    'Cognitive Class': 'from-cyan-500/20 to-blue-500/20 border-cyan-500/30',
};

const CertificationsWidget = () => {
    const certs = resumeData.certifications || [];

    return (
        <div className="mt-3 space-y-2.5">
            <div className="flex items-center gap-2 mb-3">
                <Award size={14} className="text-yellow-400" />
                <span className="text-[10px] font-mono text-yellow-400 uppercase tracking-widest font-semibold">
                    Licenses & Certifications
                </span>
                <span className="text-[10px] text-gray-600 font-mono">({certs.length})</span>
            </div>

            {certs.map((cert, i) => {
                const colorClass = issuerColors[cert.issuer] || 'from-gray-500/20 to-gray-600/20 border-gray-500/30';

                return (
                    <div
                        key={i}
                        className={`relative p-3 rounded-lg bg-gradient-to-r ${colorClass} border backdrop-blur-sm transition-all hover:scale-[1.01] hover:shadow-lg`}
                        style={{ animationDelay: `${i * 100}ms` }}
                    >
                        <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                                <h4 className="text-sm font-mono font-semibold text-gray-100 leading-tight">
                                    {cert.name}
                                </h4>
                                <p className="text-xs text-gray-400 font-mono mt-0.5">{cert.issuer}</p>

                                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2">
                                    {cert.issued && (
                                        <span className="flex items-center gap-1 text-[10px] text-gray-500 font-mono">
                                            <Calendar size={9} />
                                            {cert.issued}
                                            {cert.expired && <span className="text-red-400/60"> · Expired {cert.expired}</span>}
                                        </span>
                                    )}
                                    {cert.credentialId && (
                                        <span className="flex items-center gap-1 text-[10px] text-gray-600 font-mono">
                                            <Hash size={9} />
                                            {cert.credentialId.length > 16
                                                ? cert.credentialId.slice(0, 16) + '...'
                                                : cert.credentialId}
                                        </span>
                                    )}
                                </div>

                                {cert.skills.length > 0 && (
                                    <div className="flex flex-wrap gap-1 mt-2">
                                        {cert.skills.map((skill) => (
                                            <span
                                                key={skill}
                                                className="px-1.5 py-0.5 text-[9px] font-mono text-green-400 bg-green-900/20 border border-green-500/20 rounded"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="shrink-0 w-8 h-8 rounded-lg bg-gray-800/50 flex items-center justify-center">
                                <Award size={14} className="text-yellow-400/70" />
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default React.memo(CertificationsWidget);
