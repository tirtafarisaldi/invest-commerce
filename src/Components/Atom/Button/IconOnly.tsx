import useTheme from '@Hooks/useTheme';
import {FontSize} from '@Theme/Variables';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {IButtonIcon} from '.';
import {Icon} from '..';

const IconOnly = ({
  icon,
  iconSize = 'base',
  iconColor,
  noBorder = false,
  borderColor,
  ...props
}: IButtonIcon) => {
  const {Common, Colors} = useTheme();
  const sizeWrapper =
    typeof iconSize === 'string' ? FontSize[iconSize] : iconSize;

  return (
    <TouchableOpacity
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
        name={icon || 'gif-box-outline'}
        size={iconSize}
        color={iconColor ? iconColor : Colors.neutral[500]}
      />
    </TouchableOpacity>
  );
};

export default IconOnly;
