import {getHotNews, getYouMayLikeNews} from '@Actions/discover';
import IconOnly from '@Atom/Button/IconOnly';
import Text from '@Atom/Text';
import useTheme from '@Hooks/useTheme';
import {HeaderTitle} from '@Molecule/index';
import {Container} from '@Organism/Basic';
import {width} from '@Theme/Layout';
import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {ConnectedProps, connect} from 'react-redux';
import {RootState} from 'src/Redux/Reducers';
import {IDetailNews, INews} from '../index';
import OtherNewsList from './YouMayLikeList';

import HTML from 'react-native-render-html';

type Props = IDetailNews & ReduxProps;

const DetailNews: React.FC<Props> = props => {
  const {navigation, route, auth, _getYouMayLikeNews, loadingOthersNews} =
    props;
  const {item} = route.params;
  const {Colors, Gutters, Layout, Common, Fonts} = useTheme();
  const {discoverStyle} = Common;

  const [detail, setDetail] = React.useState<INews | any>({});
  const [otherNews, setOtherNews] = React.useState<Array<INews>>([]);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [isLoadMore, setIsLoadMore] = React.useState<boolean>(false);
  const [shouldLoadMore, setShouldLoadMore] = React.useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = React.useState<boolean>(false);

  React.useEffect(() => {
    const fetchData = async () => {
      const otherNewsData: any = await _getYouMayLikeNews();
      setOtherNews(otherNewsData.filter(i => i.id !== item.id));
    };
    fetchData();
  }, []);

  React.useEffect(() => {
    setDetail(item);
  }, [navigation]);

  const RenderUpperComponent = () => {
    return (
      <>
        {detail.imageUrl ? (
          <FastImage
            source={{uri: detail.imageUrl}}
            style={discoverStyle.detailNewsThumbnail}
            resizeMode={FastImage.resizeMode.cover}
          />
        ) : null}

        <View style={discoverStyle.detailNewsContent}>
          <View style={discoverStyle.rowCenterBetween}>
            <Text
              text={detail?.title}
              variant="semibold"
              size={'base'}
              style={{width: '90%'}}
            />
            <IconOnly
              icon="share-2"
              iconColor={Colors.neutral[100]}
              iconSize={'sm'}
              style={discoverStyle.detailNewsShareIco}
            />
          </View>
          <View
            style={[discoverStyle.ymlContentItem, Layout.justifyContentStart]}>
            <FastImage
              source={{uri: detail.imageUrl}}
              resizeMode={FastImage.resizeMode.cover}
              style={[
                discoverStyle.ymlAuthorIco,
                {width: width * 0.05, height: width * 0.05},
              ]}
            />

            <Text
              text={detail.author}
              color={Colors.neutral[400]}
              style={[discoverStyle.ymlAuthorName, Gutters.smallHMargin]}
              numberOfLines={1}
            />
            <View style={discoverStyle.customDotSeparator} />
            <Text
              text="12 Hours Ago"
              color={Colors.neutral[400]}
              style={[discoverStyle.ymlAuthorName, Gutters.smallHMargin]}
              numberOfLines={1}
            />
          </View>
          <View testID="DetailNews_content" style={Gutters.smallTMargin}>
            <HTML
              source={{html: detail?.content ? detail?.content : ''}}
              systemFonts={[Fonts.normal.fontFamily]}
            />
          </View>
        </View>
      </>
    );
  };

  return (
    <Container>
      <HeaderTitle title={'News'} showAvatarProfile />

      <OtherNewsList
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
      const otherNewsData: any = await _getYouMayLikeNews({page: 1, limit: 10});
      setOtherNews(otherNewsData.filter(i => i.id !== item.id));
    };
    fetchData();
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
  auth: auth,
  loadingNews: discover.loadingNews,
  loadingOthersNews: discover.loadingOthersNews,
});
const mapDispatchToProps = {
  _getHotNews: getHotNews,
  _getYouMayLikeNews: getYouMayLikeNews,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;
export default connector(DetailNews);
