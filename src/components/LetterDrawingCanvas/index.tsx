import React, { useCallback, useRef, useState } from 'react';
import { PanResponder, PanResponderGestureState, StyleSheet, View } from 'react-native';
import Toast from 'react-native-toast-message';

import { useFocusEffect } from '@react-navigation/native';
import { Canvas, PaintStyle, Path, SkPath, Skia } from '@shopify/react-native-skia';
import Button from '@src/ui-kit/Button';
import { heightPixel, widthPixel } from '@src/utils/design';

interface LetterDrawingCanvasProps {
  onCaptureComplete: (base64Image: string) => Promise<void>;
}

const LetterDrawingCanvas: React.FC<LetterDrawingCanvasProps> = ({ onCaptureComplete }) => {
  const pathRef = useRef<SkPath>(Skia.Path.Make());
  const [path, setPath] = useState<SkPath>(pathRef.current);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
      clearCanvas();
    }, [])
  );

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: (event, gestureState) => handleTouchStart(event.nativeEvent, gestureState),
    onPanResponderMove: (event, gestureState) => handleTouchMove(event.nativeEvent, gestureState),
  });

  const handleTouchStart = (
    nativeEvent: { locationX: number; locationY: number },
    _gestureState: PanResponderGestureState
  ) => {
    const { locationX, locationY } = nativeEvent;
    pathRef.current.moveTo(locationX, locationY);
  };

  const handleTouchMove = (
    nativeEvent: { locationX: number; locationY: number },
    _gestureState: PanResponderGestureState
  ) => {
    const { locationX, locationY } = nativeEvent;
    pathRef.current.lineTo(locationX, locationY);
    setPath(pathRef.current.copy());
  };

  const captureCanvas = async () => {
    try {
      const surface = Skia.Surface.Make(450, 300);
      const canvas = surface?.getCanvas();

      if (canvas) {
        const paint = Skia.Paint();
        paint.setColor(Skia.Color('black'));
        paint.setStrokeWidth(4);
        paint.setStyle(PaintStyle.Stroke);
        canvas.drawPath(pathRef.current, paint);

        const image = surface?.makeImageSnapshot();
        if (image) {
          const pngData = image.encodeToBase64();
          setIsLoading(true);
          await onCaptureComplete(pngData);
          setIsLoading(false);
        }
      }
    } catch (err) {
      console.error('Error capturing canvas:', err);
      Toast.show({
        type: 'error',
        text1: 'Error generating canvas, try again!',
      });
    }
  };

  const clearCanvas = () => {
    const newPath = Skia.Path.Make();
    pathRef.current = newPath;
    setPath(newPath);
  };

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <Canvas style={styles.canvas}>
        <Path path={path} color="black" style="stroke" strokeWidth={4} />
      </Canvas>
      <View style={styles.btnContainer}>
        <Button style={styles.btn} variant="secondary" title="Clear" onPress={clearCanvas} />
        <Button style={styles.btn} isLoading={isLoading} variant="primary" title="Submit" onPress={captureCanvas} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  canvas: {
    width: 450,
    height: 300,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  btnContainer: {
    flexDirection: 'row',
    columnGap: widthPixel(8),
  },
  btn: {
    marginTop: heightPixel(16),
    width: widthPixel(80),
    height: heightPixel(40),
  },
});

export default LetterDrawingCanvas;
