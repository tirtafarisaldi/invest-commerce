/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {View} from 'react-native';
import {Text} from '..';

interface Props {
  title: string;
  color: {
    text: string;
    background: string;
  };
}

const Label = (props: Props) => {
  return (
    <View
      style={{
        backgroundColor: props.color.background,
        width: 49,
        height: 27,
        borderRadius: 50,
        padding: 6,
      }}>
      <Text size={'xs'} text={props.title} color={props.color.text} />
    </View>
  );
};

export default Label;
