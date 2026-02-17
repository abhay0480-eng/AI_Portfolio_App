import React from 'react';
import { Cpu } from 'lucide-react';

const TypingIndicator = () => (
    <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded bg-green-900/30 text-green-400 flex items-center justify-center shrink-0 animate-pulse">
            <Cpu size={16} />
        </div>
        <div className="mt-2 flex gap-1">
            <span className="w-1.5 h-1.5 bg-green-500/50 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
            <span className="w-1.5 h-1.5 bg-green-500/50 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
            <span className="w-1.5 h-1.5 bg-green-500/50 rounded-full animate-bounce"></span>
        </div>
    </div>
);

export default React.memo(TypingIndicator);
