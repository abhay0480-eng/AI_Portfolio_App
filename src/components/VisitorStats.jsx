import React, { useState, useEffect } from 'react';
import { Eye, Heart, MessageSquare, TrendingUp } from 'lucide-react';
import { subscribeToStats } from '../services/analyticsService';
import { isFirebaseReady } from '../services/firebaseConfig';

const VisitorStats = () => {
    const [stats, setStats] = useState({ views: 0, reactions: {}, feedbackCount: 0 });

    useEffect(() => {
        if (!isFirebaseReady()) return;
        const unsub = subscribeToStats(setStats);
        return unsub;
    }, []);

    const totalReactions = Object.values(stats.reactions || {}).reduce((a, b) => a + (b || 0), 0);
    const topReaction = Object.entries(stats.reactions || {}).sort((a, b) => b[1] - a[1])[0];

    if (!isFirebaseReady()) {
        return (
            <div className="mt-3 p-4 rounded-lg border border-yellow-500/20 bg-yellow-900/10">
                <p className="text-xs font-mono text-yellow-400">
                    ⚠️ Firebase not configured. Stats require Firebase setup.
                </p>
            </div>
        );
    }

    const statCards = [
        {
            icon: <Eye size={16} />,
            label: 'Total Views',
            value: stats.views || 0,
            color: 'text-blue-400 bg-blue-900/20 border-blue-500/30',
        },
        {
            icon: <Heart size={16} />,
            label: 'Reactions',
            value: totalReactions,
            suffix: topReaction ? ` (${topReaction[0]} most)` : '',
            color: 'text-pink-400 bg-pink-900/20 border-pink-500/30',
        },
        {
            icon: <MessageSquare size={16} />,
            label: 'Feedbacks',
            value: stats.feedbackCount || 0,
            color: 'text-green-400 bg-green-900/20 border-green-500/30',
        },
    ];

    return (
        <div className="mt-3 space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-2">
                <TrendingUp size={14} className="text-cyan-400" />
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-semibold">
                    Visitor Analytics
                </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
                {statCards.map((card) => (
                    <div
                        key={card.label}
                        className={`p-3 rounded-lg border ${card.color} text-center`}
                    >
                        <div className="flex justify-center mb-1.5">{card.icon}</div>
                        <p className="text-lg sm:text-xl font-mono font-bold">{card.value}</p>
                        <p className="text-[9px] font-mono text-gray-500 mt-0.5">
                            {card.label}
                            {card.suffix && <span className="text-gray-600">{card.suffix}</span>}
                        </p>
                    </div>
                ))}
            </div>

            {/* Reaction breakdown */}
            {totalReactions > 0 && (
                <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-900/50 border border-gray-800">
                    <span className="text-[9px] font-mono text-gray-600 uppercase tracking-wider shrink-0">Breakdown:</span>
                    <div className="flex gap-2 flex-wrap">
                        {Object.entries(stats.reactions || {})
                            .filter(([, count]) => count > 0)
                            .sort((a, b) => b[1] - a[1])
                            .map(([emoji, count]) => (
                                <span key={emoji} className="text-xs font-mono text-gray-400">
                                    {emoji} {count}
                                </span>
                            ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default React.memo(VisitorStats);
