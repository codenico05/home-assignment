/* eslint-disable react/no-unstable-nested-components */
import React, { useMemo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Toast, { ToastConfig, ToastConfigParams, ToastProps } from 'react-native-toast-message';

import { CloseIcon, ErrorIcon, SuccessIcon, WarningIcon } from '@src/assets/svgs/toast';
import { useAppTheme } from '@src/hooks/useAppTheme';
import { ThemeType } from '@src/styles/theme';
import BaseText from '@src/ui-kit/BaseText';
import { fontPixel, heightPixel, widthPixel } from '@src/utils/design';

const ToastProvider = ({ position = 'bottom', bottomOffset = 100, ...other }: ToastProps) => {
  const { theme } = useAppTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);

  const toastConfig: ToastConfig = {
    success: ({ text1, hide }: ToastConfigParams<any>) => (
      <View style={[styles.container, styles.success]}>
        <View style={styles.left}>
          <SuccessIcon />
          <BaseText style={styles.text}>{text1}</BaseText>
        </View>
        <Pressable onPress={() => hide()}>
          <CloseIcon stroke={theme.colors.toast.close} />
        </Pressable>
      </View>
    ),
    error: ({ text1, hide }: ToastConfigParams<any>) => (
      <View style={[styles.container, styles.error]}>
        <View style={styles.left}>
          <ErrorIcon />
          <BaseText style={styles.text}>{text1}</BaseText>
        </View>
        <Pressable onPress={() => hide()}>
          <CloseIcon stroke={theme.colors.toast.close} />
        </Pressable>
      </View>
    ),
    warning: ({ text1, hide }: ToastConfigParams<any>) => (
      <View style={[styles.container, styles.warning]}>
        <View style={styles.left}>
          <WarningIcon />
          <BaseText style={styles.text}>{text1}</BaseText>
        </View>
        <Pressable onPress={() => hide()}>
          <CloseIcon stroke={theme.colors.toast.close} />
        </Pressable>
      </View>
    ),
  };

  return <Toast config={toastConfig} bottomOffset={bottomOffset} position={position} {...other} />;
};

export default ToastProvider;

const makeStyles = (theme: ThemeType) => {
  const styles = StyleSheet.create({
    container: {
      width: '80%',
      padding: heightPixel(12),
      flexDirection: 'row',
      borderWidth: 1,
      justifyContent: 'space-between',
      borderRadius: 10,
      alignItems: 'center',
    },
    left: {
      columnGap: widthPixel(10),
      flexDirection: 'row',
      alignItems: 'center',
    },
    text: {
      fontSize: fontPixel(11),
      fontWeight: 300,
    },
    error: {
      backgroundColor: theme.colors.toast.error.background,
      borderColor: theme.colors.toast.error.border,
    },
    success: {
      backgroundColor: theme.colors.toast.success.background,
      borderColor: theme.colors.toast.success.border,
    },
    warning: {
      backgroundColor: theme.colors.toast.warning.background,
      borderColor: theme.colors.toast.warning.border,
    },
  });
  return styles;
};
