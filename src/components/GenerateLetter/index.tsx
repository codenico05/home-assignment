import React, { SetStateAction, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';
import BaseText from '@src/ui-kit/BaseText';
import Button from '@src/ui-kit/Button';
import { heightPixel, widthPixel } from '@src/utils/design';

interface GenerateLetterProps {
  letter: string;
  setLetter: React.Dispatch<SetStateAction<string>>;
}

const GenerateLetter = ({ letter, setLetter }: GenerateLetterProps) => {
  const generateRandomLetter = () => {
    const randomLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    setLetter(randomLetter);
  };

  useFocusEffect(
    useCallback(() => {
      generateRandomLetter();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  );

  return (
    <View style={styles.container}>
      <BaseText>Generated Letter: {letter}</BaseText>
      <Button onPress={generateRandomLetter} style={styles.btn} title="New Letter" />
    </View>
  );
};

export default GenerateLetter;

const styles = StyleSheet.create({
  container: {
    height: heightPixel(100),
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: widthPixel(24),
  },
  btn: {
    height: heightPixel(40),
    width: widthPixel(100),
  },
});
