import {CommonParams} from '@Theme/theme';
import {MetricsSizes} from '@Theme/Variables';
import {StyleSheet} from 'react-native';

export default function <C>({Colors, Gutters, Layout}: CommonParams<C>) {
  const base = {
    ...Gutters.tinyVMargin,
    ...Gutters.tinyHMargin,
    ...Layout.fill,
    ...Layout.rowCenter,
    borderRadius: MetricsSizes.xlarge,
  };

  return StyleSheet.create({
    base,
    outline: {
      ...base,
      ...Layout.rowCenter,
      ...Gutters.tinyVPadding,
      backgroundColor: Colors.transparent,
      borderWidth: 2,
      borderColor: Colors.primary[600],
    },
    icon: {
      ...Layout.center,
      ...Gutters.tinyHPadding,
      ...Gutters.tinyVPadding,
      ...Gutters.tinyHMargin,
      ...Gutters.tinyVMargin,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: Colors.neutral[500],
      flexGrow: 0,
    },
  });
}
