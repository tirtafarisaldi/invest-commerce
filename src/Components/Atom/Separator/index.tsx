import React from 'react';
import {View} from 'react-native';
import useTheme from '@Hooks/useTheme';

interface Props {
  size?: {
    width?: number;
    height?: number;
  };
  margin?: number;
  variant: 'horizontal' | 'vertical';
  color?: string;
}

const Separator = (props: Props) => {
  const {Layout} = useTheme();
  return (
    <View
      style={[
        {
          backgroundColor: props.color || '#E9E9E9',
          width: props.size?.width,
          height: props.size?.height,
        },
        props.variant === 'vertical'
          ? {
              marginHorizontal: props.margin,
            }
          : [
              {
                marginVertical: props.margin,
              },
              Layout.fullWidth,
            ],
      ]}
    />
  );
};

export default Separator;
