import {View} from 'react-native';
import React from 'react';
import useTheme from '@Hooks/useTheme';
import Text from '@Atom/Text';
import Icon from '@Atom/Icon';
import {earnStyle} from '../Style/style';

export default function RewardsCard({
  title,
  underTitle,
  iconColor,
  style,
  fontColor,
  index,
}: any) {
  const {Common, Gutters, Layout, Images, Colors, Fonts} = useTheme();

  return (
    <View
      key={index}
      style={[
        Gutters.largeHPadding,
        Gutters.largeVPadding,
        Layout.rowHCenter,
        Layout.scrollSpaceBetween,
        earnStyle.rewardsCardWrap,
        {
          borderColor: Colors.neutral[200],
        },
        style,
      ]}>
      <View style={earnStyle.eightyWidth}>
        <Text variant="semibold" size="base" color={fontColor}>
          {title}
        </Text>
        <Text color={fontColor ? fontColor : Colors.neutral[400]}>
          {underTitle}
        </Text>
      </View>
      <View>
        <Icon name="box1" size="xl5" color={iconColor} />
      </View>
    </View>
  );
}
