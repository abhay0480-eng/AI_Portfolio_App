import React from 'react';
import { Briefcase } from 'lucide-react';

const ExperienceCard = ({ job }) => (
    <div className="border-l-2 border-green-600 pl-4 py-1 mb-6 relative">
        <div className="absolute -left-[5px] top-1 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
            <h3 className="text-green-200 font-bold text-lg">{job.role}</h3>
            <span className="text-gray-500 text-xs font-mono">{job.period}</span>
        </div>
        <div className="text-green-600 text-sm font-semibold mb-2 flex items-center gap-1">
            <Briefcase size={12} /> {job.company} <span className="text-gray-600 font-light">| {job.loc}</span>
        </div>
        <p className="text-gray-400 text-sm leading-relaxed font-mono">{job.desc}</p>
    </div>
);

export default React.memo(ExperienceCard);
