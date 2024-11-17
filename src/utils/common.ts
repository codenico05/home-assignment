import { Platform } from 'react-native';

export const isIOS = Platform.OS === 'ios';

export const isAndroid = Platform.OS === 'android';

export const formatTimeStamp = (timestamp: Date) => {
  const formatOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  };
  return timestamp.toLocaleDateString('en-US', formatOptions);
};
