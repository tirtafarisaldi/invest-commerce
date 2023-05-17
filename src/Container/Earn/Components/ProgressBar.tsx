import Text from '@Atom/Text';
import useTheme from '@Hooks/useTheme';
import React, {useState} from 'react';
import {View, ViewProps} from 'react-native';
import {earnStyle} from '../Style/style';

interface IProgrssBar extends ViewProps {
  data?: any;
  percentage?: any;
  height?: any;
  backgroundColor?: any;
  completedColor?: any;
  numberOfPercent?: any;
}

export default function ProgressBar({
  data,
  percentage,
  height,
  backgroundColor,
  completedColor,
  numberOfPercent,
}: IProgrssBar) {
  const {Common, Gutters, Layout, Images, Colors} = useTheme();

  return (
    <View style={earnStyle.ninetyWidth}>
      <View style={[Layout.justifyContentCenter, {marginTop: 30}]}>
        <View
          style={[
            earnStyle.progressBarWrap,
            {
              borderColor: backgroundColor,
              backgroundColor: Colors.neutral[200],
            },
          ]}
        />
        <View
          style={[
            earnStyle.topProgressBar,
            {
              width: percentage ? percentage : 0,
              height: height,
              backgroundColor: completedColor,
            },
          ]}
        />
      </View>
      <View style={[Layout.rowHCenter, Layout.scrollSpaceBetween]}>
        {data?.map((el: any, i: number) => {
          return (
            <View style={Layout.alignItemsCenter} key={i}>
              <View
                style={[
                  earnStyle.progressBarContent,
                  {
                    backgroundColor: Colors.neutral[200],
                  },
                ]}>
                <View
                  style={[
                    earnStyle.progressBarIcon,
                    {
                      backgroundColor:
                        numberOfPercent > el?.exp || i === 0
                          ? Colors.secondary[500]
                          : Colors.neutral[200],
                    },
                  ]}
                />
              </View>
              <View style={earnStyle.minusTopAndCenter}>
                <Text size="xs" color={Colors.neutral[400]} key={i}>
                  {el?.name}
                </Text>
                <Text size="xs" color={Colors.neutral[400]}>
                  {el?.exp} XP
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}
