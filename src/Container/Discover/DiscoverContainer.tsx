import {
  getAdsBanner,
  getHotNews,
  getMerchantPromo,
  getYouMayLikeNews,
} from '@Actions/discover';
import EarnCard from '@Container/Earn/Components/EarnCard';
import useTheme from '@Hooks/useTheme';
import {Container} from '@Organism/Basic';
import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import {ConnectedProps, connect} from 'react-redux';
import {RootState} from 'src/Redux/Reducers';
import HotNewsList from './News/HotNewsList';
import DiscoverAll from './News/YouMayLikeList';
import TrendingToday from './Trending/TrendingToday';
import {
  AdsBanner,
  DiscoverProps,
  INews,
  MerchantPromoBanner,
  Search,
} from './index';

type Props = DiscoverProps & ReduxProps;

const DiscoverContainer: React.FC<Props> = props => {
  const {
    isLoggedIn,
    _getHotNews,
    loadingNews,
    loadingOthersNews,
    _getYouMayLikeNews,
    _getAdsBanner,
    _getMerchantPromo,
  } = props;

  const [hotNews, setDataHotNews] = React.useState<Array<INews>>([]);
  const [otherNews, setOtherNews] = React.useState<Array<INews>>([]);
  const [adsBanner, setAdsBanner] = React.useState<Array<[]>>([]);
  const [merchantPromo, setMerchantPromo] = React.useState<Array<[]>>([]);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [isLoadMore, setIsLoadMore] = React.useState<boolean>(false);
  const [shouldLoadMore, setShouldLoadMore] = React.useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = React.useState<boolean>(false);

  const {Colors, Layout, Gutters} = useTheme();

  const getAdsBannerData = async () => {
    const getData: any = await _getAdsBanner();
    setAdsBanner(getData);
    setIsRefreshing(false);
  };

  const getMerchantPromoData = async () => {
    const getData: any = await _getMerchantPromo();
    setMerchantPromo(getData);
    setIsRefreshing(false);
  };

  React.useEffect(() => {
    const fetchData = async () => {
      const newsData: any = await _getHotNews();
      const otherNewsData: any = await _getYouMayLikeNews();
      setDataHotNews(newsData);
      setOtherNews(otherNewsData);
    };
    fetchData();
    getAdsBannerData();
    getMerchantPromoData();
  }, []);

  const RenderUpperComponent = () => {
    return (
      <>
        <Search />
        <AdsBanner data={adsBanner} />
        {/* XP bar progress here */}
        {/* merchant banner promo here */}
        {isLoggedIn ? <EarnCard /> : null}
        <TrendingToday />
        <MerchantPromoBanner data={merchantPromo} />
        <HotNewsList data={hotNews} loading={loadingNews} />
      </>
    );
  };

  return (
    <Container style={{backgroundColor: Colors.neutral[200]}}>
      <DiscoverAll
        data={otherNews}
        loading={loadingOthersNews}
        ListHeaderComponent={<RenderUpperComponent />}
        onEndReached={onEndReachedGetData}
        ListFooterComponent={
          <View style={[Layout.center, Gutters.largeVPadding]}>
            {isLoadMore ? <ActivityIndicator /> : null}
          </View>
        }
        refreshing={isRefreshing}
        onRefresh={onRefresh}
      />
    </Container>
  );

  function onRefresh() {
    setIsRefreshing(true);
    setCurrentPage(1);
    const fetchData = async () => {
      const newsData: any = await _getHotNews();
      const otherNewsData: any = await _getYouMayLikeNews({page: 1, limit: 10});
      setDataHotNews(newsData);
      setOtherNews(otherNewsData);
      setIsRefreshing(false);
    };
    fetchData();
    getAdsBannerData();
    getMerchantPromoData();
  }

  function onEndReachedGetData() {
    setIsLoadMore(true);
    const newPage = currentPage + 1;
    if (shouldLoadMore) {
      const tempParam = {
        page: newPage,
        limit: 10,
      };
      setCurrentPage(newPage);
      onLoadMoreNews(tempParam);
    } else {
      setIsLoadMore(false);
    }
  }

  async function onLoadMoreNews(param: any) {
    try {
      const news = await _getYouMayLikeNews(param);
      if (news?.length) {
        setOtherNews([...otherNews, ...news]);
        setShouldLoadMore(true);
      } else {
        setShouldLoadMore(false);
      }
      setIsLoadMore(false);
    } catch (error) {
      setIsLoadMore(false);
    }
  }
};

const mapStateToProps = ({auth, discover}: RootState) => ({
  isLoggedIn: auth.isLogin,
  loadingNews: discover.loadingNews,
  loadingOthersNews: discover.loadingOthersNews,
});
const mapDispatchToProps = {
  _getHotNews: getHotNews,
  _getYouMayLikeNews: getYouMayLikeNews,
  _getAdsBanner: getAdsBanner,
  _getMerchantPromo: getMerchantPromo,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;
export default connector(DiscoverContainer);
