import useTheme from '@Hooks/useTheme';
import Variables from '@Theme/Variables';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Text} from '../index';
import {IUpDownButton} from './index';

const UpDownVote = ({
  containerStyle,
  onPressUp,
  onPressDown,
}: IUpDownButton) => {
  const {Layout, Colors} = useTheme();

  const [value, setValue] = useState<{
    value: string;
    color: typeof Variables.Colors;
  }>({
    value: 0,
    color: Colors.neutral[500],
  });

  useEffect(() => {
    if (parseInt(value.value) > 0) {
      setValue({
        ...value,
        color: Colors.baseT,
      });
    } else {
      setValue({
        ...value,
        color: Colors.red,
      });
    }
  }, [value.value]);

  return (
    <View style={[Layout.rowCenter, containerStyle]}>
      <Button
        onPress={onPressUpVote}
        type={'iconOnly'}
        icon="upvote"
        style={styles.icon}
        iconSize={'lg'}
      />
      <Text
        text={parseInt(value.value) > 999 ? '+999' : value.value}
        color={value.color}
        variant="bold"
      />
      <Button
        onPress={onPressDownVote}
        type={'iconOnly'}
        icon="downvote"
        style={styles.icon}
        iconSize={'lg'}
      />
    </View>
  );

  function onPressUpVote() {
    const count = parseInt(value.value) + 1;
    setValue({
      ...value,
      value: count,
    });
    onPressUp && onPressUp();
  }

  function onPressDownVote() {
    const count = parseInt(value.value) - 1;
    setValue({
      ...value,
      value: count,
    });
    onPressDown && onPressDown();
  }
};

const styles = StyleSheet.create({
  icon: {
    borderWidth: 0,
  },
});

export default UpDownVote;
