import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { Attempt } from '@src/app/mmkvConfig';
import { useAppTheme } from '@src/hooks/useAppTheme';
import { boxShadow } from '@src/styles/shadows';
import { ThemeType } from '@src/styles/theme';
import BaseText from '@src/ui-kit/BaseText';
import { heightPixel, widthPixel } from '@src/utils/design';

interface StatisticItemProps {
  item: Attempt;
}

const StatisticItem = ({ item }: StatisticItemProps) => {
  const { theme } = useAppTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <BaseText variant="caption" style={styles.label}>
          Letter:
        </BaseText>
        <BaseText variant="caption">{item.letter}</BaseText>
      </View>
      <View style={styles.row}>
        <BaseText style={styles.label} variant="caption">
          Outcome:
        </BaseText>
        <BaseText variant="caption" style={item.outcome === 'Success' ? styles.success : styles.error}>
          {item.outcome}
        </BaseText>
      </View>
      <View style={styles.row}>
        <BaseText variant="caption" style={styles.label}>
          Timestamp:
        </BaseText>
        <BaseText variant="caption">{item.timestamp}</BaseText>
      </View>
    </View>
  );
};

export default StatisticItem;

const makeStyles = (theme: ThemeType) => {
  const styles = StyleSheet.create({
    container: {
      paddingVertical: heightPixel(16),
      paddingHorizontal: widthPixel(12),
      borderRadius: widthPixel(8),
      backgroundColor: theme.colors.background,
      marginBottom: heightPixel(12),
      ...boxShadow,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: heightPixel(8),
    },
    label: {
      color: theme.colors.textSecondary,
    },

    success: {
      color: theme.colors.success,
    },
    error: {
      color: theme.colors.error,
    },
  });
  return styles;
};
