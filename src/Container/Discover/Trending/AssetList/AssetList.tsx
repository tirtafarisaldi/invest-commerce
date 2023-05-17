import {
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Container, Content} from '@Organism/Basic';
import {HeaderTitle, InputField} from '@Molecule/index';
import {useTranslation} from 'react-i18next';
import useTheme from '@Hooks/useTheme';
import Text from '@Atom/Text';
import Icon from '@Atom/Icon';
import Modal from '@Molecule/Modal';
import AssetCard from '@Container/Discover/Components/Card/AssetCard';
import {RootState} from 'src/Redux/Reducers';
import {connect} from 'react-redux';
import {getSearch, getTrendingAsset} from '@Actions/discover';

const typeSort = [
  {
    id: 1,
    title: 'All',
    desc: 'Show all assets',
  },
  {
    id: 2,
    title: 'Top Gainers',
    desc: 'Highest rise',
  },
  {
    id: 3,
    title: 'Top Lowest',
    desc: 'Lowest rise',
  },
  {
    id: 4,
    title: 'Most Trades',
    desc: 'Largest number of traders',
  },
];

function AssetList(props: any) {
  const {t} = useTranslation();
  const {Common, Gutters, Layout, Images, Colors, Fonts} = useTheme();

  const [searchInput, setSearchInput] = useState('');
  const [selectedSortBy, setSelectedSortBy] = useState('All');
  const [showModalSort, setModalSort] = useState(false);
  const [loading, setLoading] = useState(false);
  const [trendingAssetList, setTrendingAssetList] = useState([]);
  const [loadingSearch, setLoadingSearch] = useState(false);

  const {_getTrendingAsset, _getSearch} = props;

  useEffect(() => {
    fetchCircle();
  }, []);

  const fetchCircle = () => {
    const fetchData = async () => {
      setLoading(true);
      Promise.all([_getTrendingAsset(9999)]).then((res: any) => {
        setLoading(false);
        setTrendingAssetList(res[0]);
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
      await Promise.all([_getSearch(searchInput, 'asset')]).then(res => {
        setLoadingSearch(false);
        setTrendingAssetList(res[0]);
      });
    } catch (error) {
      // Error saving data
      setLoadingSearch(false);
    }
  };

  const showHideSortModal = () => {
    setModalSort(state => !state);
  };

  const selectSortType = (type: string) => {
    setSelectedSortBy(type);
    showHideSortModal();
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

  const renderList = ({item}: any) => {
    return (
      <View style={Gutters.smallBMargin} key={item?.price}>
        <AssetCard item={item} />
      </View>
    );
  };

  return (
    <Container>
      <HeaderTitle title={t('discoverScreen.assetList')} />
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
          <Text variant="semibold">{t('discoverScreen.assetList')}</Text>
          <Text color={Colors.neutral[400]}>
            {t('discoverScreen.exploreAssetList')}
          </Text>
          <View style={[Gutters.tinyTMargin, {width: '100%'}]}>
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
          {loading || loadingSearch ? (
            <View style={Gutters.smallTMargin}>
              <ActivityIndicator size="large" color={Colors.secondary[600]} />
            </View>
          ) : (
            <FlatList
              data={trendingAssetList}
              keyExtractor={(item, index) => 'key' + index}
              renderItem={renderList}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      </Content>
    </Container>
  );
}

const mapStateToProps = ({discover}: RootState) => ({});

const mapDispatchToProps = {
  _getTrendingAsset: getTrendingAsset,
  _getSearch: getSearch,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(AssetList);
