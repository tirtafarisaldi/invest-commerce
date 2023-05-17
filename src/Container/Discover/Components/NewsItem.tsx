import Text from '@Atom/Text';
import useTheme from '@Hooks/useTheme';
import {CommonActions, useNavigation} from '@react-navigation/native';
import moment from 'moment';
import React from 'react';
import {Pressable, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {INews} from '..';
import {capitalizeFirstLetter, uuidv4} from '@Utils/helpers';

const NewsItem = ({item, index}: {item: INews; index: number}) => {
  const {Gutters, Colors, Common} = useTheme();
  const {discoverStyle} = Common;
  let navigation = useNavigation();
  const openDetail = () => {
    const keystring = `${item.id}-detail_${uuidv4()}`;
    return navigation.dispatch(
      CommonActions.navigate({
        name: 'DetailNews',
        params: {item},
        key: keystring,
      }),
    );
  };

  return (
    <Pressable
      key={`${index}-${item.id}-${item.title}_${Math.random()}`}
      onPress={openDetail}
      style={discoverStyle.ymlItem}>
      <View style={discoverStyle.ymlLeftItem}>
        <View style={discoverStyle.ymlTagCategory}>
          <Text
            text={capitalizeFirstLetter(item.category)}
            color={Colors.neutral[100]}
          />
        </View>
        <Text
          text={item.title}
          numberOfLines={2}
          variant="semibold"
          style={{...Gutters.smallTMargin}}
        />
        <View style={discoverStyle.ymlContentItem}>
          <FastImage
            source={{uri: item.imageUrl}}
            resizeMode={FastImage.resizeMode.cover}
            style={discoverStyle.ymlAuthorIco}
          />
          <Text
            text={item.author}
            color={Colors.neutral[400]}
            style={discoverStyle.ymlAuthorName}
            numberOfLines={1}
          />
          <View style={discoverStyle.customDotSeparator} />
          <Text
            text={moment(item?.publicationDate).startOf('hour').fromNow()}
            color={Colors.neutral[400]}
            style={discoverStyle.ymlAuthorName}
            numberOfLines={1}
          />
        </View>
      </View>

      <FastImage
        source={{uri: item.imageUrl}}
        resizeMode={FastImage.resizeMode.cover}
        style={discoverStyle.ymlImageThumbnail}
      />
    </Pressable>
  );
};

export default NewsItem;
