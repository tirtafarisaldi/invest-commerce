import * as React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import useTheme from '@Hooks/useTheme';
import {navigate} from '@Navigators/utils';
import Icon from '@Atom/Icon';
import {Text} from '@Atom/index';
import {Colors} from '@Theme/Variables';
import CardHeader from './CardHeader';
import ButtonGroup, {ButtonItemType} from './ButtonGroup';
import Banner from './Banner';
import CircleListWrapped from './CricleListWrapped';
import {MY_CIRCLE_LIST_DATA, JOINED_CIRCLE_LIST_DATA, ALL_CIRCLE_LIST_DATA} from '../Fixtures/CircleListData';
import {CardDataType} from './LeaderBoardCarousel';
import Modal from '@Molecule/Modal';

interface sortType {
  id: number,
  name: string,
  desc: string,
  attribute: string,
  action: () => void,
}

const CircleListCompartment = () => {
  const [circles, setCircles] = React.useState<Array<CardDataType>>(MY_CIRCLE_LIST_DATA)
  const [activeButton, setActiveButton] = React.useState<number>(1);
  const [selectedSort, setSelectedSort] = React.useState<number>(1);
  const [showSortModal, setShowSortModal] = React.useState<boolean>(false);

  const {t} = useTranslation();
  const {Gutters, Images, Layout} = useTheme();

  const handleButtonFilteredClicked = React.useCallback((buttonIdx: number) => {
    setActiveButton(buttonIdx);
    switch (buttonIdx) {
      case 1:
        setCircles(MY_CIRCLE_LIST_DATA)
        break;
      case 2:
        setCircles(JOINED_CIRCLE_LIST_DATA)
        break;
      case 3:
        setCircles(ALL_CIRCLE_LIST_DATA)
        break;
      default:
        setCircles(MY_CIRCLE_LIST_DATA)
        break;
    }
  }, []);

  const buttonGroupList: Array<ButtonItemType> = React.useMemo(
    () => [
      {
        id: 1,
        name: t('connect.myCircle'),
        action: () => handleButtonFilteredClicked(1),
      },
      {
        id: 2,
        name: t('connect.joined'),
        action: () => handleButtonFilteredClicked(2),
      },
      {
        id: 3,
        name: t('connect.circle'),
        action: () => handleButtonFilteredClicked(3),
      },
    ],
    [handleButtonFilteredClicked, t],
  );

  const handleSelectSort = (id: number) => {
    setSelectedSort(id)
    setShowSortModal(false)
  }

  const sortOptionList: Array<sortType> = React.useMemo(
    () => [
      {
        id: 1,
        name: t('connect.rating'),
        desc: t('connect.descending'),
        attribute: 'totalRating',
        action: () => {},
      },
      {
        id: 2,
        name: t('connect.member'),
        desc: t('connect.descending'),
        attribute: 'totalMember',
        action: () => {},
      },
      {
        id: 3,
        name: t('connect.post'),
        desc: t('connect.descending'),
        attribute: 'totalPost',
        action: () => {},
      },
    ], [handleSelectSort, t]
  )

  const handleShowSortModal = () => {
    setShowSortModal(state => !state)
  }

  const renderSortModal = () => {
    return (
      <Modal
        variant="center"
        isVisible={showSortModal}
        hideModal={handleShowSortModal}>
        {sortOptionList?.map((el, i) => {
          return (
            <TouchableOpacity
              key={i}
              onPress={() => handleSelectSort(el.id)}
              style={[
                Layout.rowHCenter,
                Layout.scrollSpaceBetween,
                Gutters.smallPadding,
                {
                  backgroundColor:
                    el?.id === selectedSort
                      ? Colors.primary[100]
                      : Colors.neutral[100],
                  borderRadius: 8,
                },
              ]}>
              <View>
                <Text variant="semibold">{el?.name}</Text>
                <Text>{el?.desc}</Text>
              </View>
              {el?.id === selectedSort ? (
                <Icon name="check" size={'xl2'} />
              ) : null}
            </TouchableOpacity>
          );
        })}
      </Modal>
    )
  }

  return (
    <React.Fragment>
      {renderSortModal()}
      <View
        style={{
          ...Gutters.smallPadding,
          ...Gutters.smallTMargin,
          backgroundColor: Colors.neutral[100],
        }}>
        <CardHeader
          title={t('connect.circleList')}
          description={t('connect.circleListDescription')}
        />
        <TouchableOpacity
          onPress={() => navigate('SearchCircle')}
          style={[Layout.rowHCenter, Gutters.tinyPadding, styles.searchCircle]}>
          <Icon name="search" size="xl" />
          <View style={Gutters.smallLMargin}>
            <Text color={Colors.neutral[300]}>{t('connect.search')}</Text>
          </View>
        </TouchableOpacity>
        <ButtonGroup buttonList={buttonGroupList} activeButton={activeButton} />
        <Banner imageUri={Images.circleScreen.createCircle} onPress={() => {}} />
        <CircleListWrapped data={circles} handleShowSortModal={handleShowSortModal} sortTitle={sortOptionList[selectedSort - 1].name} />
      </View>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  searchCircle: {
    borderWidth: 1,
    borderRadius: 12,
    borderColor: Colors.neutral[300],
  },
});

export default CircleListCompartment;