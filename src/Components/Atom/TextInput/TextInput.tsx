import React from 'react';
import {TextInput, View} from 'react-native';
import useTheme from '@Hooks/useTheme';

export default function TextInputBody({placeholder}: {placeholder?: string}) {
  const {Layout} = useTheme();
  return (
    <View style={[Layout.row, Layout.fullWidth]}>
      <TextInput placeholder={placeholder} style={[Layout.fullSize]} />
    </View>
  );
}
