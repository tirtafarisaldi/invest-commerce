import {View, TouchableOpacityProps, TouchableOpacity} from 'react-native';
import React from 'react';
import useTheme from '@Hooks/useTheme';
import Text from '@Atom/Text';

interface IButtonWithLogo extends TouchableOpacityProps {
  label: string;
  Logo?: any;
  logoPosition?: 'left' | 'right';
  onPress: () => void;
}

const ButtonWithLogo = ({
  label,
  onPress,
  Logo,
  logoPosition = 'left',
  style,
  ...props
}: IButtonWithLogo) => {
  const {Common, Colors, Gutters, Layout, Images} = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[
        Common.button.base,
        Gutters.smallVPadding,
        {
          backgroundColor: Colors.white,
          shadowColor: Colors.neutral[400],
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.5,
          shadowRadius: 2,
          elevation: 2,
        },
        style ? style : {},
      ]}
      {...props}>
      {Logo ? <Logo /> : null}
      <Text
        variant="semibold"
        style={[
          logoPosition === 'left' ? Gutters.smallLMargin : Gutters.smallRMargin,
        ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default ButtonWithLogo;
