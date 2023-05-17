import useTheme from '@Hooks/useTheme';
import React from 'react';
import {ActivityIndicator, TouchableOpacity} from 'react-native';
import {ButtonBody} from './Button';
import {IButtonPrimary} from './index';

const Primary = ({
  title,
  loading,
  colors,
  titleSize = 'base',
  ...props
}: IButtonPrimary) => {
  const {Colors, Gutters, Common} = useTheme();
  const defaultColors = props.disabled
    ? Colors.disabled
    : colors
    ? colors
    : Colors.primary[600];

  return (
    <TouchableOpacity
      disabled={loading}
      {...props}
      activeOpacity={0.8}
      style={[
        Common.button.base,
        Gutters.tinyVPadding,
        {
          backgroundColor: defaultColors,
        },
        props.style ? props.style : {},
      ]}>
      {loading ? (
        <ActivityIndicator size="small" color={Colors.white} />
      ) : (
        <ButtonBody {...props} title={title} titleSize={titleSize} />
      )}
    </TouchableOpacity>
  );
};

export default Primary;
