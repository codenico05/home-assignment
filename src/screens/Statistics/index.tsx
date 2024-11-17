import React, { useMemo } from 'react';
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';

import StatisticItem from '@src/components/StatisticItem';
import { useAppTheme } from '@src/hooks/useAppTheme';
import { useStatistics } from '@src/hooks/useStatistics';
import { boxShadow } from '@src/styles/shadows';
import { ThemeType } from '@src/styles/theme';
import BaseText from '@src/ui-kit/BaseText';
import { heightPixel, widthPixel } from '@src/utils/design';

const StatisticsScreen = () => {
  const { theme } = useAppTheme();
  const { attempts, summary } = useStatistics();
  const styles = useMemo(() => makeStyles(theme), [theme]);

  return (
    <SafeAreaView style={styles.container}>
      <BaseText style={styles.title} variant="titleMedium">
        Statistics
      </BaseText>

      <View style={styles.summaryContainer}>
        <BaseText style={styles.summaryTitle} variant="titleSmall">
          Summary
        </BaseText>
        <BaseText style={styles.summaryText}>Attempts: {summary?.sum}</BaseText>
        <BaseText style={styles.summaryText}>Success Rate: {summary?.successRate.toFixed(2)}%</BaseText>
      </View>

      <BaseText style={styles.historyTitle} variant="titleSmall">
        History
      </BaseText>

      <FlatList
        data={attempts}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => <StatisticItem item={item} />}
      />
    </SafeAreaView>
  );
};

export default StatisticsScreen;

const makeStyles = (theme: ThemeType) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    titleContainer: {
      backgroundColor: theme.colors.primary,
      paddingVertical: heightPixel(15),
      marginBottom: heightPixel(10),
    },
    title: {
      textAlign: 'center',
    },
    summaryContainer: {
      backgroundColor: theme.colors.bottomTab,
      padding: heightPixel(15),
      marginHorizontal: widthPixel(20),
      marginVertical: heightPixel(16),
      borderRadius: widthPixel(10),
      marginBottom: heightPixel(20),
      ...boxShadow,
    },
    summaryTitle: {
      marginBottom: heightPixel(10),
    },
    summaryText: {
      marginVertical: heightPixel(5),
    },
    historyTitle: {
      textAlign: 'left',
      fontWeight: 'bold',
      marginHorizontal: widthPixel(20),
      marginBottom: heightPixel(10),
    },
  });
};
