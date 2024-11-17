import { useContext } from 'react';

import { ThemeContext } from '@src/context/Theme';

export const useAppTheme = () => {
  const { theme, currentTheme, toggleTheme } = useContext(ThemeContext);

  return { theme, currentTheme, toggleTheme };
};
