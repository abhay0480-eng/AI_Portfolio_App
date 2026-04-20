import React from 'react';

const ButtonPrimary = ({ children, href }) => (
  <a
    href={href}
    className="group relative inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-zinc-900 rounded-full overflow-hidden transition-all duration-300 hover:bg-zinc-800 hover:scale-105 active:scale-95"
  >
    {children}
  </a>
);

export default ButtonPrimary;
