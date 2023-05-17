import useTheme from '@Hooks/useTheme';
import React from 'react';
import {SafeAreaView, StatusBar, View} from 'react-native';
import {IContainer} from '.';
import Base from './basic.style';

const Container = ({children, statusBar, style}: IContainer) => {
  const {Common, Colors} = useTheme();
  return (
    <>
      <StatusBar
        backgroundColor={statusBar?.backgroundColor || Colors.white}
        barStyle={statusBar?.barStyle || 'dark-content'}
      />
      <SafeAreaView
        style={[{backgroundColor: statusBar?.backgroundColor || Colors.white}]}
      />
      <View
        style={[
          Base['Basic.Container'],
          Common.backgroundLayout.backgroundColor,
          style,
        ]}>
        {children}
      </View>
    </>
  );
};

export default Container;
