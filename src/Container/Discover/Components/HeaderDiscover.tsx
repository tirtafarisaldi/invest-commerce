import {TouchableOpacity, View} from 'react-native';
import React from 'react';
import useTheme from '@Hooks/useTheme';
import FastImage from 'react-native-fast-image';
import Icon from '@Atom/Icon';
import {navigate} from '@Navigators/utils';
import {RootState} from 'src/Redux/Reducers';
import {connect, ConnectedProps} from 'react-redux';

interface IHeaderDiscover {
  hasNotification?: boolean;
}

const HeaderDiscover = ({
  hasNotification,
  auth,
  userState,
}: IHeaderDiscover & ReduxProps) => {
  const {Layout, Common, Colors, Images, Gutters, FontSize} = useTheme();
  const {isLogin} = auth;
  return (
    <View
      style={[
        Layout.rowHCenter,
        Common.backgroundLayout,
        Gutters.smallVPadding,
      ]}>
      <View style={[Layout.fill]}>
        <FastImage
          source={Images.text_logo}
          style={[Common.header.headerLogo]}
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>
      <View style={[Layout.rowHCenter, Gutters.smallHMargin]}>
        <TouchableOpacity>
          <Icon name="chat-outline" color={Colors.neutral[500]} size="xl3" />
        </TouchableOpacity>
        <TouchableOpacity style={[Gutters.smallHMargin]}>
          <Icon
            name="notification-bell"
            color={Colors.neutral[500]}
            size="xl3"
          />
          {hasNotification ? (
            <View
              style={[
                Layout.round,
                {
                  position: 'absolute',
                  right: 0,
                  top: 0,
                  width: FontSize['xs'],
                  height: FontSize['xs'],
                  backgroundColor: Colors.secondary[600],
                },
              ]}
            />
          ) : null}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            isLogin ? navigate('MyProfileScreen') : navigate('LoginScreen');
          }}>
          <FastImage
            source={
              userState.profileData?.avatar
                ? {uri: userState.profileData.avatar}
                : Images.discover.defaultAvatar
            }
            style={{width: FontSize['xl3'], height: FontSize['xl3']}}
            resizeMode={FastImage.resizeMode.contain}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const mapStateToProps = ({auth, user}: RootState) => ({
  auth: auth,
  userState: user,
});

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(HeaderDiscover);
