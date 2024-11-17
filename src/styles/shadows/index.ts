import { Platform } from 'react-native';

type BoxShadowStyle = {
  shadowOffset: {
    width: number;
    height: number;
  };
  shadowOpacity: number;
  shadowRadius: number;
  shadowColor?: string;
  elevation: number;
};

export const boxShadow: BoxShadowStyle = {
  shadowOffset: {
    width: 0,
    height: 17,
  },
  shadowOpacity: 0.06,
  shadowRadius: 25,
  shadowColor: Platform.OS === 'android' ? '#bfbfbf' : '#000',
  elevation: 17,
};
