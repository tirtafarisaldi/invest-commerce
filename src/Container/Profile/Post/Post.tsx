import {NativeScrollEvent, NativeSyntheticEvent, View} from 'react-native';
import React from 'react';
import Text from '@Atom/Text';
import {useTranslation} from 'react-i18next';
import useTheme from '@Hooks/useTheme';
import {Content} from '@Organism/Basic';
import {PostCard} from '@Organism/Cards';
import FastImage from 'react-native-fast-image';
import {width} from '@Theme/Layout';

interface IPost {
  onScroll?: (e: NativeSyntheticEvent<NativeScrollEvent>) => void;
}

const Post = ({onScroll}: IPost) => {
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
        <PostCard key={idx} contentType="pie" />
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
          {t('myProfileScreen.emptyPost')}
        </Text>
      </View>
    </Content>
  );
};

export default Post;
