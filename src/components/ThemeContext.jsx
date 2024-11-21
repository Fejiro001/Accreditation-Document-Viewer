/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from 'react';
/**
 * Component for toggling between light and dark mode.
 * Manages the theme based on user preference or system settings.
 * Uses localStorage to store the theme preference.
 * Applies the theme to the document's root element and updates the UI accordingly.
 */
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        // Apply theme
        const applyTheme = (theme) => {
            if (theme === 'dark') {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
            setIsDarkMode(theme === 'dark'); // check
        };

        // Check localStorage for theme preference
        const savedTheme = localStorage.getItem('theme');

        // Respect system preference if no saved theme
        const systemPrefersDark = window.matchMedia(
            '(prefers-color-scheme: dark)',
        ).matches;

        // Apply saved theme or system preference
        if (savedTheme) {
            applyTheme(savedTheme);
        } else {
            applyTheme(systemPrefersDark ? 'dark' : 'light');
        }

        // Listen for system color scheme changes
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleSystemThemeChange = (e) => {
            if (!localStorage.getItem('theme')) {
                applyTheme(e.matches ? 'dark' : 'light');
            }
        };
        mediaQuery.addEventListener('change', handleSystemThemeChange);

        // Cleanup event listener on unmount
        return () =>
            mediaQuery.removeEventListener('change', handleSystemThemeChange);
    }, []);

    const toggleTheme = () => {
        setIsDarkMode((prevMode) => {
            const newMode = !prevMode;
            // Apply the new mode to the document and localStorage
            document.documentElement.classList.toggle('dark', newMode);
            localStorage.setItem('theme', newMode ? 'dark' : 'light');
            return newMode; // Return the new state
        });
    };

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
