import React from 'react';
import { StyleSheet } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { PracticeIcon, StatisticsIcon } from '@src/assets/svgs';
import { useAppTheme } from '@src/hooks/useAppTheme';
import { heightPixel, widthPixel } from '@src/utils/design';

import PracticeScreen from '../Practice';
import StatisticsScreen from '../Statistics';
import AnimatedTabBar from './AnimatedTapBar';

const Tab = createBottomTabNavigator();

const TabRoutes = () => {
  const { theme } = useAppTheme();
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Practice"
      // eslint-disable-next-line react/no-unstable-nested-components
      tabBar={props => <AnimatedTabBar {...props} />}
    >
      <Tab.Screen
        name="Practice"
        component={PracticeScreen}
        options={{
          //@ts-ignore
          tabBarIcon: (
            <PracticeIcon style={styles.icon} fill={theme.colors.textPrimary} stroke={theme.colors.textPrimary} />
          ),
        }}
      />
      <Tab.Screen
        name="Statistics"
        component={StatisticsScreen}
        //@ts-ignore
        options={{ tabBarIcon: <StatisticsIcon style={styles.icon} fill={theme.colors.textPrimary} /> }}
      />
    </Tab.Navigator>
  );
};

export default TabRoutes;

const styles = StyleSheet.create({
  icon: {
    height: heightPixel(24),
    width: widthPixel(24),
  },
});
