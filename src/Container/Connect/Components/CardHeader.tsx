import * as React from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';

import useTheme from '@Hooks/useTheme';
import {Text} from '@Atom/index';

type Props = {
  iconTitle?: React.ReactNode;
  title: string;
  description?: string;
  style?: ViewStyle;
};
const CardHeader = ({title, iconTitle, description, style}: Props) => {
  const {Gutters, Colors} = useTheme();
  return (
    <View style={style}>
      <View style={styles.headerWrapper}>
        {iconTitle && <View style={styles.icon}>{iconTitle}</View>}
        <Text variant="semibold" size="base">
          {title}
        </Text>
      </View>
      <Text
        size="xs"
        color={Colors.neutral[400]}
        style={{
          ...Gutters.smallVPadding,
        }}>
        {description}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginTop: -2,
    paddingRight: 6,
  },
});
export default CardHeader;
