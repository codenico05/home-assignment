import React, { FC, useMemo, useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { SvgProps } from 'react-native-svg';

import { useThemeBackgroundAnimation } from '@src/hooks/useThemeAnimation';
import { themeDark, themeLight } from '@src/styles/theme';
import { heightPixel, widthPixel } from '@src/utils/design';

interface ToggleProps {
  active: boolean;
  icons?: {
    active: FC<SvgProps>;
    inactive: FC<SvgProps>;
  };
  onPress?: () => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const Toggle = ({ active, icons: Icons, onPress }: ToggleProps) => {
  const styles = useMemo(() => makeStyles(), []);
  const [animationIsRunning, setAnimationIsRunning] = useState<boolean>(false);

  const transformPosition = useSharedValue(active ? widthPixel(22) : 0);
  const backgroundAnimation = useThemeBackgroundAnimation({
    light: themeLight.colors.primary,
    dark: themeDark.colors.primary,
  });

  const transformToggleAnimation = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withTiming(transformPosition.value, { duration: 200 }, () => {
          runOnJS(setAnimationIsRunning)(false);
        }),
      },
    ],
  }));

  const handlePress = () => {
    if (onPress) {
      onPress();
    }
    setAnimationIsRunning(true);

    transformPosition.value = active ? 0 : widthPixel(24);
  };

  return (
    <AnimatedPressable
      disabled={animationIsRunning}
      onPress={handlePress}
      style={[styles.container, backgroundAnimation]}
    >
      <Animated.View style={[styles.innerCircle, transformToggleAnimation]} />
      {Icons && (
        <>
          <Icons.active />
          <Icons.inactive />
        </>
      )}
    </AnimatedPressable>
  );
};

const makeStyles = () => {
  const styles = StyleSheet.create({
    container: {
      width: widthPixel(48),
      height: heightPixel(24),
      borderRadius: widthPixel(24),
      justifyContent: 'space-between',
      paddingHorizontal: widthPixel(5),
      position: 'relative',
      flexDirection: 'row',
      alignItems: 'center',
    },
    innerCircle: {
      width: widthPixel(20),
      height: heightPixel(20),
      position: 'absolute',
      backgroundColor: 'white',
      borderRadius: widthPixel(50),
      left: 2,
      zIndex: 1,
      justifyContent: 'center',
    },
    innerLine: {
      transform: [{ translateX: 1 }],
    },
  });
  return styles;
};

export default Toggle;
