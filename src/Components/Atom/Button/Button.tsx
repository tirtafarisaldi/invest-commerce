import useTheme from '@Hooks/useTheme';
import React from 'react';
import {View} from 'react-native';
import {
  IButton,
  IButtonBody,
  IButtonIcon,
  IButtonOutline,
  IButtonPrimary,
} from '.';
import Outline from './Outline';
import Primary from './Primary';

import {Icon, Text} from '..';
import IconOnly from './IconOnly';

type ButtonProps = IButton &
  IButtonBody &
  IButtonOutline &
  IButtonPrimary &
  IButtonIcon;

export const ButtonBody = ({
  title,
  titleSize,
  titleVariant = 'semibold',
  titleStyle,
  icon,
  iconPosition = 'left',
  iconSize,
  iconColor,
}: IButtonBody) => {
  const {Layout, Gutters, Fonts, Colors} = useTheme();
  const iconPos = iconPosition === 'right' ? Layout.rowReverse : Layout.row;

  return (
    <View style={[Layout.rowCenter, iconPos, {paddingHorizontal: 30}]}>
      {icon ? (
        <View style={Gutters.smallHMargin}>
          <Icon
            name={icon}
            size={iconSize ? iconSize : titleSize}
            color={iconColor ? iconColor : Colors.buttonTitle}
          />
        </View>
      ) : null}
      <Text
        text={title}
        size={titleSize}
        variant={titleVariant}
        style={[Fonts.textButton, titleStyle]}
      />
    </View>
  );
};

const Button = ({type = 'primary', ...props}: ButtonProps) => {
  switch (type) {
    case 'primary':
      return <Primary {...props} />;
    case 'outline':
      return <Outline {...props} />;
    case 'iconOnly':
      return <IconOnly {...props} />;
    default:
      return <Primary {...props} />;
  }
};

export default Button;
