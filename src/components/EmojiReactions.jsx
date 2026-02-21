import React, { useState } from 'react';
import { addReaction } from '../services/analyticsService';
import { isFirebaseReady } from '../services/firebaseConfig';
import { useStats } from '../contexts/StatsContext';

const EMOJIS = ['🔥', '💯', '🚀', '❤️', '👏', '🤩'];

const EmojiReactions = () => {
    const stats = useStats();
    const reactions = stats.reactions || {};
    const [pulsing, setPulsing] = useState(null);
    const [reacted, setReacted] = useState(() => {
        try {
            return JSON.parse(sessionStorage.getItem('abhayos_reactions') || '{}');
        } catch { return {}; }
    });

    if (!isFirebaseReady()) return null;

    const handleReaction = async (emoji) => {
        if (reacted[emoji]) return; // Already reacted this session

        setPulsing(emoji);
        setTimeout(() => setPulsing(null), 600);

        const newReacted = { ...reacted, [emoji]: true };
        setReacted(newReacted);
        sessionStorage.setItem('abhayos_reactions', JSON.stringify(newReacted));

        await addReaction(emoji);
    };

    const totalReactions = Object.values(reactions).reduce((a, b) => a + (b || 0), 0);

    return (
        <div className="border-t border-gray-800 bg-gray-900/60 backdrop-blur-sm px-3 py-2">
            <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1">
                    {EMOJIS.map((emoji) => (
                        <button
                            key={emoji}
                            onClick={() => handleReaction(emoji)}
                            disabled={reacted[emoji]}
                            className={`relative flex items-center gap-0.5 px-1.5 py-1 rounded-md text-sm transition-all active:scale-90 ${reacted[emoji]
                                ? 'bg-green-900/20 border border-green-500/30 cursor-default'
                                : 'hover:bg-gray-800 border border-transparent hover:border-gray-700 cursor-pointer'
                                } ${pulsing === emoji ? 'animate-bounce' : ''}`}
                        >
                            <span className={`${pulsing === emoji ? 'scale-125' : ''} transition-transform`}>
                                {emoji}
                            </span>
                            {(reactions[emoji] || 0) > 0 && (
                                <span className="text-[9px] font-mono text-gray-500 min-w-[12px]">
                                    {reactions[emoji]}
                                </span>
                            )}
                        </button>
                    ))}
                </div>
                <span className="text-[9px] font-mono text-gray-600 shrink-0">
                    {totalReactions > 0 ? `${totalReactions} reactions` : 'React!'}
                </span>
            </div>
        </div>
    );
};

export default React.memo(EmojiReactions);
