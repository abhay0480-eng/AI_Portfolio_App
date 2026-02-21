import React, { createContext, useContext, useEffect, useState } from 'react';

// Default theme is 'hacker' (the exact current color scheme)
const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    // Check local storage or default to hacker
    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = window.localStorage.getItem('theme');
            if (saved) return saved;
        }
        return 'hacker';
    });

    useEffect(() => {
        // Save to local storage
        window.localStorage.setItem('theme', theme);

        // Remove old theme classes and add the new one to the html target
        const htmlElement = document.documentElement;
        htmlElement.classList.remove('theme-hacker', 'theme-dark', 'theme-cyberpunk');
        htmlElement.classList.add(`theme-${theme}`);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
