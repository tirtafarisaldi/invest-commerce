import * as React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';
import MasonryList from '@react-native-seoul/masonry-list';

import {Icon, Text} from '@Atom/index';
import useTheme from '@Hooks/useTheme';
import {navigate} from '@Navigators/utils';
import {CardDataType} from './LeaderBoardCarousel';
import CircleCard from './CircleCard';
import {Colors} from '@Theme/Variables';
import {width} from '@Theme/Layout';

type Props = {
  data: Array<CardDataType>;
  handleShowSortModal: () => void;
  sortTitle: string;
};

const CircleListWrapped = ({data, handleShowSortModal, sortTitle}: Props) => {
  const {t} = useTranslation();
  const {Gutters, Layout} = useTheme();

  const circleTransformList = React.useMemo(
    () => ({
      headline: {
        circleName: data[0].name,
        imageUri: data[0].imageCover,
        trending: data[0].totalRating,
        members: data[0].totalMember,
        posts: data[0].totalPost,
        isPremium: data[0].isPremium,
      },
      children: data.slice(1).map(circle => ({
        circleName: circle.name,
        imageUri: circle.imageCover,
        trending: circle.totalRating,
        members: circle.totalMember,
        posts: circle.totalPost,
        isPremium: circle.isPremium,
      })),
    }),
    [data],
  );

  const handleCardPressed = React.useCallback(() => {
    navigate('CircleDetails');
  }, []);

  const handleFetchMoreData = () => {
    // TODO[Domi]: Implement fetch more data for pagination
  };

  const handleCircleSortedBy = () => {
    // TODO[Domi]: Implement sort data
  };

  const renderMasonryItem = ({item, i}: any) => {
    return (
      <View style={styles.circleWrapper}>
        <CircleCard
          key={i}
          {...item}
          variant="halfSize"
          style={styles.portraitCard}
          onPress={handleCardPressed}
        />
        {i === circleTransformList.children.length - 1 && (
          <View style={styles.loadMoreWrapper}>
            <TouchableOpacity onPress={handleFetchMoreData}>
              <View style={styles.loadMoreButton}>
                <Icon name={'arrow-down'} size="xl4" color={Colors.white} />
              </View>
            </TouchableOpacity>
            <Text color={Colors.primary[600]}>View More</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <React.Fragment>
      <View
        style={[
          Gutters.smallPadding,
          Gutters.smallBMargin,
          Layout.rowHCenter,
          styles.container,
        ]}>
        <Text size="xs">{t('connect.sortBy')}:</Text>
        <TouchableOpacity
          onPress={() => handleShowSortModal()}
          style={[
            Gutters.tinyLMargin,
            Layout.rowHCenter,
            Layout.alignItemsCenter,
          ]}>
          <Text variant="semibold" size={'xs'}>
            {t(`${sortTitle}`.toLowerCase())}
          </Text>
          <View style={[Gutters.tinyLMargin]}>
            <Icon name={'down-triangle'} size="xs" />
          </View>
        </TouchableOpacity>
      </View>

      <MasonryList
        keyExtractor={(item: any): string => item.id}
        contentContainerStyle={styles.masonryContainer}
        numColumns={2}
        data={circleTransformList.children}
        renderItem={renderMasonryItem}
        ListHeaderComponent={
          <CircleCard
            {...circleTransformList.headline}
            style={styles.masonryHeader}
            onPress={handleCardPressed}
          />
        }
        onEndReached={handleFetchMoreData}
      />
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
  },
  masonryHeader: {
    paddingBottom: 16,
  },
  masonryContainer: {
    paddingBottom: 8,
    alignSelf: 'stretch',
  },
  portraitCard: {
    marginLeft: 2,
    marginBottom: 16,
  },
  circleWrapper: {
    flexDirection: 'row',
  },
  loadMoreWrapper: {
    height: width * 0.45,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadMoreButton: {
    marginBottom: 8,
    borderRadius: 26,
    height: 52,
    width: 52,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary[600],
  },
});
export default CircleListWrapped;
