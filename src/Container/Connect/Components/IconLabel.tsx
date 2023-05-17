import * as React from 'react';
import {StyleSheet, View} from 'react-native';

import {Text, Icon, IIcon, IText} from '@Atom/index';
import {Colors} from '@Theme/Variables';

type Props = {
  icon: IIcon;
  text: IText;
};
const IconLabel = ({icon, text}: Props) => {
  return (
    <View style={styles.wrapper}>
      <Icon
        name={icon.name}
        size={icon.size || 'lg'}
        color={icon.color || Colors.primary[600]}
      />
      <Text
        color={text.color || Colors.white}
        size={text.size || 'sm'}
        style={styles.infoText}>
        {text.text?.toString() || ''}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    paddingHorizontal: 8,
  },
  infoText: {
    paddingLeft: 2,
  },
});

export default IconLabel;
