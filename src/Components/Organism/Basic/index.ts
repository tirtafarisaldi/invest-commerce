import React from 'react';
import {StatusBarProps, StyleProp, ViewProps, ViewStyle} from 'react-native';
import {KeyboardAwareScrollViewProps} from 'react-native-keyboard-aware-scroll-view';
import Container from './Container';
import Content from './Content';

export interface IContainer extends ViewProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  statusBar?: StatusBarProps;
}

export interface IContent extends KeyboardAwareScrollViewProps {
  children: React.ReactNode;
  disableKBDismissScroll?: boolean;
  contentContainerStyle?: StyleProp<ViewStyle>;
  keyboardShouldPersistTaps?: 'always' | 'handled' | 'never';
  showsVerticalScrollIndicator?: boolean;
}

export {Container, Content};
