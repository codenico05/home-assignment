import React, { useMemo, useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import Toast from 'react-native-toast-message';

import API from '@src/api/method';
import GenerateLetter from '@src/components/GenerateLetter';
import LetterDrawingCanvas from '@src/components/LetterDrawingCanvas';
import Toggle from '@src/components/Toggle';
import { useAppTheme } from '@src/hooks/useAppTheme';
import { useStatistics } from '@src/hooks/useStatistics';
import { ThemeType } from '@src/styles/theme';
import BaseText from '@src/ui-kit/BaseText';
import { formatTimeStamp } from '@src/utils/common';
import { heightPixel, widthPixel } from '@src/utils/design';

global.Buffer = require('buffer').Buffer;
const PracticeScreen = () => {
  const [letter, setLetter] = useState<string>('');
  const { theme, currentTheme, toggleTheme } = useAppTheme();
  const { addNewAttempt } = useStatistics();
  const styles = useMemo(() => makeStyles(theme), [theme]);

  const sendBase64Image = async (image: string) => {
    try {
      const result = await API.getOCRResult(image);
      compareResultToOCR((result.data as String)[0]);
    } catch (err) {
      console.error('Failed to get OCR result:', err);
      Toast.show({
        type: 'error',
        text1: 'General server error, try again!',
      });
    }
  };

  const compareResultToOCR = (result: string) => {
    const now = new Date();
    const formattedDate = formatTimeStamp(now);

    if (result === letter) {
      Toast.show({
        type: 'success',
        text1: 'Well done! the letter is correct',
      });
      addNewAttempt({ letter, outcome: 'Success', timestamp: formattedDate });
    } else {
      Toast.show({
        type: 'warning',
        text1: 'Wrong! try again',
      });
      addNewAttempt({ letter, outcome: 'Failure', timestamp: formattedDate });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BaseText style={styles.title} variant="titleMedium">
          Practice Screen
        </BaseText>
        <Toggle onPress={toggleTheme} active={currentTheme === 'dark'} />
      </View>
      <GenerateLetter setLetter={setLetter} letter={letter} />

      <LetterDrawingCanvas onCaptureComplete={sendBase64Image} />
    </SafeAreaView>
  );
};

export default PracticeScreen;

const makeStyles = (theme: ThemeType) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      alignItems: 'center',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    title: {
      marginHorizontal: widthPixel(20),
      marginVertical: heightPixel(20),
    },
  });
  return styles;
};
