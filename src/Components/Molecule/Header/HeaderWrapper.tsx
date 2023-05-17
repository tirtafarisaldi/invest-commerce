import useTheme from '@Hooks/useTheme';
import React from 'react';
import {View} from 'react-native';
import {IHeader} from './index';

const Header = (props: IHeader) => {
  const {style, ref, children} = props;
  const {Common} = useTheme();

  const Wrapper = (wrapperProps: {children: React.ReactNode}) => {
    const {children: wrapperChildren} = wrapperProps;
    return (
      <View style={[Common.header.wrapper, style]}>{wrapperChildren}</View>
    );
  };

  return (
    <Wrapper>
      <View ref={ref} {...props}>
        {children}
      </View>
    </Wrapper>
  );
};

export default React.memo(Header);
