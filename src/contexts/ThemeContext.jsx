import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext({ darkMode: false, toggleDarkMode: () => { } });


export function ThemeProvider({ children }) {
    const [darkMode, setDarkMode] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');

        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        const initialMode = savedTheme === 'dark'
            || (!savedTheme && prefersDark);

        setDarkMode(initialMode);
        applyTheme(initialMode);
        setMounted(true);
    }, []);



    const applyTheme = (isDark) => {
        if (isDark) {
            document.documentElement.classList.add('dark');
            document.documentElement.setAttribute("data-theme", "dark");
        } else {
            document.documentElement.classList.remove('dark');
            document.documentElement.removeAttribute("data-theme");
        }
    };

    const toggleDarkMode = () => {
        const newMode = !darkMode;
        setDarkMode(newMode);
        localStorage.setItem("theme", newMode ? "dark" : "light");
        applyTheme(newMode);
    };

    if (!mounted) {
        return <div style={{ visibility: 'hidden' }}>{children}</div>;
    }

    return (
        <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}