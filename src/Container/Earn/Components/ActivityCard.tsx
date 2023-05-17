import {View, ViewProps} from 'react-native';
import React from 'react';
import Icon from '@Atom/Icon';
import Text from '@Atom/Text';
import useTheme from '@Hooks/useTheme';

interface IActivityCard extends ViewProps {
  name?: string;
  key?: number;
  date?: any;
  max?: boolean;
  exp?: number;
  count?: number;
}

export default function ActivityCard({
  name,
  key,
  date,
  max,
  exp,
  count,
}: IActivityCard) {
  const {Common, Gutters, Layout, Images, Colors, Fonts} = useTheme();
  return (
    <View
      key={key}
      style={[
        Layout.rowHCenter,
        Layout.scrollSpaceBetween,
        Gutters.smallVMargin,
        Layout.alignItemsCenter,
      ]}>
      <View style={[Layout.rowHCenter]}>
        <View
          style={[
            Gutters.smallRMargin,
            Layout.iconWrap,
            {backgroundColor: Colors.secondary[600]},
          ]}>
          <Icon name="box1" size="xl3" color={Colors.neutral[100]} />
        </View>
        <View>
          <Text variant="semibold">{name}</Text>
          {exp ? (
            <Text color={Colors.neutral[400]}>{`${
              exp > 0 ? '+' : ''
            }${exp} XP ${max ? '(max)' : ''}`}</Text>
          ) : null}
        </View>
      </View>
      <View>
        <Text
          style={[Fonts.textRight]}
          color={Colors.primary[600]}
          variant="semibold">
          {count}x
        </Text>
        <Text>{date}</Text>
      </View>
    </View>
  );
}
