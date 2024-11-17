import React, { useContext, useMemo } from 'react';
import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import Animated from 'react-native-reanimated';

import { ThemeContext } from '@src/context/Theme';
import { ThemeType } from '@src/styles/theme';
import { fontPixel, heightPixel, widthPixel } from '@src/utils/design';

import ActivityIndicator from '../ActivityIndicator';

interface PrimaryButtonProps extends TouchableOpacityProps {
  title: string;
  isLoading?: boolean;
  variant?: 'primary' | 'secondary';
}

const Button = ({ title, isLoading, disabled, variant = 'primary', style, ...other }: PrimaryButtonProps) => {
  const { theme } = useContext(ThemeContext);
  const styles = useMemo(() => makeStyles(theme, variant), [theme, variant]);

  return (
    <TouchableOpacity {...other} disabled={disabled} style={[styles.container, style]}>
      <Animated.Text style={styles.text}>{isLoading ? <ActivityIndicator /> : title}</Animated.Text>
    </TouchableOpacity>
  );
};

export default Button;

const makeStyles = (theme: ThemeType, variant: 'primary' | 'secondary') => {
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      alignItems: 'center',
      height: heightPixel(56),
      borderRadius: widthPixel(30),
      justifyContent: 'center',
      backgroundColor: variant === 'primary' ? theme.colors.primary : theme.colors.secondary,
    },

    text: {
      color: theme.colors.buttonText,
      fontWeight: 'bold',
      fontSize: fontPixel(16),
    },
  });
  return styles;
};
