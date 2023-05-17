import {
  View,
  Text,
  TouchableOpacityProps,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import useTheme from '@Hooks/useTheme';

interface IAvatar extends TouchableOpacityProps {
  size: number;
  imageUrl?: string;
  isOnline?: boolean;
  borderColor?: string;
}

const Avatar = ({size, imageUrl, borderColor, isOnline, ...props}: IAvatar) => {
  const {Images, Layout, Colors} = useTheme();
  return (
    <TouchableOpacity
      disabled={!props.onPress}
      style={[
        Layout.round,
        {borderWidth: borderColor ? size / 25 : 0, borderColor},
      ]}
      {...props}>
      <FastImage
        source={imageUrl ? {uri: imageUrl} : Images.profile.user}
        style={[Layout.round, {width: size, height: size}]}
        resizeMode={FastImage.resizeMode.contain}
      />
      {isOnline ? (
        <View
          style={[
            Layout.round,
            {
              position: 'absolute',
              right: 0,
              bottom: size / 20,
              width: size / 4,
              height: size / 4,
              backgroundColor: Colors.primary[500],
              borderColor: Colors.neutral[200],
              borderWidth: size / 30,
            },
          ]}
        />
      ) : null}
    </TouchableOpacity>
  );
};

export default Avatar;
