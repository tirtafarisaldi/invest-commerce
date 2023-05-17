/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import FastImage from 'react-native-fast-image';
import Icon from '@Atom/Icon';
import Text from '@Atom/Text';
import useTheme from '@Hooks/useTheme';
import {navigate, navigateBack} from '@Navigators/utils';
import {HeaderWrapper, IHeaderTitle} from './index';
import {RootState} from 'src/Redux/Reducers';

const HeaderTitle = ({
  style,
  title,
  titleColor,
  onPressBack,
  rightIcon,
  rightIconColor,
  onPressRightIcon,
  showAvatarProfile,
}: IHeaderTitle) => {
  const {Common, FontSize, Colors, Images} = useTheme();
  const isLogin = useSelector(({auth}: RootState) => auth.isLogin);

  return (
    <HeaderWrapper style={[Common.header.headerBrandContent, style]}>
      <TouchableOpacity onPress={onPressBack || navigateBack}>
        <Icon name="arrow-left" size="xl" />
      </TouchableOpacity>
      <Text
        variant="semibold"
        color={titleColor || Colors.neutral[500]}
        size="lg"
        style={{textAlign: 'center', width: '90%'}}>
        {title}
      </Text>
      {rightIcon ? (
        <TouchableOpacity onPress={onPressRightIcon}>
          <Icon name={rightIcon} size="xl" color={rightIconColor} />
        </TouchableOpacity>
      ) : (
        <View style={{width: FontSize.xl}} />
      )}
      {showAvatarProfile ? (
        <TouchableOpacity
          onPress={() => {
            isLogin ? navigate('MyProfileScreen') : navigate('LoginScreen');
          }}
          style={{position: 'absolute', right: 10}}>
          <FastImage
            source={Images.discover.defaultAvatar}
            style={{width: FontSize.xl3, height: FontSize.xl3}}
            resizeMode={FastImage.resizeMode.contain}
          />
        </TouchableOpacity>
      ) : null}
    </HeaderWrapper>
  );
};

export default HeaderTitle;
