import React, { useState, useEffect } from 'react';
import { Download } from 'lucide-react';

const Navbar = ({ activeTab, onTabChange }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-cream-100/90 backdrop-blur-xl border-b border-cream-300/50 shadow-sm" : "bg-cream-100/60 backdrop-blur-md"}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-14 md:h-16 flex items-center justify-between gap-2">

        {/* Left: Name — hidden on very small screens */}
        <span className="hidden sm:block text-toast-900 font-extrabold tracking-tight text-lg shrink-0">
          AK.
        </span>
        <span className="sm:hidden text-toast-900 font-extrabold tracking-tight text-base shrink-0">
          AK
        </span>

        {/* Center: Toggle Switch */}
        <div className="flex-1 flex justify-center">
          <div className="relative flex items-center bg-cream-200/80 rounded-full p-1">
            <div
              className="absolute h-[calc(100%-8px)] rounded-full bg-white shadow-md transition-all duration-300 ease-out"
              style={{
                width: 'calc(50% - 4px)',
                left: activeTab === 'work' ? '4px' : 'calc(50%)',
              }}
            />
            <button
              onClick={() => onTabChange('work')}
              className={`relative z-10 px-4 md:px-5 py-1.5 text-xs md:text-sm font-bold rounded-full transition-colors duration-300 cursor-pointer ${
                activeTab === 'work' ? 'text-toast-900' : 'text-toast-400 hover:text-toast-600'
              }`}
            >
              Work
            </button>
            <button
              onClick={() => onTabChange('info')}
              className={`relative z-10 px-4 md:px-5 py-1.5 text-xs md:text-sm font-bold rounded-full transition-colors duration-300 cursor-pointer ${
                activeTab === 'info' ? 'text-toast-900' : 'text-toast-400 hover:text-toast-600'
              }`}
            >
              Info
            </button>
          </div>
        </div>

        {/* Right: Download Resume */}
        <a
          href="/Abhay_Kumar_Resume_2026.pdf"
          download
          className="shrink-0 inline-flex items-center gap-1.5 px-3 md:px-4 py-1.5 md:py-2 text-[10px] md:text-xs font-bold text-white bg-toast-900 rounded-full hover:bg-coral-500 transition-colors"
        >
          <Download size={12} />
          <span className="hidden sm:inline">Resume</span>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
