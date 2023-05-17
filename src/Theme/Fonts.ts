/**
 * This file contains all application's style relative to fonts
 */
import {StyleSheet} from 'react-native';
import {ThemeVariables} from './theme';

export default function ({FontSize, Colors}: ThemeVariables) {
  return StyleSheet.create({
    textSmall: {
      fontSize: FontSize.base,
      color: Colors.neutral[500],
    },
    textRegular: {
      fontSize: FontSize.normal,
      color: Colors.neutral[500],
    },
    textLarge: {
      fontSize: FontSize.large,
      color: Colors.neutral[500],
    },
    textButton: {
      fontSize: FontSize.base,
      color: Colors.buttonTitle,
    },
    titleSmall: {
      fontSize: FontSize.base * 2,
      fontFamily: 'Poppins-SemiBold',
      color: Colors.neutral[500],
    },
    titleRegular: {
      fontSize: FontSize.normal * 2,
      fontFamily: 'Poppins-Bold',
      color: Colors.neutral[500],
    },
    titleLarge: {
      fontSize: FontSize.large * 2,
      fontFamily: 'Poppins-Bold',
      color: Colors.neutral[500],
    },
    textCenter: {
      textAlign: 'center',
    },
    textJustify: {
      textAlign: 'justify',
    },
    textLeft: {
      textAlign: 'left',
    },
    textRight: {
      textAlign: 'right',
    },
    light: {
      fontFamily: 'Poppins-Light',
    },
    normal: {
      fontFamily: 'Poppins-Regular',
    },
    semibold: {
      fontFamily: 'Poppins-SemiBold',
    },
    bold: {
      fontFamily: 'Poppins-Bold',
    },
  });
}
