import Variables from '@Theme/Variables';
import {StyleProp, TextStyle, TouchableOpacityProps} from 'react-native';
import {IconName, TFontSizes} from '..';
import Button from './Button';

type buttonTypes = 'primary' | 'outline' | 'iconOnly';
type color = typeof Variables.Colors | string | string[];

export interface IButton extends TouchableOpacityProps {
  title?: string;
  type?: buttonTypes;
  loading?: boolean;
  titleSize?: typeof Variables.FontSize | number;
  titleVariant?: 'light' | 'normal' | 'semibold' | 'bold';
}

export interface IButtonPrimary extends Omit<IButton, 'type'> {
  colors?: string;
}

export interface IButtonOutline extends Omit<IButton, 'type'> {
  borderWidth?: number;
  titleStyle?: StyleProp<TextStyle>;
}

export interface IButtonBody extends IButton {
  icon?: IconName;
  iconSize?: TFontSizes;
  iconPosition?: 'left' | 'right';
  iconColor?: string;
  buttonActive?: boolean;
  titleStyle?: StyleProp<TextStyle>;
}

export interface IButtonIcon extends TouchableOpacityProps {
  icon?: IconName;
  iconSize?: TFontSizes;
  iconColor?: string;
  noBorder?: boolean;
  borderColor?: string;
}

export {Button};
