import {
  View,
  FlatList,
  Pressable,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import useTheme from '@Hooks/useTheme';
import {navigate} from '@Navigators/utils';
import Text from '@Atom/Text';
import {useTranslation} from 'react-i18next';
import FastImage from 'react-native-fast-image';
import Icon from '@Atom/Icon';
import {CircleCard} from '@Organism/Cards';
import {width} from '@Theme/Layout';
import PlayCard from '../Components/Card/PlayCard';
import AssetTrendingCard from '../Components/Card/AssetTrendingCard';
import {connect} from 'react-redux';
import {RootState} from 'src/Redux/Reducers';
import {getTrendingAsset, getTrendingCircle} from '@Actions/discover';

const data = [
  {id: 0, title: 'Anti Rungkad'},
  {id: 1, title: 'Anti Rangkud'},
  {id: 2, title: 'Anti Rungkad'},
];

const trendingList = [
  {
    id: 1,
    name: 'Circle',
    page: 'CircleListScreen',
  },
  {
    id: 2,
    name: 'Asset',
  },
  {
    id: 3,
    name: 'People',
  },
  {
    id: 4,
    name: 'Play',
  },
];

function TrendingToday(props: any) {
  const {Gutters, Colors, Layout, Images, Common} = useTheme();
  const {t} = useTranslation();

  const {_getTrendingCircle, _getTrendingAsset} = props;

  const keyExtractor = useCallback(item => item?.id.toString(), []);

  const [selectedTrend, setSelectedTrends] = useState({
    id: 1,
    name: 'Circle',
    page: 'CircleListScreen',
  });
  const [indexCircle, setIndexCircle] = useState(0);
  const [loading, setLoading] = useState(false);
  const [trendingCircleList, setTrendingCircleList] = useState([]);
  const [trendingAssetList, setTrendingAssetList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      Promise.all([_getTrendingCircle(3), _getTrendingAsset(3)]).then(
        (res: any) => {
          setLoading(false);
          setTrendingCircleList(res[0]);
          setTrendingAssetList(res[1]);
        },
      );
    };
    fetchData();
  }, []);

  const renderTrendingCircleItem = ({item}: any) => {
    return (
      <View style={Gutters.tinyHPadding}>
        <CircleCard
          key={1}
          width={width - 40}
          height={200}
          isPremium={true}
          item={item}
        />
      </View>
    );
  };

  const renderTrendingAssetItem = ({item}: any) => {
    console.log(item, 'itemdon');

    return (
      <View style={[Gutters.tinyHMargin]}>
        <AssetTrendingCard item={item} />
      </View>
    );
  };

  const renderTrendingPlayItem = ({item}: any) => {
    return (
      <View style={Gutters.tinyHPadding}>
        <PlayCard
          width={width - 60}
          img={Images.trending.trending2}
          title={item?.title}
        />
      </View>
    );
  };

  const selectTrend = (item: any) => {
    setSelectedTrends(item);
  };

  const toNavigate = () => {
    let screen = `${selectedTrend?.name}ListScreen`;
    navigate(screen as never);
  };

  const HeaderComponent = () => (
    <View
      style={{
        ...Gutters.smallPadding,
        backgroundColor: Colors.neutral[100],
      }}>
      <Text
        text={t('discoverScreen.trendingToday')}
        variant="semibold"
        size={'lg'}
      />
      <Text
        text={t('discoverScreen.whatIsTrendingToday')}
        color={Colors.neutral[400]}
      />
      <View
        style={[
          Layout.row,
          Layout.scrollSpaceBetween,
          Layout.alignItemsCenter,
          Gutters.smallTMargin,
        ]}>
        <View style={[Layout.row, Layout.alignItemsCenter]}>
          {trendingList?.map((el: any, i: number) => {
            return (
              <TouchableOpacity
                key={i}
                style={[
                  Gutters.largeRMargin,
                  {
                    borderBottomWidth: selectedTrend?.id === el?.id ? 3 : 0,
                    borderRadius: 3,
                    borderColor: Colors.primary[600],
                  },
                ]}
                onPress={() => selectTrend(el)}>
                <Text
                  color={
                    selectedTrend?.id === el?.id
                      ? Colors.neutral[500]
                      : Colors.neutral[300]
                  }>
                  {el?.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <Pressable onPress={toNavigate}>
          <Text
            text={t('discoverScreen.seeAll')}
            size={'sm'}
            color={Colors.primary[600]}
          />
        </Pressable>
      </View>
    </View>
  );

  const renderPointList = () => {
    return (
      <View
        style={[
          Layout.rowHCenter,
          Gutters.tinyPadding,
          Layout.alignItemsCenter,
          Layout.justifyContentCenter,
          Common.backgroundLayout,
          Gutters.smallBPadding,
        ]}>
        {/* {data?.map((el: any, i: number) => {
          return (
            <View style={{paddingHorizontal: 3}}>
              <Icon
                size="xs"
                name="dot"
                color={
                  indexCircle === el?.id
                    ? Colors.primary[600]
                    : Colors.neutral[300]
                }
              />
            </View>
          );
        })} */}
      </View>
    );
  };

  const onChangeIndex = (e: any) => {
    const contentOffset = e.nativeEvent.contentOffset;
    const viewSize = e.nativeEvent.layoutMeasurement;
    // Divide the horizontal offset by the width of the view to see which page is visible
    const newIndex = Math.ceil(contentOffset.x / viewSize.width);
    setIndexCircle(newIndex);
    // scrollToIndex();
  };

  // const scrollToIndex = () => {
  //   circleRef?.current?.scrollToIndex({animated: true, index: indexCircle});
  // };

  return (
    <View>
      <HeaderComponent />
      {loading ? (
        <View>
          <ActivityIndicator />
        </View>
      ) : (
        <>
          {/* Circle */}
          {selectedTrend?.id === 1 && (
            <FlatList
              data={trendingCircleList}
              renderItem={renderTrendingCircleItem}
              keyExtractor={keyExtractor}
              horizontal
              onEndReachedThreshold={0.5}
              nestedScrollEnabled
              contentContainerStyle={{
                backgroundColor: Colors.neutral[100],
                padding: 10,
              }}
              showsHorizontalScrollIndicator={false}
              onMomentumScrollEnd={onChangeIndex}
            />
          )}
          {/* Asset */}
          {selectedTrend?.id === 2 && (
            <FlatList
              data={trendingAssetList}
              renderItem={renderTrendingAssetItem}
              keyExtractor={(item: any) => item?.id}
              horizontal
              onEndReachedThreshold={0.5}
              nestedScrollEnabled
              contentContainerStyle={{
                backgroundColor: Colors.neutral[100],
                padding: 10,
              }}
              showsHorizontalScrollIndicator={false}
            />
          )}
          {/* Play */}
          {selectedTrend?.id === 4 && (
            <FlatList
              data={data}
              renderItem={renderTrendingPlayItem}
              keyExtractor={keyExtractor}
              horizontal
              onEndReachedThreshold={0.5}
              nestedScrollEnabled
              contentContainerStyle={{
                backgroundColor: Colors.neutral[100],
                padding: 10,
              }}
              showsHorizontalScrollIndicator={false}
            />
          )}
        </>
      )}
    </View>
  );
}

const mapStateToProps = ({discover}: RootState) => ({});

const mapDispatchToProps = {
  _getTrendingCircle: getTrendingCircle,
  _getTrendingAsset: getTrendingAsset,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(TrendingToday);
