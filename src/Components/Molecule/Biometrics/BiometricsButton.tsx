import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import React from 'react';
import useTheme from '@Hooks/useTheme';
import Icon from '@Atom/Icon';
import useBiometrics from '@Hooks/useBiometrics';
import {IconName, TFontSizes} from '@Atom/index';

interface IBiometricsButton extends TouchableOpacityProps {
  iconSize?: TFontSizes;
  iconColor?: string;
  noBorder?: boolean;
  borderColor?: string;
}

const BiometricsButton = ({
  iconSize = 'base',
  iconColor,
  noBorder = false,
  borderColor,
  ...props
}: IBiometricsButton) => {
  const {Common, Colors, FontSize} = useTheme();
  const {availableBiometry, isKeyExist} = useBiometrics();
  const sizeWrapper =
    typeof iconSize === 'string' ? FontSize[iconSize] : iconSize;

  const getIconName = (): IconName => {
    switch (availableBiometry) {
      case 'FaceID':
        return 'face-id';
      case 'TouchID':
      case 'Biometrics':
      default:
        return 'fingerprint';
    }
  };

  if (availableBiometry === 'none' || !isKeyExist) return null;

  return (
    <TouchableOpacity
      disabled={!props.onPress}
      {...props}
      style={[
        Common.button.icon,
        {width: sizeWrapper * 2},
        {
          borderWidth: noBorder ? 0 : 2,
          borderColor: borderColor || Colors.neutral[500],
        },
        props.style ? props.style : {},
      ]}>
      <Icon
        name={getIconName()}
        size={iconSize}
        color={iconColor ? iconColor : Colors.neutral[500]}
      />
    </TouchableOpacity>
  );
};

export default BiometricsButton;

const styles = StyleSheet.create({});
