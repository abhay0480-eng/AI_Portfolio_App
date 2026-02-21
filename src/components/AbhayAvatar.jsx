import React from 'react';

// Professional developer avatar SVG for Abhay Kumar
const AbhayAvatar = ({ size = 32, className = '' }) => (
    <div
        className={`rounded-full overflow-hidden shrink-0 ring-1 ring-green-500/30 ${className}`}
        style={{ width: size, height: size }}
    >
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" width={size} height={size}>
            {/* Background gradient */}
            <defs>
                <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#0a1628' }} />
                    <stop offset="100%" style={{ stopColor: '#1a2940' }} />
                </linearGradient>
                <linearGradient id="skinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#d4a574' }} />
                    <stop offset="100%" style={{ stopColor: '#c49360' }} />
                </linearGradient>
                <linearGradient id="hoodieGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#1e293b' }} />
                    <stop offset="100%" style={{ stopColor: '#0f172a' }} />
                </linearGradient>
                <linearGradient id="hairGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#1a1a2e' }} />
                    <stop offset="100%" style={{ stopColor: '#0d0d1a' }} />
                </linearGradient>
            </defs>

            {/* Background circle */}
            <circle cx="100" cy="100" r="100" fill="url(#bgGrad)" />

            {/* Subtle tech pattern */}
            <circle cx="30" cy="40" r="2" fill="#22c55e" opacity="0.15" />
            <circle cx="170" cy="50" r="1.5" fill="#22c55e" opacity="0.2" />
            <circle cx="160" cy="160" r="2" fill="#22c55e" opacity="0.1" />
            <circle cx="40" cy="170" r="1" fill="#3b82f6" opacity="0.15" />

            {/* Hoodie / Shoulders */}
            <ellipse cx="100" cy="210" rx="80" ry="60" fill="url(#hoodieGrad)" />
            {/* Hoodie neck */}
            <path d="M75 165 Q80 180, 100 185 Q120 180, 125 165" fill="url(#hoodieGrad)" />
            {/* Hoodie collar V */}
            <path d="M87 168 L100 185 L113 168" fill="none" stroke="#334155" strokeWidth="1.5" />

            {/* Neck */}
            <rect x="88" y="142" width="24" height="28" rx="8" fill="url(#skinGrad)" />

            {/* Face */}
            <ellipse cx="100" cy="105" rx="42" ry="48" fill="url(#skinGrad)" />

            {/* Hair — swept left style */}
            <path d="M58 95 Q58 55, 100 50 Q142 55, 145 95 Q145 80, 140 72 Q135 60, 100 55 Q65 60, 60 72 Q58 78, 58 95Z" fill="url(#hairGrad)" />
            {/* Hair top volume */}
            <path d="M62 85 Q62 48, 100 42 Q140 48, 143 82 Q138 55, 100 50 Q66 56, 62 85Z" fill="#111827" />

            {/* Eyebrows */}
            <path d="M75 88 Q82 84, 90 87" stroke="#2c2c3a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M110 87 Q118 84, 125 88" stroke="#2c2c3a" strokeWidth="2.5" fill="none" strokeLinecap="round" />

            {/* Eyes */}
            <ellipse cx="83" cy="98" rx="7" ry="5.5" fill="white" />
            <ellipse cx="117" cy="98" rx="7" ry="5.5" fill="white" />
            {/* Iris */}
            <circle cx="84" cy="98" r="3.5" fill="#1a1a2e" />
            <circle cx="118" cy="98" r="3.5" fill="#1a1a2e" />
            {/* Pupil */}
            <circle cx="84.5" cy="97.5" r="1.8" fill="#000" />
            <circle cx="118.5" cy="97.5" r="1.8" fill="#000" />
            {/* Eye highlight */}
            <circle cx="86" cy="96.5" r="1" fill="white" opacity="0.8" />
            <circle cx="120" cy="96.5" r="1" fill="white" opacity="0.8" />

            {/* Nose */}
            <path d="M97 104 Q100 114, 103 104" fill="none" stroke="#b8956a" strokeWidth="1.5" strokeLinecap="round" />

            {/* Smile */}
            <path d="M85 120 Q100 132, 115 120" fill="none" stroke="#a0785c" strokeWidth="2" strokeLinecap="round" />

            {/* Subtle beard shadow */}
            <path d="M70 128 Q100 148, 130 128" fill="none" stroke="#c49360" strokeWidth="0.5" opacity="0.3" />

            {/* Green code accent — subtle */}
            <text x="150" y="40" fontFamily="monospace" fontSize="10" fill="#22c55e" opacity="0.25">&lt;/&gt;</text>
        </svg>
    </div>
);

export default React.memo(AbhayAvatar);
