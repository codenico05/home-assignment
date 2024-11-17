import React from 'react';
import { MMKV } from 'react-native-mmkv';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { NavigationContainer } from '@react-navigation/native';
import ToastProvider from '@src/components/ToastProvider';
import StatisticsContextProvider from '@src/context/Statistics';
import ThemeContextProvider from '@src/context/Theme';

export const storage = new MMKV({
  id: 'statistics_storage',
  encryptionKey: 'encryptionKey',
});

const Providers = ({ children }: React.PropsWithChildren) => (
  <SafeAreaProvider>
    <NavigationContainer>
      <StatisticsContextProvider>
        <ThemeContextProvider>
          {children}
          <ToastProvider />
        </ThemeContextProvider>
      </StatisticsContextProvider>
    </NavigationContainer>
  </SafeAreaProvider>
);

export default Providers;
