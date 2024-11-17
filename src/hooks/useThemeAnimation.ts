import { useContext } from 'react';
import { interpolateColor, useAnimatedStyle, useDerivedValue, withTiming } from 'react-native-reanimated';

import { ThemeContext } from '@src/context/Theme';

interface Props {
  duration?: number;
  light: string;
  dark: string;
}

export const useThemeBackgroundAnimation = ({ duration = 200, light, dark }: Props) => {
  const { currentTheme } = useContext(ThemeContext);
  const animationProgress = useDerivedValue(() => {
    return currentTheme === 'light' ? withTiming(0, { duration }) : withTiming(1, { duration });
  }, [currentTheme, duration]);

  const backgroundAnimation = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(animationProgress.value, [0, 1], [light, dark]),
  }));

  return backgroundAnimation;
};
