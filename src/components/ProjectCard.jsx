import React from 'react';
import { Code } from 'lucide-react';

const ProjectCard = ({ project }) => (
    <div className="bg-gray-900 border border-green-500/40 p-4 rounded-md mb-4 hover:border-green-400 transition-colors group">
        <div className="flex justify-between items-start mb-2">
            <h3 className="text-green-300 font-bold text-lg group-hover:text-green-200">{project.title}</h3>
            <Code size={16} className="text-green-600" />
        </div>
        <p className="text-gray-400 text-sm mb-3 font-mono">{project.desc}</p>
        <div className="flex flex-wrap gap-2 mb-3">
            {project.stack.split(', ').map((tech, i) => (
                <span key={i} className="text-xs text-green-600 bg-green-950 px-1 rounded border border-green-900">{tech}</span>
            ))}
        </div>
    </div>
);

export default React.memo(ProjectCard);
