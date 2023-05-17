import {NativeScrollEvent, NativeSyntheticEvent, View} from 'react-native';
import React from 'react';
import Text from '@Atom/Text';
import {useTranslation} from 'react-i18next';
import useTheme from '@Hooks/useTheme';
import {Content} from '@Organism/Basic';
import {CircleCard} from '@Organism/Cards';
import {width} from '@Theme/Layout';
import FastImage from 'react-native-fast-image';

interface ICircle {
  onScroll?: (e: NativeSyntheticEvent<NativeScrollEvent>) => void;
}

const Circle = ({onScroll}: ICircle) => {
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
      {/* {new Array(10).fill('').map((o, idx: number) => (
        <CircleCard
          key={idx}
          width={width - 40}
          height={200}
          isPremium={idx % 2 === 0}
        />
      ))} */}
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

export default Circle;
