import { StyleSheet } from 'react-native';

import { fontPixel } from '@src/utils/design';

export enum UbuntuFontFamily {
  UbuntuBold = 'Ubuntu-Bold',
  UbuntuBoldItalic = 'Ubuntu-BoldItalic',
  UbuntuItalic = 'Ubuntu-Italic',
  UbuntuLight = 'Ubuntu-Light>',
  UbuntuLightItalic = 'Ubuntu-LightItalic',
  UbuntuMedium = 'Ubuntu-Medium',
  UbuntuMediumItalic = 'Ubuntu-MediumItalic>',
  UbuntuRegular = 'Ubuntu-Regular',
}

const textVariants = StyleSheet.create({
  titleLarge: {
    fontSize: fontPixel(24),
    fontFamily: UbuntuFontFamily.UbuntuBold,
    fontWeight: 'bold',
  },
  titleMedium: {
    fontSize: fontPixel(20),
    fontFamily: UbuntuFontFamily.UbuntuBold,
    fontWeight: 'bold',
  },
  titleSmall: {
    fontSize: fontPixel(18),
    fontFamily: UbuntuFontFamily.UbuntuBold,
    fontWeight: 'bold',
  },
  bodyLarge: {
    fontSize: fontPixel(18),
    fontFamily: UbuntuFontFamily.UbuntuMedium,
    fontWeight: '600',
  },
  bodyMedium: {
    fontSize: fontPixel(16),
    fontWeight: '500',
    fontFamily: UbuntuFontFamily.UbuntuMedium,
  },
  bodySmall: {
    fontSize: fontPixel(14),
    fontWeight: 'normal',
    fontFamily: UbuntuFontFamily.UbuntuRegular,
  },
  caption: {
    fontSize: fontPixel(12),
    fontWeight: 'normal',
    fontFamily: UbuntuFontFamily.UbuntuRegular,
  },
  helper: {
    fontSize: fontPixel(11),
    fontWeight: '300',
    fontFamily: UbuntuFontFamily.UbuntuLight,
  },
});

export default textVariants;
