import {FlatList, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {Container, Content} from '@Organism/Basic';
import {HeaderTitle} from '@Molecule/Header';
import {useTranslation} from 'react-i18next';
import useTheme from '@Hooks/useTheme';
import {Icon, Text} from '@Atom/index';
import {InputField} from '@Molecule/InputField';
import Modal from '@Molecule/Modal';
import PlayCard from '@Container/Discover/Components/Card/PlayCard';
import {width} from '@Theme/Layout';

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

const data = [
  {id: 0, title: 'Anti Rungkad'},
  {id: 1, title: 'Anti Rangkud'},
  {id: 2, title: 'Anti Rungkad'},
];

export default function PlayList() {
  const {t} = useTranslation();
  const {Common, Gutters, Layout, Images, Colors, Fonts} = useTheme();

  const [valueInput, setValueInput] = useState('');
  const [selectedSortBy, setSelectedSortBy] = useState('All');
  const [showModalSort, setModalSort] = useState(false);

  const onChangeValue = (text: any) => {
    console.log(text);
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

  return (
    <Container>
      <HeaderTitle title={t('discoverScreen.playList')} />
      {renderModal()}
      <Content contentContainerStyle={[]} showsVerticalScrollIndicator={false}>
        <View
          style={[
            Common.backgroundLayout,
            Gutters.regularPadding,
            Gutters.smallTMargin,
          ]}>
          <Text variant="semibold" size="base">
            {t('discoverScreen.playList')}
          </Text>
          <Text color={Colors.neutral[400]}>
            {t('discoverScreen.explorePlayList')}
          </Text>
          <View style={[Gutters.tinyTMargin, {width: '100%'}]}>
            <InputField
              value={valueInput}
              onChangeValue={onChangeValue}
              variant="bordered"
              leftIcon="search"
              iconSize={'xl2'}
              placeholder={'Search'}
            />
          </View>
          {renderSortBy()}
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
        </View>
      </Content>
    </Container>
  );
}
