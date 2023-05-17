import React from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {IContent} from '.';

const Content = ({
  children,
  contentContainerStyle,
  keyboardShouldPersistTaps,
  showsVerticalScrollIndicator,
  ...props
}: IContent) => {
  return (
    <KeyboardAwareScrollView
      automaticallyAdjustContentInsets={false}
      contentContainerStyle={[{}, contentContainerStyle]}
      keyboardShouldPersistTaps={keyboardShouldPersistTaps || 'handled'}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      {...props}>
      {children}
    </KeyboardAwareScrollView>
  );
};

export default Content;
