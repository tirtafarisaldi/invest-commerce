import ButtonSimple from '@Atom/Button/ButtonSimple';
import {Icon, Text} from '@Atom/index';
import useTheme from '@Hooks/useTheme';
import {HeaderWithSearch} from '@Molecule/Header';
// import {navigate} from '@Navigators/utils';
import {getSearch} from '@Actions/discover';
import Modal from '@Molecule/Modal';
import {Container, Content} from '@Organism/Basic';
import {CircleCard} from '@Organism/Cards';
import CirclePotraitCard from '@Organism/Cards/Circle/CirclePortraitCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MasonryList from '@react-native-seoul/masonry-list';
import {width} from '@Theme/Layout';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import FastImage from 'react-native-fast-image';
import {connect, ConnectedProps} from 'react-redux';
import {discoverType} from 'src/Constants';
import {RootState} from 'src/Redux/Reducers';
import AssetCard from './Components/Card/AssetCard';
import PeopleCard from './Components/Card/PeopleCard';
import PlayCard from './Components/Card/PlayCard';

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

const data = [
  {id: 0, title: 'Anti Rungkad'},
  {id: 1, title: 'Anti Rangkud'},
  {id: 2, title: 'Anti Rungkad'},
];

type Props = ReduxProps;

const SearchScreen: React.FC<Props> = props => {
  const {t} = useTranslation();
  const {Common, Gutters, Layout, Images, Colors} = useTheme();

  const [index, setIndex] = useState({id: 1, title: 'user'});
  const [activeSections, setActiveSections] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [selectedSortBy, setSelectedSortBy] = useState('All');
  const [showModalSort, setModalSort] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [searchUserList, setSearchUserList] = useState([]);
  const [searchCircleList, setSearchCircleList] = useState([]);
  const [searchAssetList, setSearchAssetList] = useState([]);
  const [filterShow, setFilterShow] = useState(false);

  const {_getSearch} = props;

  const SECTIONS = [
    {
      title: 'Kopi Kenangan',
      image: Images.discover.kenangan,
      amount: '4 Voucher',
      voucher: [
        '25% discount Kopi Kenangan using e-wallet payment...',
        '25% discount Kopi Kenangan using e-wallet payment...',
        '25% discount Kopi Kenangan using e-wallet payment...',
      ],
    },
  ];

  const toDetailScreen = (screen: any) => {
    console.log('screen');
    // navigate(screen);
  };

  const renderPeopleCard = ({item}: any) => {
    return (
      <View style={[Common.backgroundLayout, Gutters.tinyHPadding]}>
        <PeopleCard data={item} />
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

  const renderAssetCard = ({item}: any) => {
    return (
      <View style={Gutters.smallBMargin} key={item?.price}>
        <AssetCard item={item} />
      </View>
    );
  };

  const renderTrendingPlayItem = ({item}: any) => {
    return (
      <View style={Gutters.smallBMargin}>
        <PlayCard
          width={width - 30}
          img={Images.trending.trending1}
          title={item?.title}
        />
      </View>
    );
  };

  const renderContent = () => {
    if (index?.id === 1) {
      return (
        <FlatList
          data={searchUserList}
          renderItem={renderPeopleCard}
          keyExtractor={item => item?.id}
          onEndReachedThreshold={0.5}
          nestedScrollEnabled
          contentContainerStyle={{
            backgroundColor: Colors.neutral[100],
            padding: 10,
          }}
          showsHorizontalScrollIndicator={false}
        />
      );
    } else if (index?.id === 2) {
      return (
        <FlatList
          data={data}
          renderItem={renderTrendingPlayItem}
          keyExtractor={item => item?.title}
          onEndReachedThreshold={0.5}
          nestedScrollEnabled
          contentContainerStyle={{
            backgroundColor: Colors.neutral[100],
            alignItems: 'center',
          }}
          showsHorizontalScrollIndicator={false}
        />
      );
    } else if (index?.id === 3) {
      return searchCircleList.length > 0 ? (
        <>
          <View style={Layout.alignItemsCenter}>
            <CircleCard
              key={1}
              width={width - 40}
              height={200}
              isPremium={true}
              item={searchCircleList[0]}
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
            data={searchCircleList?.slice(1)}
            renderItem={renderMasonryItem}
          />
        </>
      ) : null;
    } else if (index?.id === 4) {
      return (
        <View style={[Gutters.smallPadding]}>
          <FlatList
            data={searchAssetList}
            renderItem={renderAssetCard}
            keyExtractor={item => item?.price}
            onEndReachedThreshold={0.5}
            nestedScrollEnabled
            contentContainerStyle={{
              backgroundColor: Colors.neutral[100],
              padding: 10,
            }}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      );
    } else if (index?.id === 5) {
      return (
        <Accordion
          sections={SECTIONS}
          activeSections={activeSections}
          renderHeader={_renderHeader}
          renderContent={_renderContent}
          onChange={_updateSections}
        />
      );
    }
  };

  const _renderHeader = (section: any) => {
    return (
      <View style={[Common.backgroundLayout, Gutters.regularHPadding]}>
        <View
          style={[
            Layout.row,
            Layout.alignItemsCenter,
            Layout.scrollSpaceBetween,
          ]}>
          <TouchableOpacity
            style={[Layout.row, Layout.alignItemsCenter]}
            // onPress={() => toDetailScreen('MerchantDetailScreen')}
          >
            <FastImage
              source={section.image}
              resizeMode={FastImage.resizeMode.contain}
              style={[{width: 50, height: 50}]}
            />
            <View style={[Gutters.smallLMargin]}>
              <Text>{section.title}</Text>
              <Text color={Colors.neutral[400]}>{section.amount}</Text>
            </View>
          </TouchableOpacity>
          <View>
            <Icon name="chevron-down" />
          </View>
        </View>
      </View>
    );
  };

  const _renderContent = (section: any) => {
    return (
      <View style={[Layout.row]}>
        <View style={{width: 75}} />
        <View style={{width: '85%'}}>
          {section?.voucher?.map((el: any, i: any) => {
            return (
              <View
                key={i}
                style={[
                  Layout.row,
                  Gutters.smallVPadding,
                  {
                    borderBottomWidth: 1,
                    width: '85%',
                    borderColor: Colors.neutral[200],
                  },
                ]}>
                <Text color={Colors.neutral[400]}>•</Text>
                <View style={[Gutters.smallLMargin]}>
                  <Text color={Colors.neutral[400]}>{el}</Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    );
  };

  const _updateSections = (activeSections: any) => {
    setActiveSections(activeSections);
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

  useEffect(() => {
    if (searchInput?.length > 1) {
      setLoadingSearch(true);
      const delayDebounceFn = setTimeout(() => {
        getSearchList().then(res => {
          if (res === null) {
            setSearchByType([searchInput]);
            setLoadingSearch(false);
          } else {
            setSearchByType([searchInput, ...res]);
            setLoadingSearch(false);
          }
        });
      }, 3000);

      return () => clearTimeout(delayDebounceFn);
    }
  }, [searchInput]);

  const getSearchList = async () => {
    try {
      const searchList = await AsyncStorage.getItem('searchList');
      if (searchList !== null) {
        return JSON.parse(searchList);
      } else {
        return null;
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  const isValid = (array: any) =>
    array.every((subArr: any) => subArr.length === 0);

  const setSearchByType = async (arr: any) => {
    let newArray = arr;
    let removeDuplicate = [...new Set(newArray)].filter(item => item);
    setLoadingSearch(true);
    try {
      await AsyncStorage.setItem('searchList', JSON.stringify(removeDuplicate));
      await Promise.all([
        _getSearch(searchInput, 'user'),
        // _getSearch(searchInput, 'play'),
        _getSearch(searchInput, 'circle'),
        _getSearch(searchInput, 'asset'),
        _getSearch(searchInput, 'hashtag'),
        // _getSearch(searchInput, 'promo'),
      ]).then(res => {
        setLoadingSearch(false);
        setSearchUserList(res[0]);
        setSearchCircleList(res[1]);
        setSearchAssetList(res[2]);

        if (!isValid(res)) {
          setFilterShow(true);
        } else {
          setFilterShow(false);
        }
      });
    } catch (error) {
      // Error saving data
      setLoadingSearch(false);
    }
  };

  const handleSearch = (e: any) => {
    if (e === '') {
      setLoadingSearch(false);
    }
    setSearchInput(e.replace(' ', ''));
  };

  return (
    <Container>
      <HeaderWithSearch
        placeholder={'Search'}
        onChangeValue={handleSearch}
        valueInput={searchInput}
      />
      {renderModal()}
      {loadingSearch ? (
        <View style={Gutters.largeTMargin}>
          <ActivityIndicator color={Colors.primary[600]} size={30} />
        </View>
      ) : filterShow ? (
        <Content
          contentContainerStyle={[{flexGrow: 1}]}
          showsVerticalScrollIndicator={false}>
          {searchInput.includes('#') ? (
            <View
              style={[
                Common.backgroundLayout,
                Gutters.smallTMargin,
                Gutters.regularPadding,
              ]}>
              <TouchableOpacity
                style={[
                  Gutters.smallPadding,
                  {backgroundColor: '#F9F9F9', borderRadius: 12},
                ]}>
                <View style={[Layout.rowHCenter, Gutters.smallLMargin]}>
                  <Text color={Colors.primary[400]} size={'lg'}>
                    #
                  </Text>
                  <View style={[Gutters.xlargeLMargin]}>
                    <Text>#CryptoGROWUP</Text>
                    <Text>196 Post</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          ) : (
            <View
              style={[
                Common.backgroundLayout,
                Gutters.smallTMargin,
                Gutters.regularVPadding,
                // {flexGrow: 1},
              ]}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={[Gutters.smallHPadding]}>
                {discoverType?.map((el, i) => {
                  return (
                    <View style={{marginHorizontal: 5}} key={i}>
                      <ButtonSimple
                        title={t(el?.title)}
                        buttonActive={el?.id === index?.id}
                        onPress={() => {
                          setIndex({...index, id: el?.id});
                        }}
                      />
                    </View>
                  );
                })}
              </ScrollView>
              <View
                style={[
                  Common.backgroundLayout,
                  Gutters.regularPadding,
                  Layout.rowHCenter,
                  {justifyContent: 'flex-end', flexGrow: 1},
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
              {loadingSearch ? (
                <View style={Gutters.largeTMargin}>
                  <ActivityIndicator color={Colors.primary[600]} size={30} />
                </View>
              ) : (
                <View style={{flexGrow: 1, backgroundColor: 'white'}}>
                  {renderContent()}
                </View>
              )}
            </View>
          )}
        </Content>
      ) : null}
    </Container>
  );
};

const mapStateToProps = ({discover}: RootState) => ({});
const mapDispatchToProps = {
  _getSearch: getSearch,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(SearchScreen);
