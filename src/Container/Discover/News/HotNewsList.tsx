import {FlatList, ImageBackground, Pressable, View} from 'react-native';
import React, {useCallback} from 'react';
import {Content} from '@Organism/Basic';
import Text from '@Atom/Text';
import {INews} from '..';
import useTheme from '@Hooks/useTheme';
import {useTranslation} from 'react-i18next';
import {width} from '@Theme/Layout';
import {navigate} from '@Navigators/utils';

interface IHotNewsList {
  data: INews[];
  loading?: boolean;
}

const HotNewsList = ({data}: IHotNewsList) => {
  const {Gutters, Colors, Common} = useTheme();
  const {discoverStyle} = Common;
  const {t} = useTranslation();

  const keyExtractor = useCallback(item => item?.id.toString(), []);

  const renderNewsItem = useCallback(
    ({item, index}: {item: INews; index: number}) => {
      const openDetail = () => navigate('DetailNews', {item});
      return (
        <ImageBackground
          key={index}
          source={{uri: item?.imageUrl}}
          style={[discoverStyle.itemHotNews, {maxHeight: width * 0.5}]}
          imageStyle={discoverStyle.itemHotNewsImage}>
          <Pressable
            onPress={openDetail}
            style={discoverStyle.itemHotNewsContent}>
            <View style={discoverStyle.itemHotNewsContentBadge}>
              <Text
                text={t('discoverScreen.hotNews')}
                color={Colors.neutral[200]}
                size={'sm'}
                style={discoverStyle.badgeHotNews}
              />
            </View>

            <Text
              text={item?.title}
              color={Colors.neutral[100]}
              style={discoverStyle.itemHotNewsTitle}
              numberOfLines={2}
              variant="semibold"
            />
          </Pressable>
        </ImageBackground>
      );
    },
    [],
  );

  return (
    <Content
      contentContainerStyle={{
        ...Gutters.smallVPadding,
        backgroundColor: Colors.neutral[100],
      }}>
      <Text
        text={t('discoverScreen.hotNews')}
        variant="semibold"
        size={'lg'}
        style={{...Gutters.smallLPadding, ...Gutters.regularBMargin}}
      />
      <FlatList
        data={data}
        renderItem={renderNewsItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={{...Gutters.smallLPadding}}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </Content>
  );
};

export default HotNewsList;
