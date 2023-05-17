import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Text from '@Atom/Text';
import {useTranslation} from 'react-i18next';
import useTheme from '@Hooks/useTheme';
import {Content} from '@Organism/Basic';
import {Button} from '@Atom/Button';
import Icon from '@Atom/Icon';
import FastImage from 'react-native-fast-image';
import {width} from '@Theme/Layout';

interface IPlay {
  onScroll?: (e: NativeSyntheticEvent<NativeScrollEvent>) => void;
}

const Play = ({onScroll}: IPlay) => {
  const {Layout, Common, Colors, Gutters, Images} = useTheme();
  const {t} = useTranslation();

  return (
    <Content
      showsVerticalScrollIndicator={false}
      onScroll={onScroll}
      contentContainerStyle={[
        Common.backgroundLayout,
        Gutters.smallPadding,
        {flexGrow: 1},
      ]}
      overScrollMode="always">
      {/* <View style={[Common.backgroundLayout, Gutters.smallPadding]}>
        <View style={[Layout.rowHCenter, Layout.justifyContentBetween]}>
          <Text variant="bold" size="lg">
            Period
          </Text>
          <TouchableOpacity
            style={[
              Layout.rowCenter,
              Gutters.tinyVPadding,
              Gutters.smallHPadding,
              Layout.round,
              {backgroundColor: Colors.primary[600]},
            ]}>
            <Text
              size="sm"
              variant="semibold"
              color={Colors.white}
              style={[Gutters.tinyRMargin]}>
              All
            </Text>
            <Icon name="down-triangle" size="xs" color={Colors.white} />
          </TouchableOpacity>
        </View>
        <View
          style={[
            Layout.smallRound,
            Gutters.smallVMargin,
            {borderWidth: 1, borderColor: Colors.neutral[300]},
          ]}>
          <View
            style={[
              Layout.rowHCenter,
              Layout.smallRoundTopEnd,
              {backgroundColor: Colors.primary[100]},
            ]}>
            <View style={[Layout.center, Gutters.smallPadding, {flex: 0.4}]}>
              <Text color={Colors.primary[600]}>Rank</Text>
            </View>
            <View
              style={[
                Layout.center,
                Gutters.smallPadding,
                {
                  flex: 1,
                  borderRightWidth: 1,
                  borderLeftWidth: 1,
                  borderColor: Colors.neutral[300],
                },
              ]}>
              <Text color={Colors.primary[600]}>Name Arena</Text>
            </View>
            <View style={[Layout.center, Gutters.smallPadding, {flex: 1}]}>
              <Text color={Colors.primary[600]}>Tgl End Game</Text>
            </View>
          </View>
          {new Array(5).fill('').map((o, idx: number) => (
            <View
              key={idx}
              style={[
                Layout.rowHCenter,
                {borderTopWidth: 1, borderColor: Colors.neutral[300]},
              ]}>
              <View style={[Layout.center, Gutters.smallPadding, {flex: 0.4}]}>
                <Text color={Colors.neutral[500]}>{idx + 1}</Text>
              </View>
              <View
                style={[
                  Layout.center,
                  Gutters.smallPadding,
                  {
                    flex: 1,
                    borderRightWidth: 1,
                    borderLeftWidth: 1,
                    borderColor: Colors.neutral[300],
                  },
                ]}>
                <Text color={Colors.neutral[500]}>Trial {idx + 1}</Text>
              </View>
              <View style={[Layout.center, Gutters.smallPadding, {flex: 1}]}>
                <Text color={Colors.neutral[500]}>5 Dec 22 15:45</Text>
              </View>
            </View>
          ))}
        </View>
        <View style={[Layout.rowHCenter, Layout.justifyContentBetween]}>
          <Text>Showing 1 of 10</Text>
          <View style={[Layout.rowHCenter]}>
            <TouchableOpacity>
              <Icon name="chevron-left" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                Layout.smallRound,
                Layout.center,
                Gutters.tinyLMargin,
                {backgroundColor: Colors.primary[600], width: 30, height: 30},
              ]}>
              <Text color={Colors.white} variant="semibold">
                1
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                Layout.smallRound,
                Layout.center,
                Gutters.tinyHMargin,
                {backgroundColor: Colors.white, width: 30, height: 30},
              ]}>
              <Text color={Colors.neutral[400]} variant="semibold">
                2
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                Layout.smallRound,
                Layout.center,
                Gutters.tinyRMargin,
                {backgroundColor: Colors.white, width: 30, height: 30},
              ]}>
              <Text color={Colors.neutral[400]} variant="semibold">
                3
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon name="chevron-right" />
            </TouchableOpacity>
          </View>
        </View>
      </View> */}
      {/* DISPLAY WHEN POST EMPTY */}
      <View style={[Layout.fill, Layout.center]}>
        <FastImage
          source={Images.profile.emptyPost}
          resizeMode={FastImage.resizeMode.contain}
          style={[{width: width / 1.7, height: width / 1.7}]}
        />
        <Text variant="semibold" size="base">
          {t('myProfileScreen.oops')}
        </Text>
        <Text color={Colors.neutral[400]}>
          {t('myProfileScreen.emptyCircle')}
        </Text>
      </View>
    </Content>
  );
};

export default Play;
