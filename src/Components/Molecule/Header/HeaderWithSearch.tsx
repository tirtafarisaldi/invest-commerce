import Icon from '@Atom/Icon';
import useTheme from '@Hooks/useTheme';
import { InputField } from '@Molecule/InputField';
import { navigate, navigateBack } from '@Navigators/utils';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { IHeaderSearch } from './index';
import { Text } from '@Atom/index';
import FastImage from 'react-native-fast-image';
import { useSelector } from 'react-redux';
import { RootState } from 'src/Redux/Reducers';
import { useTranslation } from 'react-i18next';

export default function HeaderWithSearch({
  placeholder,
  onChangeValue,
  valueInput,
  style,
  onPressBack,
  showAvatarProfile,
}: IHeaderSearch) {
  const { Common, Gutters, Colors, Images, FontSize } = useTheme();
  const isLogin = useSelector(({ auth }: RootState) => auth.isLogin);
  const { t } = useTranslation();
  const defaultAction: VoidFunction = () => {
    navigateBack();
  };

  return (
    <View
      style={[
        { backgroundColor: Colors.neutral[100] },
        Common.header.headerWithSearch,
        style,
      ]}>
      <TouchableOpacity
        onPress={onPressBack || navigateBack}
        style={[Gutters.smallLMargin]}>
        <Icon name="arrow-left" size="xl" />
      </TouchableOpacity>
      <InputField
        value={valueInput}
        onChangeValue={onChangeValue}
        variant="bordered"
        leftIcon="search"
        iconSize={'xl2'}
        placeholder={placeholder}
        style={[Gutters.regularHPadding, { flex: 1 }]}
      />
      {showAvatarProfile ? (
        <TouchableOpacity
          style={Gutters.regularRPadding}
          onPress={() => {
            isLogin ? navigate('MyProfileScreen') : navigate('LoginScreen');
          }}>
          <FastImage
            source={Images.discover.defaultAvatar}
            style={{ width: FontSize['xl3'], height: FontSize['xl3'] }}
            resizeMode={FastImage.resizeMode.contain}
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
}
