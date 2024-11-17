import React, { useMemo, useReducer } from 'react';
import { LayoutChangeEvent, Pressable, StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useDerivedValue, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Path, Svg } from 'react-native-svg';

import { BottomTabBarProps, BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { useAppTheme } from '@src/hooks/useAppTheme';
import { ThemeType } from '@src/styles/theme';
import { isIOS } from '@src/utils/common';
import { heightPixel } from '@src/utils/design';

const AnimatedSvg = Animated.createAnimatedComponent(Svg);
const AnimatedPath = Animated.createAnimatedComponent(Path);

const AnimatedTabBar = ({ state: { index: activeIndex, routes }, navigation, descriptors }: BottomTabBarProps) => {
  const { bottom } = useSafeAreaInsets();
  const { currentTheme, theme } = useAppTheme();

  const styles = useMemo(() => makeStyles(theme), [theme]);
  const reducer = (state: any, action: { x: number; index: number }) => {
    return [...state, { x: action.x, index: action.index }];
  };

  const [layout, dispatch] = useReducer(reducer, []);

  const handleLayout = (event: LayoutChangeEvent, index: number) => {
    dispatch({ x: event.nativeEvent.layout.x, index });
  };

  const xOffSet = useDerivedValue(() => {
    if (layout.length !== routes.length) {
      return 0;
    }
    const offset = layout.find(({ index }) => index === activeIndex).x - 25;
    return offset;
  }, [activeIndex, layout]);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: withTiming(xOffSet.value, { duration: 250 }) }],
  }));

  const handlePress = (routeName: string) => navigation.navigate(routeName);

  return (
    <View style={[styles.tabBar, { paddingBottom: isIOS ? bottom : heightPixel(8) }]}>
      <AnimatedSvg width={110} height={60} viewBox="0 0 110 60" style={[styles.activeBackground, animatedStyles]}>
        <AnimatedPath
          fill={currentTheme === 'light' ? 'white' : 'black'}
          d="M20 0H0c11.046 0 20 8.953 20 20v5c0 19.33 15.67 35 35 35s35-15.67 35-35v-5c0-11.045 8.954-20 20-20H20z"
        />
      </AnimatedSvg>

      <View style={styles.tabBarContainer}>
        {routes.map((route, index) => {
          const active = index === activeIndex;
          const { options } = descriptors[route.key];

          return (
            <TabBarComponent
              key={index}
              active={active}
              options={options}
              onLayout={e => handleLayout(e, index)}
              onPress={() => handlePress(route.name)}
            />
          );
        })}
      </View>
    </View>
  );
};

type TabBarComponentProps = {
  active?: boolean;
  options: BottomTabNavigationOptions;
  onLayout: (e: LayoutChangeEvent) => void;
  onPress: () => void;
};

const TabBarComponent = ({ active, options, onLayout, onPress }: TabBarComponentProps) => {
  const { theme } = useAppTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);

  const animatedComponentCircleStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withTiming(active ? 1 : 0, { duration: 150 }),
        },
      ],
    };
  });

  const animatedIconContainerStyles = useAnimatedStyle(() => {
    return {
      opacity: withTiming(active ? 1 : 0.5, { duration: 150 }),
    };
  });

  return (
    <Pressable onPress={onPress} onLayout={onLayout} style={styles.component}>
      <Animated.View style={[styles.componentCircle, animatedComponentCircleStyles]} />
      {/* @ts-ignore */}
      <Animated.View style={[styles.iconContainer, animatedIconContainerStyles]}>{options.tabBarIcon}</Animated.View>
    </Pressable>
  );
};

export default AnimatedTabBar;

const makeStyles = (theme: ThemeType) => {
  const styles = StyleSheet.create({
    tabBar: {
      backgroundColor: theme.colors.bottomTab,
    },
    activeBackground: {
      position: 'absolute',
    },
    tabBarContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    },
    component: {
      height: 60,
      width: 60,
      marginTop: -5,
    },
    componentCircle: {
      flex: 1,
      borderRadius: 30,
      backgroundColor: theme.colors.bottomTab,
    },
    iconContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
    icon: {
      height: 24,
      width: 24,
    },
  });
  return styles;
};
