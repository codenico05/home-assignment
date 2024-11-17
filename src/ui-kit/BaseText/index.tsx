import React, { useMemo } from 'react';
import { TextProps as RNTextProps, StyleSheet, Text } from 'react-native';

import { useAppTheme } from '@src/hooks/useAppTheme';
import { ThemeType } from '@src/styles/theme';
import textVariants from '@src/styles/typography';

interface BaseTextProps extends RNTextProps {
  variant?: keyof typeof textVariants;
}

const BaseText = ({ children, style, variant = 'bodySmall', ...other }: BaseTextProps) => {
  const { theme } = useAppTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);
  return (
    <Text style={[styles.text, textVariants[variant], style]} {...other}>
      {children}
    </Text>
  );
};

BaseText.displayName = 'BaseText';

export default BaseText;
const makeStyles = (theme: ThemeType) => {
  const styles = StyleSheet.create({
    text: {
      textAlign: 'left',
      color: theme.colors.textPrimary,
    },
  });

  return styles;
};
