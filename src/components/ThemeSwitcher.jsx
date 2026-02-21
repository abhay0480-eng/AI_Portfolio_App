import React from 'react';
import { Palette } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const themes = [
    { id: 'hacker', label: 'Hacker', color: 'bg-green-500' },
    { id: 'dark', label: 'Dark', color: 'bg-blue-500' },
    { id: 'cyberpunk', label: 'Cyberpunk', color: 'bg-pink-500' },
];

const ThemeSwitcher = () => {
    const { theme, setTheme } = useTheme();

    return (
        <div className="flex items-center gap-2 px-2 py-1 bg-gray-900 rounded-md border border-gray-800">
            <Palette size={14} className="text-gray-400" />
            <div className="flex gap-1">
                {themes.map((t) => (
                    <button
                        key={t.id}
                        onClick={() => setTheme(t.id)}
                        title={t.label}
                        className={`w-4 h-4 rounded-full transition-transform hover:scale-110 ${t.color} ${theme === t.id ? 'ring-2 ring-white ring-offset-2 ring-offset-gray-900 scale-110' : 'opacity-60 hover:opacity-100'}`}
                        aria-label={`Switch to ${t.label} theme`}
                    />
                ))}
            </div>
        </div>
    );
};

export default ThemeSwitcher;
