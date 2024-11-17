import React, { useState } from 'react';

import { ThemeType, themeDark, themeLight } from '@src/styles/theme';

type ThemeContextType = {
  theme: ThemeType;
  toggleTheme: () => void;
  currentTheme: 'light' | 'dark';
};

const defaultValue: ThemeContextType = {
  theme: themeLight,
  toggleTheme: () => {},
  currentTheme: 'light',
};

export const ThemeContext = React.createContext(defaultValue);

const ThemeContextProvider = ({ children }: React.PropsWithChildren) => {
  const [theme, setTheme] = useState<ThemeType>(themeLight);
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('light');

  function toggleTheme() {
    setCurrentTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    return setTheme(prevTheme => (prevTheme === themeLight ? themeDark : themeLight));
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme, currentTheme }}>{children}</ThemeContext.Provider>;
};

export default ThemeContextProvider;
