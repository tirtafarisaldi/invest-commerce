import Icon from '@Atom/Icon';
import Text from '@Atom/Text';
import useTheme from '@Hooks/useTheme';
import React from 'react';
import {View, ViewProps} from 'react-native';
import hexToRgba from 'src/Utils/hexToRgba';

interface IProgressBar extends ViewProps {
  data?: any;
  percentage?: any;
  height?: any;
  backgroundColor?: any;
  completedColor?: any;
  leftNumber?: any;
  rightNumber?: number;
  topRightNumber?: number;
}

export default function ProgressBarPlain({
  percentage,
  backgroundColor,
  leftNumber,
  rightNumber,
  topRightNumber,
}: IProgressBar) {
  const {Common, Gutters, Layout, Images, Colors} = useTheme();

  return (
    <View style={{width: '100%'}}>
      <View style={[Layout.justifyContentCenter]}>
        <View style={{alignItems: 'flex-end'}}>
          <Text color={Colors.secondary[700]}>{topRightNumber}th place</Text>
          <View
            style={[
              Layout.progressBarWrap,
              {
                borderColor: backgroundColor,
                backgroundColor: Colors.neutral[400],
              },
            ]}
          />
          <Text color={Colors.neutral[500]}>
            {leftNumber} / {rightNumber} EXP
          </Text>
        </View>
        <View style={Layout.topProgressBar}>
          <View
            style={{
              width: percentage ? percentage : 0,
              height: 17,
              borderRadius: 99,
              backgroundColor: Colors.secondary[700],
            }}
          />
          <View
            style={[
              Layout.rightProgressBar,
              {
                backgroundColor: hexToRgba(Colors.secondary[700], 0.2),
              },
            ]}>
            <Icon name="radio-on" size="xl" color={Colors.secondary[700]} />
          </View>
        </View>
      </View>
    </View>
  );
}
