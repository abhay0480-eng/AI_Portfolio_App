import React from 'react';

const BackgroundDecor = () => (
    <div className="fixed inset-0 pointer-events-none z-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),transparent_70%)]"></div>
        <div className="absolute top-[20%] left-[10%] w-64 h-64 bg-green-900/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[20%] right-[10%] w-64 h-64 bg-blue-900/20 rounded-full blur-3xl"></div>
    </div>
);

export default React.memo(BackgroundDecor);
