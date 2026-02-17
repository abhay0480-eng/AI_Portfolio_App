import React from 'react';

const SkillTag = ({ skill }) => (
    <span className="inline-block bg-green-900/30 text-green-400 border border-green-500/30 px-2 py-1 rounded text-xs mr-2 mb-2 font-mono hover:bg-green-500/20 transition-colors cursor-default">
        {skill}
    </span>
);

export default React.memo(SkillTag);
