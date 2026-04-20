import React from 'react';

const Badge = ({ children }) => (
  <span className="px-3 py-1.5 text-xs font-bold text-toast-700 bg-cream-200 rounded-full">
    {children}
  </span>
);

export default Badge;
