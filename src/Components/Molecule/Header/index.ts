import { StyleProp, View, ViewProps, ViewStyle } from 'react-native';
import HeaderWrapper from './HeaderWrapper';
import HeaderBackOnly from './HeaderBackOnly';
import HeaderBrand from './HeaderBrand';
import HeaderTitle from './HeaderTitle';
import HeaderWithSearch from './HeaderWithSearch';
import { IconName } from '@Atom/index';

export interface IHeader extends ViewProps {
  androidStatusBarColor?: string;
  ref?: React.LegacyRef<View>;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

export interface IHeaderBack extends IHeader {
  onPress?: VoidFunction;
  iconColor?: string;
}

export interface IHeaderTitle extends IHeader {
  title?: string;
  titleColor?: string;
  placeholder?: string;
  withoutBack?: boolean;
  onPressBack?: () => void;
  rightIcon?: IconName;
  rightIconColor?: string;
  onPressRightIcon?: () => void;
  CustomRightIcon?: React.FunctionComponent;
  showAvatarProfile?: boolean;
}

export interface IHeaderSearch extends IHeader {
  placeholder?: string;
  withoutBack?: boolean;
  valueInput: string;
  onChangeValue: (value: string) => void;
  onPressBack?: () => void;
  showAvatarProfile?: boolean;
}

export {
  HeaderWrapper,
  HeaderBackOnly,
  HeaderBrand,
  HeaderTitle,
  HeaderWithSearch,
};
