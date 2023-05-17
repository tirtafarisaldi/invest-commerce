import Text from '@Atom/Text';
import useTheme from '@Hooks/useTheme';
import {navigate} from '@Navigators/utils';
import React, {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {
  FlatList,
  FlatListProps,
  Pressable,
  ScrollViewProps,
  View,
} from 'react-native';
import NewsItem from '../Components/NewsItem';
import {INews} from '../index';

// Interface for You may like list screen
interface IOtherNews extends Omit<FlatListProps, 'ListHeaderComponent'> {
  data: INews[];
  loading?: boolean;
  ListHeaderComponent?:
    | React.ComponentType<any>
    | React.ReactElement
    | null
    | undefined;
}

type Props = ScrollViewProps & IOtherNews;

const YouMayLikeList = ({
  data,
  onEndReached,
  ListHeaderComponent,
  ...props
}: Props) => {
  const {Gutters, Colors, Layout} = useTheme();
  const {t} = useTranslation();

  const keyExtractor = useCallback(item => item?.id.toString(), []);

  const renderNewsItem = useCallback(
    ({item, index}: {item: INews; index: number}) => {
      return (
        <View style={Gutters.smallHMargin}>
          <NewsItem item={item} index={index} />
        </View>
      );
    },
    [],
  );

  const HeaderComponent = () => (
    <>
      {ListHeaderComponent}
      <View
        style={{
          ...Layout.row,
          ...Layout.justifyContentBetween,
          ...Layout.alignItemsCenter,
          ...Gutters.smallPadding,
        }}>
        <Text
          text={t('discoverScreen.youMayLike')}
          variant="semibold"
          size={'lg'}
        />
        <Pressable onPress={() => navigate('AllNews')}>
          <Text
            text={t('discoverScreen.seeAll')}
            size={'sm'}
            color={Colors.primary[600]}
          />
        </Pressable>
      </View>
    </>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderNewsItem}
      keyExtractor={keyExtractor}
      ListHeaderComponent={HeaderComponent}
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled
      onEndReachedThreshold={0.5}
      onEndReached={onEndReached}
      contentContainerStyle={{
        ...Gutters.tinyTPadding,
        ...Gutters.smallTMargin,
        ...Gutters.largeBPadding,
        backgroundColor: Colors.neutral[100],
      }}
      {...props}
    />
  );
};

export default YouMayLikeList;
