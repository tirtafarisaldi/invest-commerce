import {width} from '@Theme/Layout';
import {CommonParams} from '@Theme/theme';
import {StyleSheet} from 'react-native';

/**
 *
 * yml- (youMayLike)
 */

export default function <C>({
  Gutters,
  Fonts,
  Colors,
  Layout,
  MetricsSizes,
}: CommonParams<C>) {
  return StyleSheet.create({
    title: {
      ...Fonts.bold,
    },
    itemHotNewsContentBadge: {alignItems: 'baseline'},
    badgeHotNews: {
      ...Gutters.smallHPadding,
      ...Gutters.tinyVPadding,
      lineHeight: 20,
      backgroundColor: Colors.red[400],
      borderRadius: MetricsSizes.large,
    },
    itemHotNews: {
      ...Layout.alignItemsStart,
      width: width * 0.93,
      aspectRatio: 1,
      marginRight: MetricsSizes.small,
      flexGrow: 2,
    },
    itemHotNewsImage: {
      width: '100%',
      height: width * 0.5,
      borderRadius: MetricsSizes.tiny,
    },
    itemHotNewsContent: {
      ...Layout.fill,
      ...Layout.justifyContentBetween,
      ...Gutters.tinyPadding,
      width: '100%',
      backgroundColor: 'rgba(0,0,0,0.3)',
      borderRadius: MetricsSizes.tiny,
    },
    itemHotNewsTitle: {maxWidth: '75%'},
    ymlItem: {
      ...Gutters.smallPadding,
      ...Gutters.smallBMargin,
      ...Layout.row,
      ...Layout.justifyContentBetween,
      ...Layout.alignItemsStart,
      ...Layout.fill,
      backgroundColor: Colors.neutral[200],
      borderRadius: MetricsSizes.small,
    },
    ymlLeftItem: {
      ...Layout.justifyContentAround,
      ...Layout.alignItemsStart,
      height: '100%',
      flex: 8,
    },
    ymlTagCategory: {
      ...Gutters.smallHPadding,
      borderRadius: MetricsSizes.small,
      lineHeight: 20,
      backgroundColor: Colors.info[500],
    },
    ymlContentItem: {
      ...Layout.row,
      ...Layout.justifyContentBetween,
      ...Layout.alignItemsCenter,
      ...Gutters.tinyTMargin,
      width: '80%',
    },
    ymlAuthorIco: {
      aspectRatio: 1,
      borderRadius: (width * 0.07) / 2,
      borderColor: Colors.info[400],
      borderWidth: 0.5,
      width: width * 0.07,
      height: width * 0.07,
    },
    ymlAuthorName: {maxWidth: '40%'},
    customDotSeparator: {
      backgroundColor: Colors.neutral[300],
      borderRadius: 2.5,
      width: 5,
      height: 5,
    },
    ymlImageThumbnail: {
      aspectRatio: 1,
      flex: 2,
      borderRadius: width * 0.03,
    },
    detailNewsShareIco: {
      width: width * 0.07,
      height: width * 0.07,
      backgroundColor: Colors.neutral[300],
      borderRadius: MetricsSizes.xlarge,
      borderWidth: 0,
    },
    detailNewsThumbnail: {width: '100%', aspectRatio: 9 / 4},
    detailNewsContent: {
      ...Gutters.smallPadding,
      ...Gutters.smallBMargin,
      top: -MetricsSizes.regular,
      borderTopRightRadius: MetricsSizes.regular,
      borderTopLeftRadius: MetricsSizes.regular,
      backgroundColor: Colors.neutral[100],
    },
    rowCenterBetween: {
      ...Layout.row,
      ...Layout.alignItemsStart,
      ...Layout.justifyContentBetween,
    },
  });
}
