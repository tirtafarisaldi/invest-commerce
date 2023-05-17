/**
 * This file contains the application's variables.
 *
 * Define color, sizes, etc. here instead of duplicating them throughout the components.
 * That allows to change them more easily later on.
 */

import {PixelRatio, Platform} from 'react-native';
import {width} from './Layout';
import {Variables} from './themes/default_dark';

/**
 * Colors
 */
export const Colors = {
  transparent: 'rgba(0,0,0,0)',
  white: '#fff',
  offWhite: '#F9F9F9',
  black: '#000',
  base: '#69FFC9',
  baseT: '#50E6AF',
  outlineBase: '#262626',
  disabled: '#DADADA',
  text: '#212529',
  buttonTitle: '#262626',
  buttonTitleDisabled: '#585858',
  outlineProfile: '#5E44FF',
  statusOffline: '#727272',
  statusOnline: '#69FFC9',
  statusBorder: '#F6F7F9',
  closeFilled: '#9E9E9E',
  primary: {
    100: '#DCFCE4',
    200: '#BAFBD0',
    300: '#96F7C1',
    400: '#79F0B8',
    500: '#4FE6AF',
    600: '#3AC4A0',
    700: '#27A590',
    800: '#1A857D',
    900: '#106B6E',
  },
  secondary: {
    100: '#EDE3FE',
    200: '#DBC8FF',
    300: '#C5ACFF',
    400: '#B798FF',
    500: '#9A76FE',
    600: '#7555DA',
    700: '#553BB8',
    800: '#392594',
    900: '#261679',
  },
  warning: {
    100: '#FFF7D2',
    200: '#FEEBA6',
    300: '#FEDE7B',
    400: '#FDD059',
    500: '#FDBA22',
    600: '#D89918',
    700: '#B57A12',
    800: '#915D0A',
    900: '#784806',
  },
  danger: {
    100: '#FFE9D4',
    200: '#FFCAAA',
    300: '#FFA67E',
    400: '#FF8560',
    500: '#FF4A2B',
    600: '#DA2D1F',
    700: '#B81516',
    800: '#930D18',
    900: '#79071A',
  },
  success: {
    100: '#EDFCD3',
    200: '#D8F9A8',
    300: '#B7EE79',
    400: '#95DB56',
    500: '#66C425',
    600: '#4DA81C',
    700: '#378D12',
    800: '#24710B',
    900: '#185E06',
  },
  info: {
    100: '#DCE1FE',
    200: '#BAC3FE',
    300: '#98A3FD',
    400: '#7B8BFC',
    500: '#5263F9',
    600: '#3C49D6',
    700: '#2934B2',
    800: '#1A228F',
    900: '#0F1577',
  },
  neutral: {
    100: '#FFFFFF',
    200: '#E9E9E9',
    300: '#BDBDBD',
    400: '#7C7C7C',
    500: '#262626',
    600: '#201B1C',
    700: '#1B1314',
    800: '#160C0E',
    900: '#12070B',
  },
  red: {
    100: '#FFEBEB',
    200: '#FFBEBE',
    300: '#FF9292',
    400: '#FF6565',
    500: '#FF3838',
    600: '#DD2525',
    700: '#BB1616',
    800: '#990A0A',
    900: '#770101',
  },
};

export const NavigationColors = {
  primary: Colors.primary[600],
};

const scale = width / 320;
export function normalize(size: number) {
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}

/**
 * FontSize
 */
export const FontSize: any = {
  xs2: normalize(8),
  xs: normalize(10),
  sm: normalize(12),
  base: normalize(14),
  lg: normalize(16),
  xl: normalize(18),
  xl2: normalize(20),
  xl3: normalize(24),
  xl4: normalize(30),
  xl5: normalize(36),
};

/**
 * Metrics Sizes
 */
const tiny = 6; // 6
const small = tiny * 2; // 12
const regular = small + 2; // 14
const large = tiny * 3; // 18
const xlarge = large * 2;
export const MetricsSizes = {
  tiny,
  small,
  regular,
  large,
  xlarge,
};

export default {
  Colors,
  NavigationColors,
  FontSize,
  MetricsSizes,
};
