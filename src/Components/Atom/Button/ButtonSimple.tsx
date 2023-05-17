import {Text} from '@Atom/index';
import {Colors} from '@Theme/Variables';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {IButtonBody} from '.';

export default function ButtonSimple({
  title,
  buttonActive = true,
  ...props
}: IButtonBody) {
  return (
    <TouchableOpacity
      {...props}
      style={{
        backgroundColor: buttonActive
          ? Colors.primary[600]
          : Colors.neutral[200],
        paddingHorizontal: 40,
        paddingVertical: 6,
        borderRadius: 99,
      }}>
      <Text color={Colors.neutral[100]}>{title}</Text>
    </TouchableOpacity>
  );
}
