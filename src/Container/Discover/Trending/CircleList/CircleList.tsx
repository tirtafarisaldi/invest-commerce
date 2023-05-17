import {
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {Container, Content} from '@Organism/Basic';
import {HeaderTitle, InputField} from '@Molecule/index';
import {useTranslation} from 'react-i18next';
import useTheme from '@Hooks/useTheme';
import Text from '@Atom/Text';
import Icon from '@Atom/Icon';
import Modal from '@Molecule/Modal';
import {CircleCard} from '@Organism/Cards';
import {width} from '@Theme/Layout';
import {connect} from 'react-redux';
import {getSearch, getTrendingCircle} from '@Actions/discover';
import MasonryList from '@react-native-seoul/masonry-list';
import CirclePotraitCard from '@Organism/Cards/Circle/CirclePortraitCard';
import {RootState} from 'src/Redux/Reducers';

const typeSort = [
  {
    id: 1,
    title: 'All',
    desc: 'In descending order',
  },
  {
    id: 2,
    title: 'Most Relevant',
    desc: 'In descending order',
  },
  {
    id: 3,
    title: 'Most Recent',
    desc: 'In descending order',
  },
];

function CircleList(props: any) {
  const {t} = useTranslation();
  const {Common, Gutters, Layout, Images, Colors, Fonts} = useTheme();

  const [selectedSortBy, setSelectedSortBy] = useState('All');
  const [showModalSort, setModalSort] = useState(false);
  const [loading, setLoading] = useState(false);
  const [trendingCircleList, setTrendingCircleList] = useState([]);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const {_getTrendingCircle, _getSearch} = props;

  useEffect(() => {
    fetchCircle();
  }, []);

  const fetchCircle = () => {
    const fetchData = async () => {
      setLoading(true);
      Promise.all([_getTrendingCircle(9999)]).then((res: any) => {
        setLoading(false);
        setTrendingCircleList(res[0]);
      });
    };
    fetchData();
  };

  const onChangeValue = (e: any) => {
    if (e === '') {
      setLoadingSearch(false);
    }
    setSearchInput(e.replace(' ', ''));
  };

  const showHideSortModal = () => {
    setModalSort(state => !state);
  };

  const selectSortType = (type: string) => {
    setSelectedSortBy(type);
    showHideSortModal();
  };

  const renderModal = () => {
    return (
      <>
        <Modal
          variant="center"
          isVisible={showModalSort}
          hideModal={showHideSortModal}>
          {typeSort?.map((el, i) => {
            return (
              <TouchableOpacity
                key={i}
                onPress={() => selectSortType(el?.title)}
                style={[
                  Layout.rowHCenter,
                  Layout.scrollSpaceBetween,
                  Gutters.smallPadding,
                  {
                    backgroundColor:
                      el?.title === selectedSortBy
                        ? Colors.primary[100]
                        : Colors.neutral[100],
                    borderRadius: 8,
                  },
                ]}>
                <View>
                  <Text variant="semibold">{el?.title}</Text>
                  <Text>{el?.desc}</Text>
                </View>
                {el?.title === selectedSortBy ? (
                  <Icon name="check" size={'xl2'} />
                ) : null}
              </TouchableOpacity>
            );
          })}
        </Modal>
      </>
    );
  };

  const renderSortBy = () => {
    return (
      <View
        style={[
          Common.backgroundLayout,
          Gutters.smallPadding,
          Layout.rowHCenter,
          {justifyContent: 'flex-end'},
        ]}>
        <Text size="xs">{t('searchScreen.sortBy')}:</Text>
        <TouchableOpacity
          onPress={showHideSortModal}
          style={[
            Gutters.tinyLMargin,
            Layout.rowHCenter,
            Layout.alignItemsCenter,
          ]}>
          <Text variant="semibold" size={'xs'}>
            {t(selectedSortBy.toLowerCase())}
          </Text>
          <View style={[Gutters.tinyLMargin]}>
            <Icon name={'down-triangle'} size="xs" />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  useEffect(() => {
    if (searchInput?.length > 1) {
      setLoadingSearch(true);
      const delayDebounceFn = setTimeout(() => {
        setSearchByType(searchInput);
        setLoadingSearch(false);
      }, 3000);

      return () => clearTimeout(delayDebounceFn);
    } else if (searchInput === '') {
      fetchCircle();
    }
  }, [searchInput]);

  const setSearchByType = async (arr: any) => {
    setLoadingSearch(true);
    try {
      await Promise.all([_getSearch(searchInput, 'circle')]).then(res => {
        setLoadingSearch(false);
        setTrendingCircleList(res[0]);
      });
    } catch (error) {
      // Error saving data
      setLoadingSearch(false);
    }
  };

  const renderCircleList = ({item}: any) => {
    return (
      <View style={[Layout.alignItemsCenter, Gutters.smallBMargin]}>
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

  const renderMasonryItem = ({item, i}: any) => {
    return (
      <CirclePotraitCard
        item={item}
        style={{marginLeft: i % 2 === 0 ? 0 : 12}}
      />
    );
  };

  let biggestNumber = Math.max(...trendingCircleList?.map(o => o?.totalRating));
  const highestRating = trendingCircleList?.filter(
    shot => shot?.totalRating === biggestNumber,
  );
  const filteredCircle = trendingCircleList?.filter(
    el => el?.id !== highestRating[0]?.id,
  );

  return (
    <Container>
      <HeaderTitle title={t('discoverScreen.circleList')} />
      <Content
        contentContainerStyle={[{flexGrow: 1}]}
        showsVerticalScrollIndicator={false}>
        {renderModal()}
        <View
          style={[
            Common.backgroundLayout,
            Gutters.regularPadding,
            Gutters.smallTMargin,
            {flexGrow: 1},
          ]}>
          <Text variant="semibold">{t('discoverScreen.circleList')}</Text>
          <Text color={Colors.neutral[400]}>
            {t('discoverScreen.exploreCircleList')}
          </Text>
          <View style={{width: '100%'}}>
            <InputField
              value={searchInput}
              onChangeValue={onChangeValue}
              variant="bordered"
              leftIcon="search"
              iconSize={'xl2'}
              placeholder={'Search'}
            />
          </View>
          {renderSortBy()}
          {loadingSearch || loading ? (
            <View>
              <ActivityIndicator />
            </View>
          ) : (
            <>
              <View style={Layout.alignItemsCenter}>
                <CircleCard
                  key={1}
                  width={width - 70}
                  height={200}
                  isPremium={true}
                  item={highestRating[0]}
                />
              </View>
              <MasonryList
                keyExtractor={(item: any): string => item.id}
                ListHeaderComponent={<View />}
                contentContainerStyle={{
                  paddingHorizontal: 24,
                  alignSelf: 'stretch',
                }}
                onEndReached={() => console.log('onEndReached')}
                numColumns={2}
                data={filteredCircle}
                renderItem={renderMasonryItem}
              />
            </>
          )}
        </View>
      </Content>
    </Container>
  );
}

const mapStateToProps = ({discover}: RootState) => ({});

const mapDispatchToProps = {
  _getTrendingCircle: getTrendingCircle,
  _getSearch: getSearch,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(CircleList);
