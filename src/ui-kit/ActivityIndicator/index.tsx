import React from 'react';
import { ActivityIndicator as RNActivityIndicator, StyleProp, ViewStyle } from 'react-native';

interface ActivityIndicatorProps {
  size?: 'large' | 'small';
  style?: StyleProp<ViewStyle>;
  color?: string;
}

const ActivityIndicator = ({ color = '#eee', size = 'small', style }: ActivityIndicatorProps) => (
  <RNActivityIndicator style={style} size={size} color={color} />
);

export default ActivityIndicator;
