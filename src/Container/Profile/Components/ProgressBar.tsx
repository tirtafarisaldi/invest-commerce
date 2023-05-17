import {View, ViewProps} from 'react-native';
import React, {useEffect, useState} from 'react';
import useTheme from '@Hooks/useTheme';
import {ITierStep} from 'src/Interfaces/APIPayload/Earn';
import {Text} from '@Atom/index';

interface IProgressBar extends ViewProps {
  bulletSize?: number;
  activeColor?: string;
  inactiveColor?: string;
  currentExp: number;
  nextExp: number;
  tierList: ITierStep[];
}

const ProgressBar = ({
  bulletSize = 20,
  activeColor,
  inactiveColor,
  currentExp,
  nextExp,
  tierList,
  style,
  ...props
}: IProgressBar) => {
  const {Layout, Gutters, Colors} = useTheme();

  const [data, setData] = useState({
    trailWidth: 0,
    activeTierIndex: 0,
    distanceToNext: 0,
    isCurrentExpTier: false,
  });

  const _getProgressWidth = () => {
    if (tierList.length < 1 || data.trailWidth === 0) return;
    let isCurrentExpTier = false;
    let currentTierIndex = 0;
    for (let i = 0; i < tierList.length; i++) {
      if (currentExp === tierList[i].exp) isCurrentExpTier = true;
      if (currentExp >= tierList[i].exp) currentTierIndex = i;
    }
    const distanceBetweenNextTier =
      tierList?.[currentTierIndex + 1]?.exp - tierList?.[currentTierIndex]?.exp;
    const distanceToNext =
      nextExp === 0 || isCurrentExpTier
        ? 0
        : ((currentExp - tierList[currentTierIndex].exp) /
            distanceBetweenNextTier) *
          data.trailWidth;

    setData(prev => ({
      ...prev,
      activeTierIndex: currentTierIndex,
      distanceToNext: isNaN(distanceToNext) ? 0 : distanceToNext,
      isCurrentExpTier,
    }));
  };

  useEffect(() => {
    _getProgressWidth();
  }, [tierList, data.trailWidth]);

  return (
    <View style={[Layout.rowCenter, Layout.fill, style]} {...props}>
      {Array(4)
        .fill('')
        .map((o: any, idx: number) => (
          <View
            key={idx}
            style={[
              Layout.rowCenter,
              Layout.fill,
              Layout.justifyContentBetween,
            ]}>
            <View
              style={[
                Layout.round,
                {
                  padding: bulletSize / 4,
                  backgroundColor: inactiveColor
                    ? inactiveColor
                    : Colors.neutral[200],
                },
              ]}>
              <View
                style={[
                  Layout.round,
                  {
                    height: bulletSize,
                    width: bulletSize,
                    backgroundColor:
                      data.activeTierIndex >= idx
                        ? activeColor
                          ? activeColor
                          : Colors.primary[600]
                        : inactiveColor
                        ? inactiveColor
                        : Colors.neutral[200],
                  },
                ]}
              />
            </View>
            <View
              style={[
                Layout.fill,
                {
                  height: bulletSize / 4,
                  backgroundColor: inactiveColor
                    ? inactiveColor
                    : Colors.neutral[200],
                },
              ]}
              onLayout={e => {
                const {width} = e.nativeEvent.layout;
                setData(prev => ({
                  ...prev,
                  trailWidth: width,
                }));
              }}>
              <View
                style={[
                  Layout.fill,
                  {
                    height: bulletSize / 4,
                    width:
                      data.activeTierIndex > idx
                        ? data.trailWidth
                        : data.distanceToNext,
                    borderTopRightRadius: 5,
                    borderBottomRightRadius: 5,
                    backgroundColor:
                      data.activeTierIndex === idx && data.isCurrentExpTier
                        ? 'transparent'
                        : data.activeTierIndex < idx
                        ? 'transparent'
                        : activeColor || Colors.primary[600],
                  },
                ]}
              />
            </View>
          </View>
        ))}
      <View
        style={[
          Layout.round,
          {
            padding: bulletSize / 4,
            backgroundColor: inactiveColor
              ? inactiveColor
              : Colors.neutral[200],
          },
        ]}>
        <View
          style={[
            Layout.round,
            {
              height: bulletSize,
              width: bulletSize,
              backgroundColor:
                data.activeTierIndex === tierList.length - 1
                  ? activeColor
                    ? activeColor
                    : Colors.primary[600]
                  : inactiveColor
                  ? inactiveColor
                  : Colors.neutral[200],
            },
          ]}
        />
      </View>
    </View>
  );
};

export default ProgressBar;
