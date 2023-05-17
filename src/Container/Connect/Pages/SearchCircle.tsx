import React, {Fragment, useEffect, useState} from 'react';
import {ActivityIndicator, TouchableOpacity, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTranslation} from 'react-i18next';
import useTheme from '@Hooks/useTheme';
import {width} from '@Theme/Layout';
import Text from '@Atom/Text';
import {CircleCard} from '@Organism/Cards';
import {Container, Content} from '@Organism/Basic';
import {HeaderWithSearch} from '@Molecule/Header';
import MasonryList from '@react-native-seoul/masonry-list';
import Icon from '@Atom/Icon';
import {navigate} from '@Navigators/utils';
import CirclePortraitCard from '@Organism/Cards/Circle/CirclePortraitCard';

export interface SearchCircleData {
  id: string,
  name: string,
  banner: string,
  image: string,
  owner: string,
  totalRating: number,
  totalMember: number,
  posts: number,
  isPremium: boolean,
  isLifetime: boolean,
}

export const SEARCH_CIRCLE_LIST: Array<SearchCircleData> = [
  {
    id: '1',
    name: 'Bitcoin',
    banner: 'https://images.barrons.com/im-489169?width=720&height=480',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/800px-Bitcoin.svg.png',
    owner: 'btcowner',
    totalRating: 42,
    totalMember: 400,
    posts: 43,
    isPremium: true,
    isLifetime: true,
  },
  {
    id: '2',
    name: 'Crypt',
    banner: 'https://images.barrons.com/im-489169?width=720&height=480',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/800px-Bitcoin.svg.png',
    owner: 'btcowner',
    totalRating: 122,
    totalMember: 250,
    posts: 547,
    isPremium: false,
    isLifetime: false,
  },
  {
    id: '3',
    name: 'Bc',
    banner: 'https://images.barrons.com/im-489169?width=720&height=480',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/800px-Bitcoin.svg.png',
    owner: 'btcowner',
    totalRating: 12,
    totalMember: 343,
    posts: 120,
    isPremium: true,
    isLifetime: false,
  },
  {
    id: '4',
    name: 'Eth',
    banner: 'https://images.barrons.com/im-489169?width=720&height=480',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/800px-Bitcoin.svg.png',
    owner: 'btcowner',
    totalRating: 10,
    totalMember: 50,
    posts: 15,
    isPremium: false,
    isLifetime: false,
  },
  {
    id: '5',
    name: 'Doge',
    banner: 'https://images.barrons.com/im-489169?width=720&height=480',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/800px-Bitcoin.svg.png',
    owner: 'btcowner',
    totalRating: 22,
    totalMember: 73,
    posts: 21,
    isPremium: false,
    isLifetime: false,
  },
];

const SearchCircle = () => {
  const {t} = useTranslation();
  const {Gutters, Layout, Colors} = useTheme()

  const [searchInput, setSearchInput] = useState('')
  const [showLoader, setShowLoader] = useState(false)
  const [searchHistories, setSearchHistories] = useState<string[]>([])
  const [circles, setCircles] = useState<SearchCircleData[]>([])

  useEffect(() => {
    if (searchInput.length > 1) {
      setShowLoader(true);
      const delayDebounceFn = setTimeout(() => {
        getSearchHistories().then(res => {
          if (res === null) {
            getSearchResult([searchInput]);
          } else {
            getSearchResult([searchInput, ...res]);
          }
        });
      }, 3000);

      return () => clearTimeout(delayDebounceFn);
    } else {
      setShowLoader(false)
    }
  }, [searchInput]);

  useEffect(() => {
    if (searchHistories.length === 0) {
      getSearchHistories().then(histories => {
        if (Array.isArray(histories)) setSearchHistories(histories)
      })
    }
  })

  const getSearchResult = async (arr: any) => {
    let newArray = arr;
    let removeDuplicate: any[] = [...new Set(newArray)].filter(item => item);

    setSearchHistories(removeDuplicate)
    await AsyncStorage.setItem('searchHistories', JSON.stringify(removeDuplicate));

    setCircles(SEARCH_CIRCLE_LIST)

    setShowLoader(false);
  };

  const handleSearch = (e: string) => {
    setSearchInput(e.replace(' ', ''))
  }

  const getSearchHistories = async () => {
    let histories = await AsyncStorage.getItem('searchHistories')
    histories = histories === null ? histories : JSON.parse(histories)
    return histories
  }

  const clearHistories = async () => {
    await AsyncStorage.setItem('searchHistories', '')
    setSearchHistories([])
  }

  const renderMasonryItem = ({item, i}: any) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigate('CircleDetails', {circle: item})
        }}>
        <CirclePortraitCard
          item={item}
          style={{marginLeft: i % 2 === 0 ? 0 : 12}}
        />
      </TouchableOpacity>
    );
  };

  return (
    <Container>
      <HeaderWithSearch
        placeholder={t('connect.search')}
        onChangeValue={handleSearch}
        valueInput={searchInput}
        showAvatarProfile={true}
      />
      <Content contentContainerStyle={[{flexGrow: 1}]} showsVerticalScrollIndicator={false}>
        <View style={[Gutters.regularTMargin, Gutters.regularVPadding, {backgroundColor: Colors.white, flexGrow: 1}]}>
          {showLoader ?
            (<View style={{flexGrow: 1, justifyContent: 'center'}}>
              <ActivityIndicator color={Colors.primary[600]} size={50} />
            </View>) :
            (
              circles.length > 0 ? (
                <Fragment>
                  <View
                    style={[
                      Gutters.smallPadding,
                      Gutters.smallBMargin,
                      Layout.rowHCenter,
                      {justifyContent: 'flex-end'},
                    ]}>
                    <Text size="xs">{t('searchScreen.sortBy')}:</Text>
                    <TouchableOpacity
                      onPress={() => {}}
                      style={[
                        Gutters.tinyLMargin,
                        Layout.rowHCenter,
                        Layout.alignItemsCenter,
                      ]}>
                      <Text variant="semibold" size={'xs'}>
                        {t('All'.toLowerCase())}
                      </Text>
                      <View style={[Gutters.tinyLMargin]}>
                        <Icon name={'down-triangle'} size="xs" />
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View style={Layout.alignItemsCenter}>
                    <CircleCard
                      key={1}
                      width={width - 40}
                      height={200}
                      isPremium={true}
                      item={circles[0]}
                      onPress={() => {
                        navigate('CircleDetails', {circle: circles[0]})
                      }}
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
                    data={circles.slice(1)}
                    renderItem={renderMasonryItem}
                  />
                </Fragment>
              ) : (
                <Fragment>
                  <View style={[Layout.rowHCenter, Gutters.regularBMargin, Gutters.regularHPadding, {justifyContent: 'space-between'}]}>
                    <Text size='lg' variant='semibold'>Recent Search</Text>
                    <TouchableOpacity onPress={() => clearHistories()}>
                      <Text color={Colors.primary[600]}>Clear History</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={[Layout.rowHCenter, Gutters.regularHPadding, {flexWrap: 'wrap'}]}>
                    {searchHistories.map((history, index) => {
                      return (
                        <TouchableOpacity
                          key={index}
                          style={[
                            Gutters.tinyRMargin,
                            Gutters.smallTMargin,
                            Gutters.smallHPadding,
                            Gutters.tinyVPadding,
                            {
                              backgroundColor: Colors.neutral[200],
                              paddingVertical: 2,
                              borderRadius: 20,
                            },
                          ]}
                          onPress={() => handleSearch(history)}>
                          <Text color={Colors.primary[600]}>
                            {history}
                          </Text>
                        </TouchableOpacity>
                      )
                    })}
                  </View>
                </Fragment>
              )
            )
          }
        </View>
      </Content>
    </Container>
  )
}

export default SearchCircle;
