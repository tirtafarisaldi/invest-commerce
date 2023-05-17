import {setIsLogin} from '@Actions/auth';
import {changeTheme, ThemeState} from '@Actions/theme';
import {Button, Text, UpDownVote} from '@Atom/index';
import {Profile} from '@Atom/Profile';
import {useTheme} from '@Hooks/index';
import {navigate, navigateAndReset} from '@Navigators/utils';
import {Container, Content} from '@Organism/Basic';
import {Colors} from '@Theme/Variables';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {TouchableOpacity, View} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from 'src/Redux/Reducers';
import {baseUrlHost} from 'src/Services/BaseURL';
import {LoginScreenProps} from './index';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import LanguageSwitcher from './LanguageSheet/LanguageSwitcherSheet';

type Props = LoginScreenProps & ReduxProps;

const DemoUserProfile = (props: Props) => {
  const {_changeTheme, _setIsLogin, currentStatus} = props;
  const {Common, Fonts, Gutters, Layout} = useTheme();
  const {t} = useTranslation();

  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ['40%', '40%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  useEffect(() => {
    console.log('baseUrlHost', baseUrlHost);
  }, []);

  return (
    <BottomSheetModalProvider>
      <Content contentContainerStyle={[Common.backgroundLayout]}>
        <Button title={'Default Button'} onPress={() => navigate('LoginScreen')} />

        <View style={[Layout.rowCenter, Layout.fill]}>
          <Button
            onPress={handlePresentModalPress}
            title="Present Modal"
            colors="green"
          />
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}>
            <View style={[Layout.rowCenter]}>
              <LanguageSwitcher />
            </View>
          </BottomSheetModal>
        </View>
      </Content>
    </BottomSheetModalProvider>
  );

  function onLogin() {
    _setIsLogin(!currentStatus);
  }
};

const mapStateToProps = ({auth}: RootState) => ({
  currentStatus: auth.isLogin,
});

const mapDispatchToProps = {
  _changeTheme: changeTheme,
  _setIsLogin: setIsLogin,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(DemoUserProfile);
