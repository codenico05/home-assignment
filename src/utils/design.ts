import { Dimensions, PixelRatio } from 'react-native';

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get('window');

const widthBaseScale = Math.max(WINDOW_WIDTH / 375, 1);
const heightBaseScale = Math.max(WINDOW_HEIGHT / 812, 1);

function normalize(size: number, based = 'width') {
  const newSize = based === 'height' ? size * heightBaseScale : size * widthBaseScale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}
//for width  pixel
export const widthPixel = (size: number) => normalize(size, 'width');

//for height  pixel
export const heightPixel = (size: number) => normalize(size, 'height');

//for font  pixel
export const fontPixel = (size: number) => heightPixel(size);

//for Margin and Padding vertical pixel
export const pixelSizeVertical = (size: number) => heightPixel(size);

//for Margin and Padding horizontal pixel
export const pixelSizeHorizontal = (size: number) => widthPixel(size);
