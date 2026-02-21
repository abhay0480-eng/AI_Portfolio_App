import React from 'react';

// Professional developer avatar SVG for Abhay Kumar
const AbhayAvatar = ({ size = 32, className = '' }) => (
    <div
        className={`rounded-full overflow-hidden shrink-0 ring-1 ring-green-500/30 ${className}`}
        style={{ width: size, height: size }}
    >
        <img src="/abhay_profile.png" alt="Abhay Avatar" className="w-full h-full object-cover" />
    </div>
);

export default React.memo(AbhayAvatar);
