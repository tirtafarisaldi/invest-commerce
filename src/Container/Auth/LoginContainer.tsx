import {loginOauth, loginPhoneNumber, resetErrorMessage} from '@Actions/auth';
import {changeTheme} from '@Actions/theme';
import {Button, Icon, Text} from '@Atom/index';
import {useTheme} from '@Hooks/index';
import {navigate} from '@Navigators/utils';
import {HeaderTitle} from '@Molecule/Header';
import {Container, Content} from '@Organism/Basic';
import {Colors} from '@Theme/Variables';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Platform, TouchableOpacity, View} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from 'src/Redux/Reducers';
import {LoginScreenProps} from './index';
import FastImage from 'react-native-fast-image';
import {width} from '@Theme/Layout';
import {InputField, PhoneInputField} from '@Molecule/InputField';
import ButtonWithLogo from './Components/ButtonWithLogo';
import Modal from '@Molecule/Modal';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import {
  Settings,
  LoginManager,
  Profile,
  AccessToken,
} from 'react-native-fbsdk-next';
import {BiometricsButton, BiometricsModal} from '@Molecule/Biometrics';
import useBiometrics from '@Hooks/useBiometrics';

Settings.setAppID('1365286897641554');
Settings.initializeSDK();

type Props = LoginScreenProps & ReduxProps;

GoogleSignin.configure();

const LoginContainer = (props: Props) => {
  const {Common, Fonts, Gutters, Layout, Images} = useTheme();
  const {t} = useTranslation();
  const {availableBiometry} = useBiometrics();

  const [input, setInput] = useState({
    countryCode: '+62',
    phoneNumber: '',
    password: '',
    passwordHidden: true,
    checkKeepLogin: false,
  });

  const [modal, setModal] = useState({
    biometrics: false,
  });

  useEffect(() => {
    return () => {
      props._resetErrorMessage();
    };
  }, []);

  useEffect(() => {
    props._resetErrorMessage();
  }, [input.phoneNumber, input.password]);

  useEffect(() => {
    // Do something
  }, [props.authState.loginProcess]);

  return (
    <Container>
      <Content contentContainerStyle={[]} showsVerticalScrollIndicator={false}>
        <HeaderTitle title={t('loginScreen.login')} />
        <View
          style={[
            Common.backgroundLayout,
            Layout.colVCenter,
            Gutters.smallTMargin,
            Gutters.regularPadding,
          ]}>
          <FastImage
            source={Images.loginScreen.welcome}
            resizeMode={FastImage.resizeMode.contain}
            style={[{width: width / 1.5, height: width / 1.5}]}
          />
          <Text variant="light" size="sm" style={[Fonts.textCenter]}>
            {t('loginScreen.enterPhone')}
          </Text>
        </View>
        <View
          style={[
            Common.backgroundLayout,
            Gutters.smallTMargin,
            Gutters.smallPadding,
          ]}>
          <PhoneInputField
            label={t('loginScreen.phoneNumber')}
            value={input.phoneNumber}
            onChangeValue={text =>
              setInput(prev => ({...prev, phoneNumber: text}))
            }
            countryCodeValue={input.countryCode}
            onChangeCountryCode={text =>
              setInput(prev => ({...prev, countryCode: text}))
            }
          />
          <InputField
            label={t('loginScreen.password')}
            value={input.password}
            onChangeValue={text =>
              setInput(prev => ({...prev, password: text}))
            }
            style={[Gutters.smallTMargin]}
            placeholder={t('loginScreen.inputYourPass')}
            secureTextEntry={input.passwordHidden}
            rightIcon={input.passwordHidden ? 'eye' : 'eye-off'}
            onPressRightIcon={() =>
              setInput(prev => ({
                ...prev,
                passwordHidden: !prev.passwordHidden,
              }))
            }
            errorMessage={
              props.authState.errorLogin &&
              t(`loginScreen.${props.authState.errorLogin}`)
            }
          />
          <View
            style={[
              Layout.rowHCenter,
              Layout.justifyContentBetween,
              Gutters.smallTMargin,
            ]}>
            <TouchableOpacity
              style={[Layout.rowHCenter]}
              onPress={() =>
                setInput(prev => ({
                  ...prev,
                  checkKeepLogin: !prev.checkKeepLogin,
                }))
              }>
              <Icon name={input.checkKeepLogin ? 'check-square' : 'square'} />
              <Text size="xs" style={[Gutters.smallLMargin]}>
                {t('loginScreen.keepLogged')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigate('ForgotPasswordScreen')}>
              <Text
                size="xs"
                color={Colors.primary[600]}
                style={{textDecorationLine: 'underline'}}>
                {t('loginScreen.forgotPassword')}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={[Layout.rowHCenter, Gutters.smallTMargin]}>
            <Button
              title={t('loginScreen.continue')}
              titleStyle={{color: Colors.white}}
              style={[Gutters.smallVPadding]}
              onPress={() => onLogin()}
              loading={props?.authState?.loginProcess?.loading}
            />
            <BiometricsButton
              iconColor={Colors.primary[600]}
              iconSize="xl"
              style={[
                Gutters.smallVPadding,
                {borderColor: Colors.primary[600], borderWidth: 1},
              ]}
              onPress={() => setModal(prev => ({...prev, biometrics: true}))}
            />
          </View>

          <View style={[Layout.rowHCenter, Gutters.smallTMargin]}>
            <View
              style={[
                Layout.fill,
                {borderBottomWidth: 1, borderColor: Colors.neutral[300]},
              ]}
            />
            <Text style={[Gutters.smallHMargin]} color={Colors.neutral[300]}>
              Or
            </Text>
            <View
              style={[
                Layout.fill,
                {borderBottomWidth: 1, borderColor: Colors.neutral[300]},
              ]}
            />
          </View>
          <ButtonWithLogo
            label={t('loginScreen.loginWith', {oauth: 'Google'})}
            Logo={() => (
              <FastImage
                source={Images.loginScreen.google}
                resizeMode={FastImage.resizeMode.contain}
                style={[{width: 20, height: 20}]}
              />
            )}
            onPress={onLoginWithGoogle}
          />
          {Platform.OS === 'ios' ? (
            <ButtonWithLogo
              label={t('loginScreen.loginWith', {oauth: 'Apple'})}
              Logo={() => (
                <FastImage
                  source={Images.loginScreen.apple}
                  resizeMode={FastImage.resizeMode.contain}
                  style={[{width: 20, height: 20}]}
                />
              )}
              style={[Gutters.smallTMargin]}
              onPress={onLoginWithApple}
            />
          ) : null}
          <ButtonWithLogo
            label={t('loginScreen.loginWith', {oauth: 'Facebook'})}
            Logo={() => (
              <FastImage
                source={Images.loginScreen.facebook}
                resizeMode={FastImage.resizeMode.contain}
                style={[{width: 20, height: 20}]}
              />
            )}
            style={[Gutters.smallTMargin]}
            onPress={onLoginWithFacebook}
          />
        </View>
      </Content>
      <Modal
        variant="bottom"
        isVisible={modal.biometrics}
        hideModal={() => setModal(prev => ({...prev, biometrics: false}))}>
        <BiometricsModal
          type="verify"
          title={t('loginScreen.biometricsLogin')}
          description={t('loginScreen.useBiometric', {
            biometric:
              availableBiometry === 'FaceID' ? 'face id' : 'fingerprint',
          })}
          helperText={
            availableBiometry === 'FaceID'
              ? t('loginScreen.putFace')
              : t('loginScreen.putFingerprint')
          }
          hideModal={() => setModal(prev => ({...prev, biometrics: false}))}
          credentialToGet="password"
          onCompleteVerify={({phoneNumber, password}) =>
            onLogin(phoneNumber, password)
          }
        />
      </Modal>
    </Container>
  );

  function onLogin(
    phoneNumber: string = input.countryCode + input.phoneNumber,
    password: string = input.password,
    checkKeepLogin: boolean = input.checkKeepLogin,
  ) {
    props._loginPhoneNumber(phoneNumber, password, checkKeepLogin);
  }

  async function onLoginWithFacebook() {
    try {
      const loginFb = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);
      // console.log('loginFb', loginFb);
      if (loginFb.isCancelled) throw 'Cancelled';
      if (
        loginFb.declinedPermissions &&
        loginFb.declinedPermissions?.length > 1
      )
        throw 'Declined';

      const currentProfile = await Profile.getCurrentProfile();
      const token = await AccessToken.getCurrentAccessToken();
      // console.log('fb profile', token);
      // console.log('profile', currentProfile);

      if (token) {
        props._loginOauth('facebook', token.accessToken || '', () =>
          navigate('RegisterScreen', {
            email: currentProfile?.email,
            name: currentProfile?.name,
          }),
        );
      }
    } catch (error) {
      console.log('error fb', error);
    }
    0;
  }

  async function onLoginWithGoogle() {
    try {
      // console.log('google login');
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const token = await GoogleSignin.getTokens();
      console.log('userinfo', userInfo);

      props._loginOauth('google', token.accessToken, () =>
        navigate('RegisterScreen', {
          email: userInfo.user.email,
          name: userInfo.user.name,
        }),
      );
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log('SIGN_IN_CANCELLED');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        console.log('IN_PROGRESS');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log('PLAY_SERVICES_NOT_AVAILABLE');
      } else {
        // some other error happened
        console.log('error sign google', error);
      }
    }
  }

  async function onLoginWithApple() {
    try {
      // console.log('apple login');
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      });
      // console.log('apple', appleAuthRequestResponse);
      if (appleAuthRequestResponse.email) {
        navigate('RegisterScreen', {
          email: appleAuthRequestResponse.email,
          name: `${appleAuthRequestResponse.fullName?.givenName + ' ' || ''}${
            appleAuthRequestResponse.fullName?.middleName
              ? `${appleAuthRequestResponse.fullName.middleName}`
              : ''
          }${appleAuthRequestResponse.fullName?.familyName || ''}`,
        });
      }
    } catch (error) {
      console.log('error apple', error);
    }
  }
};

const mapStateToProps = ({auth}: RootState) => ({
  authState: auth,
});

const mapDispatchToProps = {
  _changeTheme: changeTheme,
  _loginPhoneNumber: loginPhoneNumber,
  _loginOauth: loginOauth,
  _resetErrorMessage: resetErrorMessage,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(LoginContainer);
