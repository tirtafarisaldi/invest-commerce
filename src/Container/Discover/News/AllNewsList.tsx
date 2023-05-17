import {getHotNews, getYouMayLikeNews} from '@Actions/discover';
import Icon from '@Atom/Icon';
import Text from '@Atom/Text';
import useTheme from '@Hooks/useTheme';
import Modal from '@Molecule/Modal';
import {HeaderTitle, InputField} from '@Molecule/index';
import {Container} from '@Organism/Basic';
import React, {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, TouchableOpacity, View} from 'react-native';
import {ConnectedProps, connect} from 'react-redux';
import {RootState} from 'src/Redux/Reducers';
import NewsItem from '../Components/NewsItem';
import {AllNewsListProps, INews} from '../index';

type Props = AllNewsListProps & ReduxProps;

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

const AllNewsList: React.FC<Props> = props => {
  const {loadingOthersNews, _getYouMayLikeNews} = props;

  const {Gutters, Colors, Layout, Common} = useTheme();

  const {t} = useTranslation();

  const [allNews, setAllNews] = React.useState<Array<INews>>([]);
  const [valueInput, setValueInput] = React.useState<string>('');
  const [showModalSort, setModalSort] = React.useState<boolean>(false);
  const [selectedSortBy, setSelectedSortBy] = React.useState('All');

  React.useEffect(() => {
    const fetchData = async () => {
      const otherNewsData: any = await _getYouMayLikeNews();
      setAllNews(otherNewsData);
    };
    fetchData();
  }, []);

  const keyExtractor = useCallback(item => item?.id.toString(), []);
  const renderNewsItem = useCallback(
    ({item, index}: {item: INews; index: number}) => {
      return <NewsItem item={item} index={index} />;
    },
    [],
  );

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

  const HeaderComponent = () => (
    <View
      style={{
        ...Layout.justifyContentBetween,
      }}>
      <Text
        text={t('discoverScreen.newsList')}
        variant="semibold"
        size={'lg'}
      />
      <Text
        text={t('discoverScreen.findMoreYouMighLike')}
        size={'sm'}
        color={Colors.neutral[400]}
        style={{...Gutters.tinyVMargin}}
      />
      <InputField
        value={valueInput}
        onChangeValue={text => setValueInput(text)}
        variant="bordered"
        leftIcon="search"
        iconSize={'xl2'}
        placeholder={'Search'}
        style={{flex: 1}}
      />
      <View
        style={[
          Common.backgroundLayout,
          Gutters.regularPadding,
          Layout.rowHCenter,
          {justifyContent: 'flex-end'},
        ]}>
        <Text size="sm">Sort by:</Text>
        <TouchableOpacity
          onPress={showHideSortModal}
          style={[
            Gutters.tinyLMargin,
            Layout.rowHCenter,
            Layout.alignItemsCenter,
          ]}>
          <Text variant="semibold" size={'sm'}>
            {selectedSortBy}
          </Text>
          <View style={[Gutters.tinyLMargin]}>
            <Icon name={'down-triangle'} size="sm" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <Container>
      <HeaderTitle title="News List" showAvatarProfile />
      {renderModal()}
      <FlatList
        data={allNews}
        renderItem={renderNewsItem}
        keyExtractor={keyExtractor}
        ListHeaderComponent={HeaderComponent}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled
        //   onEndReachedThreshold={0.5}
        //   onEndReached={onEndReached}
        contentContainerStyle={{
          ...Gutters.smallPadding,
          ...Gutters.tinyTPadding,
          ...Gutters.smallTMargin,
          ...Gutters.largeBPadding,
          backgroundColor: Colors.neutral[100],
        }}
      />
    </Container>
  );
};

const mapStateToProps = ({discover}: RootState) => ({
  loadingNews: discover.loadingNews,
  loadingOthersNews: discover.loadingOthersNews,
});
const mapDispatchToProps = {
  _getHotNews: getHotNews,
  _getYouMayLikeNews: getYouMayLikeNews,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;
export default connector(AllNewsList);
