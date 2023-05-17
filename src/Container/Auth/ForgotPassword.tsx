import {BackHandler, ScrollView, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Text from '@Atom/Text';
import {Container, Content} from '@Organism/Basic';
import {HeaderTitle} from '@Molecule/Header';
import {useTranslation} from 'react-i18next';
import useTheme from '@Hooks/useTheme';
import {Button} from '@Atom/Button';
import FastImage from 'react-native-fast-image';
import {width} from '@Theme/Layout';
import {InputField, OTPInputField, PhoneInputField} from '@Molecule/index';
import {
  navigateAndReset,
  navigateBack,
  RootStackParamList,
} from '@Navigators/utils';
import Icon from '@Atom/Icon';
import {RootState} from 'src/Redux/Reducers';
import {connect, ConnectedProps} from 'react-redux';
import {ForgotPasswordScreenProps} from '.';
import {
  requestForgotPassword,
  sendOTP,
  resetProcess,
  dispatchVerifyOTP,
  changePassword,
} from '@Actions/auth';
import {StackScreenProps} from '@react-navigation/stack';
import moment from 'moment';

interface IInput {
  phoneNumber: string;
  email: string;
  forgotPasswordVia: 'phone' | 'email';
  sendOtpVia: 'whatsapp' | 'sms';
  otp: string;
  newPassword: string;
  confirmPassword: string;
  newPasswordHidden: boolean;
  confirmPasswordHidden: boolean;
  countryCode: string;
}

const ForgotPassword = (
  props: ForgotPasswordScreenProps &
    ReduxProps &
    StackScreenProps<RootStackParamList, 'ForgotPasswordScreen'>,
) => {
  const {Common, Fonts, Gutters, Layout, Images, Colors} = useTheme();
  const {t} = useTranslation();

  const [step, setStep] = useState(props.route.params?.step || 1);
  const [input, setInput] = useState<IInput>({
    phoneNumber: '',
    email: props.route.params?.email || '',
    forgotPasswordVia: props.route.params?.email ? 'email' : 'phone', // phone | email
    sendOtpVia: 'whatsapp', // whatsapp | sms
    otp: '',
    newPassword: '',
    confirmPassword: '',
    newPasswordHidden: true,
    confirmPasswordHidden: true,
    countryCode: '+62',
  });
  const [error, setError] = useState({
    newPassword: '',
    confirmPassword: '',
  });
  const [countdownResendOtp, setCountdownResendOtp] = useState(60);
  const [otpExpireTime, setOtpExpireTime] = useState(moment());

  const shouldDisableContinueButton = () => {
    if (step === 1 && input.forgotPasswordVia === 'phone' && !input.phoneNumber)
      return true;
    if (step === 1 && input.forgotPasswordVia === 'email' && !input.email)
      return true;
    if (step === 2 && input.otp.length < 4) return true;
    if (step === 3 && (error.newPassword || error.confirmPassword)) return true;
    return false;
  };

  const shouldShowLoadingButton = () => {
    switch (step) {
      case 1:
        return props.authState.forgotPasswordProcess.loading;
      case 2:
        return props.authState.requestOtpProcess.loading;
      case 3:
        return props.authState.createPasswordProcess.loading;
      default:
        return false;
    }
  };

  useEffect(() => {
    const disableBackAndroid = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );

    return () => {
      disableBackAndroid.remove();
      props._resetProcess();
    };
  }, []);

  useEffect(() => {
    if (
      props.authState.forgotPasswordProcess.success &&
      !props.authState.forgotPasswordProcess.loading
    ) {
      setStep(input.forgotPasswordVia === 'phone' ? 2 : 5);
      props._resetProcess();
    } else if (
      props.authState.verifyOtpProcess.success &&
      !props.authState.verifyOtpProcess.loading
    ) {
      setStep(3);
      props._resetProcess();
    } else if (
      props.authState.createPasswordProcess.success &&
      !props.authState.createPasswordProcess.loading
    ) {
      setStep(4);
      props._resetProcess();
    }
  }, [props.authState]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const timeDiff = otpExpireTime.diff(moment(), 'seconds');
      setCountdownResendOtp(timeDiff < 0 ? 0 : timeDiff);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [countdownResendOtp]);

  return (
    <Container>
      <Content
        contentContainerStyle={[Layout.fill]}
        showsVerticalScrollIndicator={false}>
        <HeaderTitle
          title={step === 4 ? '' : t('forgotPasswordScreen.forgotPassword')}
          onPressBack={
            step === 1
              ? navigateBack
              : step === 5
              ? () => setStep(1)
              : step === 3 && input.forgotPasswordVia === 'email'
              ? () => setStep(1)
              : () => setStep(prev => prev - 1)
          }
        />
        {/* STEP 1: INPUT PHONE NUMBER OR EMAIL */}
        {step === 1 ? (
          <>
            <View
              style={[
                Common.backgroundLayout,
                Layout.colVCenter,
                Gutters.smallTMargin,
                Gutters.regularPadding,
              ]}>
              <FastImage
                source={Images.forgotPasswordScreen.forgotPassword}
                resizeMode={FastImage.resizeMode.contain}
                style={[{width: width / 1.5, height: width / 1.5}]}
              />
              <Text variant="light" size="sm" style={[Fonts.textCenter]}>
                {t(
                  input.forgotPasswordVia === 'phone'
                    ? 'forgotPasswordScreen.enterYourPhone'
                    : 'forgotPasswordScreen.enterYourEmail',
                )}
              </Text>
            </View>
            <View
              style={[
                Common.backgroundLayout,
                Gutters.smallTMargin,
                Gutters.smallPadding,
                Layout.fill,
              ]}>
              {input.forgotPasswordVia === 'phone' ? (
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
                  errorMessage={
                    props.authState.errorForgotPassword?.slice?.(0, 5) ===
                    'phone'
                      ? t(
                          `forgotPasswordScreen.${props.authState.errorForgotPassword}`,
                        )
                      : ''
                  }
                />
              ) : null}
              {input.forgotPasswordVia === 'email' ? (
                <InputField
                  label={t('forgotPasswordScreen.Email')}
                  placeholder={t('forgotPasswordScreen.yourEmail')}
                  value={input.email}
                  onChangeValue={text =>
                    setInput(prev => ({...prev, email: text}))
                  }
                  errorMessage={
                    props.authState.errorForgotPassword?.slice?.(0, 5) ===
                    'email'
                      ? t(
                          `forgotPasswordScreen.${props.authState.errorForgotPassword}`,
                        )
                      : ''
                  }
                />
              ) : null}
              <TouchableOpacity
                style={[Gutters.smallTMargin]}
                onPress={() =>
                  setInput(prev => ({
                    ...prev,
                    forgotPasswordVia:
                      prev.forgotPasswordVia === 'phone' ? 'email' : 'phone',
                  }))
                }>
                <Text color={Colors.primary[600]} size="xs">
                  {t('forgotPasswordScreen.forgotVia', {
                    via:
                      input.forgotPasswordVia === 'phone'
                        ? t('forgotPasswordScreen.email')
                        : t('forgotPasswordScreen.phoneNumber'),
                  })}
                </Text>
              </TouchableOpacity>
            </View>
          </>
        ) : null}
        {/* STEP 2: VERIFY OTP */}
        {step === 2 ? (
          <>
            <View
              style={[
                Common.backgroundLayout,
                Layout.colVCenter,
                Gutters.smallTMargin,
                Gutters.regularPadding,
              ]}>
              <FastImage
                source={
                  input.sendOtpVia === 'whatsapp'
                    ? Images.forgotPasswordScreen.otpWhatsApp
                    : Images.forgotPasswordScreen.otpSms
                }
                resizeMode={FastImage.resizeMode.contain}
                style={[{width: width / 2, height: width / 2}]}
              />
              <Text
                variant="light"
                size="sm"
                style={[Fonts.textCenter, Gutters.regularTMargin]}>
                {t('forgotPasswordScreen.yourOtpSent', {
                  via: input.sendOtpVia === 'whatsapp' ? 'WhatsApp' : 'SMS',
                })}
              </Text>
            </View>
            <View
              style={[
                Common.backgroundLayout,
                Gutters.smallTMargin,
                Gutters.smallPadding,
                Layout.fill,
              ]}>
              <Text
                variant="semibold"
                style={[
                  Fonts.textCenter,
                  Gutters.smallTMargin,
                  Gutters.largeBMargin,
                ]}>
                {t('forgotPasswordScreen.inputOtp')}
              </Text>
              <OTPInputField
                value={input.otp}
                onChangeValue={text => setInput(prev => ({...prev, otp: text}))}
                initialCountdown={countdownResendOtp}
                onResendOtp={() => onRequestOtp(input.sendOtpVia)}
                errorMessage={
                  props.authState.errorVerifyOtp
                    ? t(
                        `forgotPasswordScreen.${props.authState.errorVerifyOtp}`,
                      )
                    : ''
                }
              />
              <View style={Layout.fill} />
              <TouchableOpacity
                style={[Gutters.xlargeBMargin]}
                onPress={() => {
                  setInput(prev => ({
                    ...prev,
                    sendOtpVia:
                      prev.sendOtpVia === 'whatsapp' ? 'sms' : 'whatsapp',
                  }));
                  onRequestOtp(
                    input.sendOtpVia === 'whatsapp' ? 'sms' : 'whatsapp',
                  );
                }}>
                <Text
                  style={[Fonts.textCenter]}
                  variant="semibold"
                  color={Colors.primary[600]}>
                  {t('forgotPasswordScreen.anotherWay', {
                    via: input.sendOtpVia === 'whatsapp' ? 'SMS' : 'WhatsApp',
                  })}
                </Text>
              </TouchableOpacity>
            </View>
          </>
        ) : null}
        {/* STEP 3: CREATE NEW PASSWORD */}
        {step === 3 ? (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={[
                Common.backgroundLayout,
                Layout.colVCenter,
                Gutters.smallTMargin,
                Gutters.regularPadding,
              ]}>
              <Text variant="semibold" size="base">
                {t('forgotPasswordScreen.createNewPassword')}
              </Text>
              <Text
                style={[Gutters.regularVMargin, Fonts.textCenter]}
                color={Colors.neutral[400]}>
                {t('forgotPasswordScreen.createSecurePassword')}
              </Text>
              <FastImage
                source={Images.forgotPasswordScreen.createNewPassword}
                resizeMode={FastImage.resizeMode.contain}
                style={[{width: width / 1.5, height: width / 1.5}]}
              />
            </View>
            <View
              style={[
                Common.backgroundLayout,
                Gutters.smallTMargin,
                Gutters.smallPadding,
                Layout.fill,
              ]}>
              <InputField
                label={t('forgotPasswordScreen.createNewPassword')}
                value={input.newPassword}
                onChangeValue={text =>
                  setInput(prev => ({...prev, newPassword: text}))
                }
                style={[Gutters.smallTMargin]}
                placeholder={t('forgotPasswordScreen.inputNewPassword')}
                secureTextEntry={input.newPasswordHidden}
                rightIcon={input.newPasswordHidden ? 'eye' : 'eye-off'}
                onPressRightIcon={() =>
                  setInput(prev => ({
                    ...prev,
                    newPasswordHidden: !prev.newPasswordHidden,
                  }))
                }
                onBlur={validatePassword}
                errorMessage={
                  error.newPassword
                    ? t(`forgotPasswordScreen.${error.newPassword}`)
                    : ''
                }
              />
              <InputField
                label={t('forgotPasswordScreen.confirmPassword')}
                value={input.confirmPassword}
                onChangeValue={text =>
                  setInput(prev => ({...prev, confirmPassword: text}))
                }
                style={[Gutters.smallTMargin]}
                placeholder={t('forgotPasswordScreen.inputConfirmPasword')}
                secureTextEntry={input.confirmPasswordHidden}
                rightIcon={input.confirmPasswordHidden ? 'eye' : 'eye-off'}
                onPressRightIcon={() =>
                  setInput(prev => ({
                    ...prev,
                    confirmPasswordHidden: !prev.confirmPasswordHidden,
                  }))
                }
                onBlur={validatePassword}
                errorMessage={
                  error.confirmPassword
                    ? t(`forgotPasswordScreen.${error.confirmPassword}`)
                    : ''
                }
              />
              <Text variant="semibold" style={[Gutters.smallTMargin]}>
                {t('forgotPasswordScreen.mustContain')}
              </Text>
              <View style={[Layout.rowHCenter, Gutters.smallTMargin]}>
                <Icon name="dot" size={6} color={Colors.info[600]} />
                <Text variant="light" size="xs" style={[Gutters.tinyLMargin]}>
                  {t('forgotPasswordScreen.specialChars')}
                </Text>
              </View>
              <View style={[Layout.rowHCenter, Gutters.tinyTMargin]}>
                <Icon name="dot" size={6} color={Colors.info[600]} />
                <Text variant="light" size="xs" style={[Gutters.tinyLMargin]}>
                  {t('forgotPasswordScreen.upperLowerCase')}
                </Text>
              </View>
              <View style={[Layout.rowHCenter, Gutters.tinyTMargin]}>
                <Icon name="dot" size={6} color={Colors.info[600]} />
                <Text variant="light" size="xs" style={[Gutters.tinyLMargin]}>
                  {t('forgotPasswordScreen.numbers')}
                </Text>
              </View>
              <View style={[Layout.rowHCenter, Gutters.tinyTMargin]}>
                <Icon name="dot" size={6} color={Colors.info[600]} />
                <Text variant="light" size="xs" style={[Gutters.tinyLMargin]}>
                  {t('forgotPasswordScreen.min8Chars')}
                </Text>
              </View>
            </View>
          </ScrollView>
        ) : null}
        {/* STEP 4: SUCCESS RESET PASSWORD */}
        {step === 4 ? (
          <>
            <View
              style={[
                Common.backgroundLayout,
                Layout.colVCenter,
                Gutters.smallTMargin,
                Gutters.regularPadding,
                Layout.fill,
              ]}>
              <FastImage
                source={Images.forgotPasswordScreen.successResetPassword}
                resizeMode={FastImage.resizeMode.contain}
                style={[{width: width / 1.5, height: width / 1.5}]}
              />
              <Text variant="semibold" size="base">
                {t('forgotPasswordScreen.success')}
              </Text>
              <Text
                style={[Gutters.regularVMargin, Fonts.textCenter]}
                color={Colors.neutral[400]}>
                {t('forgotPasswordScreen.successResetPassword')}
              </Text>
            </View>
          </>
        ) : null}
        {/* STEP 5: SUCCESS RESET EMAIL */}
        {step === 5 ? (
          <>
            <View
              style={[
                Common.backgroundLayout,
                Layout.colVCenter,
                Gutters.smallTMargin,
                Gutters.regularPadding,
                Layout.fill,
              ]}>
              <FastImage
                source={Images.forgotPasswordScreen.emailSent}
                resizeMode={FastImage.resizeMode.contain}
                style={[{width: width / 1.5, height: width / 1.5}]}
              />
              <Text variant="semibold" size="base">
                {t('forgotPasswordScreen.hoorayy')}
              </Text>
              <Text
                style={[Gutters.regularVMargin, Fonts.textCenter]}
                color={Colors.neutral[400]}>
                {t('forgotPasswordScreen.emailSent')}
              </Text>
            </View>
          </>
        ) : null}
        {step !== 5 ? (
          <View style={[Common.backgroundLayout]}>
            <Button
              onPress={onPressContinue}
              title={t('loginScreen.continue')}
              titleStyle={{color: Colors.white}}
              style={[
                Gutters.smallVPadding,
                Gutters.largeBMargin,
                Gutters.smallHMargin,
                {flex: 0},
              ]}
              disabled={shouldDisableContinueButton()}
              loading={shouldShowLoadingButton()}
            />
          </View>
        ) : null}
      </Content>
    </Container>
  );

  async function onPressContinue() {
    switch (step) {
      case 1:
        await onForgotPassword();
        setOtpExpireTime(moment().add(60, 'seconds'));
        setCountdownResendOtp(otpExpireTime.diff(moment(), 'seconds'));
        break;
      case 2:
        onVerifyOtp();
        break;
      case 3:
        onCreateNewPassword();
        break;
      case 4:
        navigateAndReset(
          [{name: 'OnboardingScreen'}, {name: 'LoginScreen'}],
          1,
        );
        return;
    }

    // if (step === 1) {
    //   setStep(input.forgotPasswordVia === 'phone' ? 2 : 5);
    // } else {
    //   setStep(prev => (prev < 4 ? prev + 1 : prev));
    // }
  }

  async function onRequestOtp(via: 'sms' | 'whatsapp') {
    setOtpExpireTime(moment().add(60, 'seconds'));
    setCountdownResendOtp(otpExpireTime.diff(moment(), 'seconds'));
    props._requestOtp(input.countryCode + input.phoneNumber, via);
  }

  async function onForgotPassword() {
    try {
      if (input.forgotPasswordVia === 'phone') {
        props._requestForgotPassword(
          'phone',
          input.countryCode + input.phoneNumber,
          'whatsapp',
        );
      } else if (input.forgotPasswordVia === 'email') {
        props._requestForgotPassword('email', input.email);
      }
    } catch (error) {
      console.log('err request email', error);
    }
  }

  async function onVerifyOtp() {
    try {
      props._verifyOtp(
        input.countryCode + input.phoneNumber,
        input.sendOtpVia,
        input.otp,
      );
    } catch (error) {
      console.log('err ver', error);
    }
  }

  function validatePassword() {
    const passwordRegex =
      /^(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$/;
    if (input.newPassword.length < 8) {
      setError(prev => ({...prev, newPassword: 'password8Chars'}));
    } else if (!passwordRegex.test(input.newPassword)) {
      setError(prev => ({...prev, newPassword: 'passwordMustConsist'}));
    } else if (input.newPassword !== input.confirmPassword) {
      setError(prev => ({
        ...prev,
        newPassword: '',
        confirmPassword: 'passwordNotMatch',
      }));
    } else {
      setError({newPassword: '', confirmPassword: ''});
    }
  }

  async function onCreateNewPassword() {
    try {
      props._changePassword(
        input.forgotPasswordVia,
        input.forgotPasswordVia === 'email'
          ? input.email
          : input.countryCode + input.phoneNumber,
        input.newPassword,
        input.confirmPassword,
      );
    } catch (error) {
      console.log('err cp', error);
    }
  }
};

const mapStateToProps = ({auth}: RootState) => ({
  authState: auth,
});

const mapDispatchToProps = {
  _requestForgotPassword: requestForgotPassword,
  _requestOtp: sendOTP,
  _verifyOtp: dispatchVerifyOTP,
  _changePassword: changePassword,
  _resetProcess: resetProcess,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(ForgotPassword);
