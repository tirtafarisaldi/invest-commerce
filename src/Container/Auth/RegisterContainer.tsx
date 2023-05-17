import {Button, Icon, Text} from '@Atom/index';
import {useTheme} from '@Hooks/index';
import {RootStackParamList, navigate, navigateBack} from '@Navigators/utils';
import {HeaderTitle} from '@Molecule/Header';
import {Container, Content} from '@Organism/Basic';
import {Colors} from '@Theme/Variables';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Platform,
  TouchableOpacity,
  View,
  FlatList,
  Pressable,
  BackHandler,
} from 'react-native';
import {RegisterScreenProps} from './index';
import FastImage from 'react-native-fast-image';
import {width} from '@Theme/Layout';
import {InputField, PhoneInputField, OTPInputField} from '@Molecule/InputField';
import Modal from '@Molecule/Modal';
import BiometricsModalRegister from './Components/BiometricsModalRegister';
import DatePicker from 'react-native-date-picker';
import ButtonWithLogo from './Components/ButtonWithLogo';
import {
  createAccount,
  getAvatarListMale,
  getAvatarListFemale,
  sendOTP,
  validateEmail,
  validatePhone,
  validateRefCode,
  validateSeedsTag,
  verifyOTP,
} from '@Actions/auth';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from 'src/Redux/Reducers';
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
import moment from 'moment';
import {StackScreenProps} from '@react-navigation/stack';

type Props = RegisterScreenProps &
  ReduxProps &
  StackScreenProps<RootStackParamList, 'RegisterScreen'>;
type ItemData = {
  id: number;
  images: string;
};

interface IInput {
  countryCode: string;
  phoneNumber: string;
  email: string;
  birthday: Date;
  name: string;
  seedsTag: string;
  referralCode: string;
  forgotPasswordVia: 'phone' | 'email';
  sendOtpVia: 'whatsapp' | 'sms';
  otp: string;
  newPassword: string;
  confirmPassword: string;
  newPasswordHidden: boolean;
  confirmPasswordHidden: boolean;
  avatar: string;
}

const RegisterContainer = (props: Props) => {
  const {Common, Fonts, Gutters, Layout, Images} = useTheme();
  const {_getAvatarListMale, _getAvatarListFemale, _requestOtp} = props;
  const {t} = useTranslation();

  const [step, setStep] = useState(1);
  const handleStepChange = (newStep: number) => {
    setStep(newStep);
  };

  const handleShowModal = (show: boolean) => {
    setShowModal(show);
  };

  const [avatarMale, setAvatarMale] = useState([]);
  const [avatarFemale, setAvatarFemale] = useState([]);
  const [matchOTP, setMatchOTP] = useState(true);
  const [pickingDate, setPickingDate] = useState(false);
  const [tooManyRequestOTP, setTooManyRequestOTP] = useState(false);
  const [serverErrorOTP, setServerErrorOTP] = useState(false);

  const [errorMessagePhone, setErrorMessagePhone] = useState('');
  const [errorMessageEmail, setErrorMessageEmail] = useState('');
  const [errorMessageName, setErrorMessageName] = useState('');
  const [errorMessageSeedsTag, setErrorMessageSeedsTag] = useState('');
  const [errorMessageRefCode, setErrorMessageRefCode] = useState('');
  const [errorMessagePassword, setErrorMessagePassword] = useState('');
  const [errorMessageConfirmPassword, setErrorMessageConfirmPassword] =
    useState('');

  const [date, setDate] = useState(new Date());
  const [openDatePicker, setOpenDatePicker] = useState(false);

  const [avatarType, setAvatarType] = useState('Male');
  const [selectAvatar, setSelectAvatar] = useState(0);
  const [selectAvatarImage, setSelectAvatarImage] = useState(avatarMale[1]);

  const [input, setInput] = useState<IInput>({
    countryCode: '+62',
    phoneNumber: '',
    email: props.route.params?.email || '',
    birthday: date,
    name: props.route.params?.name || '',
    seedsTag: '',
    referralCode: '',
    forgotPasswordVia: 'phone', // phone | email
    sendOtpVia: 'whatsapp', // whatsapp | sms
    otp: '',
    newPassword: '',
    confirmPassword: '',
    newPasswordHidden: true,
    confirmPasswordHidden: true,
    avatar: '',
  });
  const [countdownResendOtp, setCountdownResendOtp] = useState(60);
  const [otpExpireTime, setOtpExpireTime] = useState(moment());

  const getAvatarDataMale = async () => {
    const getData: any = await _getAvatarListMale();
    setAvatarMale(getData);
  };

  const getAvatarDataFemale = async () => {
    const getData: any = await _getAvatarListFemale();
    setAvatarFemale(getData);
  };

  const onRequestOtp = async (via: 'sms' | 'whatsapp') => {
    if (input.phoneNumber.charAt(0) === '0') {
      input.phoneNumber = input.phoneNumber.substring(1); // remove the first character ('0')
    }
    setOtpExpireTime(moment().add(60, 'seconds'));
    setCountdownResendOtp(otpExpireTime.diff(moment(), 'seconds'));
    await _requestOtp(input.countryCode + input.phoneNumber, via);
  };

  const renderItem = ({item, index}: {item: any; index: number}) => {
    const isSelected = index === selectAvatar;

    return (
      <Pressable
        onPress={() => {
          setSelectAvatar(index),
            setSelectAvatarImage(item),
            setInput(prev => ({...prev, avatar: item}));
        }}
        style={{
          height: 80,
          width: 80,
          borderRadius: 74,
          // marginLeft: 'auto',
          // marginRight: 'auto',
          borderWidth: 2,
          borderColor: isSelected ? Colors.primary[600] : 'transparent',
          marginTop: 15,
          marginRight: index == 4 || index == 8 || index == 12 ? 6 : 6,
          marginLeft: index == 1 || index == 5 || index == 9 ? 6 : 6,
        }}>
        <FastImage
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 74,
            backgroundColor: Colors.primary[100],
          }}
          source={{
            uri: item,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
      </Pressable>
    );
  };

  const onResendOtp = () => {
    onRequestOtp(input.sendOtpVia);
    setOtpExpireTime(moment().add(60, 'seconds'));
    setCountdownResendOtp(otpExpireTime.diff(moment(), 'seconds'));
  };

  const onPressContinue = async () => {
    switch (step) {
      case 1:
        break;
      case 2:
        onRequestOtp(input.sendOtpVia);
        setOtpExpireTime(moment().add(60, 'seconds'));
        setCountdownResendOtp(otpExpireTime.diff(moment(), 'seconds'));
        break;
      case 3:
        break;
      case 4:
        break;
    }
    setStep(prev => (prev < 4 ? prev + 1 : 4));
  };

  const [showModal, setShowModal] = useState(false);

  async function registerFacebookHandler() {
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

      if (token && currentProfile) {
        setInput(prev => ({
          ...prev,
          email: currentProfile?.email || currentProfile?.firstName || '',
        }));
        // setInput(prev => ({...prev, email: userInfo.user.email}));

        console.log(currentProfile);
      }
    } catch (error) {
      console.log('error fb', error);
    }
  }

  async function registerGoogleHandler() {
    try {
      console.log('google login');
      const userInfo = await GoogleSignin.signIn();
      console.log('userinfo', userInfo);
      setInput(prev => ({...prev, email: userInfo.user.email}));
      // navigate('OnboardingPage');
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

  async function registerAppleHandler() {
    try {
      console.log('apple login');
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      });
      console.log('apple', appleAuthRequestResponse);
      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user,
      );
      // use credentialState response to ensure the user is authenticated
      if (credentialState === appleAuth.State.AUTHORIZED) {
        // user is authenticated
        console.log('credential apple', credentialState);
      }
    } catch (error) {
      console.log('error apple', error);
    }
  }

  useEffect(() => {
    const disableBackAndroid = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );

    return () => {
      disableBackAndroid.remove();
    };
  }, []);

  useEffect(() => {
    getAvatarDataMale();
    getAvatarDataFemale();
  }, []);

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
    <Container style={{backgroundColor: 'white'}}>
      <Content contentContainerStyle={[]} showsVerticalScrollIndicator={false}>
        {step != 6 ? (
          <HeaderTitle
            title={
              step === 5
                ? 'Avatar'
                : step === 6
                ? ''
                : t('onboardingScreen.register')
            }
            onPressBack={
              step === 1 ? navigateBack : () => setStep(prev => prev - 1)
            }
          />
        ) : null}

        {/* STEP 1 : INPUT EMAIL, PHONE, BIRTH */}
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
                source={Images.registerScreen.inputDataOne}
                resizeMode={FastImage.resizeMode.contain}
                style={[{width: width / 1.5, height: width / 1.5}]}
              />
              <Text variant="normal" size="sm" style={[Fonts.textCenter]}>
                {t('registerStepOne.onboard')}
              </Text>
            </View>
            <View
              style={[
                Common.backgroundLayout,
                Gutters.smallTMargin,
                Gutters.smallPadding,
              ]}>
              <PhoneInputField
                mandatoryMark
                label={t('registerStepOne.inputPhone')}
                value={input.phoneNumber}
                onChangeValue={text => {
                  {
                    setInput(prev => ({...prev, phoneNumber: text}));

                    if (text.length == 0) {
                      setErrorMessagePhone(
                        `${t('registerStepOne.phoneRequired')}`,
                      );
                    } else if (!/^[0-9]+$/.test(text)) {
                      setErrorMessagePhone(
                        `${t('registerStepOne.phoneNumbered')}`,
                      );
                    } else if (text.length > 12) {
                      setErrorMessagePhone(
                        `${t('registerStepOne.phoneTooLong')}`,
                      );
                    } else if (text.length < 10) {
                      setErrorMessagePhone(
                        `${t('registerStepOne.phoneTooShort')}`,
                      );
                    } else {
                      setErrorMessagePhone('');
                    }
                  }
                }}
                style={[Gutters.regularBMargin]}
                errorMessage={errorMessagePhone}
                errorMessageSize={'xs'}
                onBlur={() => {
                  if (input.phoneNumber) {
                    validatePhone(
                      input.countryCode +
                        (input.phoneNumber.charAt(0) === '0'
                          ? input.phoneNumber.substring(1)
                          : input.phoneNumber),
                    )
                      .then(response => {
                        // setErrorMessagePhone('');
                      })
                      .catch(error => {
                        setErrorMessagePhone(
                          `${t('registerStepOne.phoneDuplicated')}`,
                        );
                      });
                  }
                }}
                countryCodeValue={input.countryCode}
                onChangeCountryCode={v =>
                  setInput(prev => ({...prev, countryCode: v}))
                }
              />

              <InputField
                mandatoryMark
                label={t('registerStepOne.inputEmail')}
                placeholder={t('registerStepOne.placeholderEmail')}
                value={input.email}
                onChangeValue={text => {
                  setInput(prev => ({...prev, email: text}));

                  if (text.length == 0) {
                    setErrorMessageEmail(
                      `${t('registerStepOne.emailRequired')}`,
                    );
                  } else if (!text.includes('@') || !text.includes('.')) {
                    setErrorMessageEmail(`${t('registerStepOne.emailFormat')}`);
                  } else if (text[0] === '@') {
                    setErrorMessageEmail(`${t('registerStepOne.emailValid')}`);
                  } else {
                    setErrorMessageEmail('');
                  }
                }}
                style={[Gutters.regularBMargin]}
                errorMessage={errorMessageEmail}
                errorMessageSize={'xs'}
                onBlur={() => {
                  if (input.email) {
                    validateEmail(input.email)
                      .then(response => {
                        // setErrorMessageEmail('');
                      })
                      .catch(error => {
                        setErrorMessageEmail(
                          `${t('registerStepOne.emailDuplicated')}`,
                        );
                      });
                  }
                }}
              />

              <InputField
                mandatoryMark
                rightIcon="calendar"
                label={t('registerStepOne.inputDate')}
                placeholder={'DD / MM / YYYY'}
                value={
                  pickingDate
                    ? moment(input.birthday).format('DD / MM / YYYY')
                    : ''
                }
                onChangeValue={text => {
                  setOpenDatePicker(true);
                  setPickingDate(true);
                }}
                onPressRightIcon={() => {
                  setOpenDatePicker(true);
                  setPickingDate(true);
                }}
                onFocus={() => {
                  setOpenDatePicker(true);
                  setPickingDate(true);
                }}
                style={[Gutters.regularBMargin]}
              />

              <View
                style={[
                  Layout.rowHCenter,
                  Gutters.smallTMargin,
                  {marginTop: '2%'},
                ]}>
                <Button
                  title={t('loginScreen.continue')}
                  titleStyle={{color: Colors.white}}
                  style={[Gutters.smallVPadding]}
                  onPress={() => setStep(2)}
                  disabled={
                    errorMessageEmail ||
                    errorMessagePhone ||
                    !input.email ||
                    !input.phoneNumber
                      ? true
                      : false
                  }
                />
              </View>
              <View style={[Layout.rowHCenter, Gutters.smallTMargin]}></View>

              <View style={[Layout.rowHCenter, Gutters.smallTMargin]}>
                <View
                  style={[
                    Layout.fill,
                    {borderBottomWidth: 1, borderColor: Colors.neutral[300]},
                  ]}
                />
                <Text
                  style={[Gutters.smallHMargin]}
                  color={Colors.neutral[300]}>
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
                label={t('registerStepOne.registerWith', {oauth: 'Google'})}
                Logo={() => (
                  <FastImage
                    source={Images.loginScreen.google}
                    resizeMode={FastImage.resizeMode.contain}
                    style={[{width: 20, height: 20}]}
                  />
                )}
                onPress={registerGoogleHandler}
              />
              {Platform.OS === 'ios' ? (
                <ButtonWithLogo
                  label={t('registerStepOne.registerWith', {oauth: 'Apple'})}
                  Logo={() => (
                    <FastImage
                      source={Images.loginScreen.apple}
                      resizeMode={FastImage.resizeMode.contain}
                      style={[{width: 20, height: 20}]}
                    />
                  )}
                  style={[Gutters.smallTMargin]}
                  onPress={registerAppleHandler}
                />
              ) : null}
              <ButtonWithLogo
                label={t('registerStepOne.registerWith', {oauth: 'Facebook'})}
                Logo={() => (
                  <FastImage
                    source={Images.loginScreen.facebook}
                    resizeMode={FastImage.resizeMode.contain}
                    style={[{width: 20, height: 20}]}
                  />
                )}
                style={[Gutters.smallTMargin]}
                onPress={registerFacebookHandler}
              />
            </View>
          </>
        ) : null}

        {/* STEP 2 : INPUT NAME, TAG, REF CODE */}
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
                source={Images.registerScreen.inputDataTwo}
                resizeMode={FastImage.resizeMode.contain}
                style={[{width: width / 1.5, height: width / 1.5}]}
              />
              <Text
                variant="normal"
                size="sm"
                style={[Fonts.textCenter, {marginTop: '3%'}]}>
                {t('registerStepTwo.onboard')}
              </Text>
            </View>
            <View
              style={[
                Common.backgroundLayout,
                Gutters.smallTMargin,
                Gutters.smallPadding,
              ]}>
              <InputField
                mandatoryMark
                label={t('registerStepTwo.inputName')}
                placeholder={t('registerStepTwo.placeholderName')}
                value={input.name}
                onChangeValue={text => {
                  setInput(prev => ({...prev, name: text}));

                  if (text.length == 0) {
                    setErrorMessageName(`${t('registerStepTwo.nameRequired')}`);
                  } else if (!/^[A-Za-z\s]+$/.test(text)) {
                    setErrorMessageName(`${t('registerStepTwo.nameError')}`);
                  } else if (text.length < 3) {
                    setErrorMessageName(`${t('registerStepTwo.nameTooShort')}`);
                  } else {
                    setErrorMessageName('');
                  }
                }}
                style={[Gutters.regularBMargin]}
                errorMessage={errorMessageName}
                errorMessageSize={'xs'}
              />

              <InputField
                mandatoryMark
                label={t('registerStepTwo.inputTag')}
                placeholder={t('registerStepTwo.placeholderTag')}
                value={input.seedsTag}
                onChangeValue={text => {
                  setInput(prev => ({...prev, seedsTag: text}));

                  if (text.length === 0) {
                    setErrorMessageSeedsTag(
                      `${t('registerStepTwo.tagRequired')}`,
                    );
                  } else if (text.includes('@')) {
                    setErrorMessageSeedsTag(`${t('registerStepTwo.tagError')}`);
                  } else if (text.includes(' ')) {
                    setErrorMessageSeedsTag(`${t('registerStepTwo.tagSpace')}`);
                  } else if (text.length < 4) {
                    setErrorMessageSeedsTag(
                      `${t('registerStepTwo.tagTooShort')}`,
                    );
                  } else {
                    setErrorMessageSeedsTag('');
                  }
                }}
                style={[Gutters.regularBMargin]}
                errorMessage={errorMessageSeedsTag}
                errorMessageSize={'xs'}
                onBlur={() => {
                  if (input.seedsTag) {
                    validateSeedsTag(input.seedsTag)
                      .then(response => {
                        // setErrorMessageSeedsTag('');
                      })
                      .catch(error => {
                        setErrorMessageSeedsTag(
                          `${t('registerStepTwo.tagDuplicated')}`,
                        );
                      });
                  }
                }}
              />

              <InputField
                label={t('registerStepTwo.inputReff')}
                placeholder={t('registerStepTwo.placeholderReff')}
                value={input.referralCode}
                onChangeValue={text => {
                  setInput(prev => ({...prev, referralCode: text}));

                  if (text.includes(' ')) {
                    setErrorMessageRefCode(`${t('registerStepTwo.refError')}`);
                  } else {
                    setErrorMessageRefCode('');
                  }
                }}
                style={[Gutters.regularBMargin]}
                errorMessage={errorMessageRefCode}
                errorMessageSize={'xs'}
                onBlur={() => {
                  if (input.referralCode) {
                    validateRefCode(input.referralCode)
                      .then(response => {
                        // if (response !== 204) {
                        //   setErrorMessageRefCode(
                        //     `${t('registerStepTwo.refNotExist')}`,
                        //   );
                        // } else {
                        //   setErrorMessageRefCode('');
                        // }
                      })
                      .catch(error => {
                        setErrorMessageRefCode(
                          `${t('registerStepTwo.refNotExist')}`,
                        );
                        console.log(error);
                      });
                  }
                }}
              />

              <View
                style={[
                  Layout.rowHCenter,
                  Gutters.smallTMargin,
                  {marginTop: '10%'},
                ]}>
                <Button
                  title={t('loginScreen.continue')}
                  titleStyle={{color: Colors.white}}
                  style={[Gutters.smallVPadding]}
                  onPress={onPressContinue}
                  disabled={
                    errorMessageName ||
                    errorMessageSeedsTag ||
                    errorMessageRefCode ||
                    !input.seedsTag ||
                    !input.name
                      ? true
                      : false
                  }
                />
              </View>
              <View
                style={[
                  Layout.rowHCenter,
                  Gutters.smallTMargin,
                  {marginTop: '20%'},
                ]}></View>
            </View>
          </>
        ) : null}

        {/* STEP 3 : VERIFY OTP */}
        {step === 3 ? (
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
                    : Images.registerScreen.otpSMS
                }
                resizeMode={FastImage.resizeMode.contain}
                style={[{width: width / 2, height: width / 2}]}
              />
              <Text
                variant="light"
                size="sm"
                style={[Fonts.textCenter, Gutters.regularTMargin]}>
                {input.sendOtpVia === 'whatsapp'
                  ? t('registerStepThree.onboardWhatsapp')
                  : t('registerStepThree.onboardSMS')}
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
                {t('registerStepThree.inputOTP')}
              </Text>

              {matchOTP === false ? (
                <Text
                  variant="semibold"
                  style={[Fonts.textCenter, {color: Colors.red[400]}]}>
                  Invalid OTP
                </Text>
              ) : null}

              {tooManyRequestOTP === true ? (
                <Text
                  variant="semibold"
                  style={[Fonts.textCenter, {color: Colors.red[400]}]}>
                  Too Many Request, please try again later
                </Text>
              ) : null}

              {serverErrorOTP === true ? (
                <Text
                  variant="semibold"
                  style={[Fonts.textCenter, {color: Colors.red[400]}]}>
                  Server error, please try again with another way
                </Text>
              ) : null}

              <OTPInputField
                value={input.otp}
                onChangeValue={text => {
                  setMatchOTP(true);
                  setTooManyRequestOTP(false);
                  setServerErrorOTP(false);
                  setInput(prev => ({...prev, otp: text}));
                }}
                initialCountdown={countdownResendOtp}
                onResendOtp={onResendOtp}
              />
              <View style={Layout.fill} />
              <TouchableOpacity
                style={[Gutters.xlargeBMargin, {marginTop: 100}]}
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
                  {input.sendOtpVia === 'whatsapp'
                    ? t('registerStepThree.sendSMS')
                    : t('registerStepThree.sendWhatsapp')}
                </Text>
              </TouchableOpacity>
              <View
                style={[
                  Layout.rowHCenter,
                  Gutters.smallTMargin,
                  Gutters.xlargeBMargin,
                ]}>
                <Button
                  title={t('loginScreen.continue')}
                  titleStyle={{color: Colors.white}}
                  style={[Gutters.smallVPadding]}
                  onPress={() => {
                    verifyOTP(
                      input.countryCode + input.phoneNumber,
                      input.sendOtpVia,
                      input.otp,
                    )
                      .then(response => {
                        console.log(response, 'otpnya');

                        if (response === 204) {
                          console.log('otp bener');
                          setMatchOTP(true);

                          setStep(4);
                        } else {
                          // setMatchOTP(fal2se);
                          console.log('otp salah');
                        }
                      })
                      .catch(error => {
                        if (error === 404) {
                          setMatchOTP(false);
                        } else if (error === 429) {
                          setTooManyRequestOTP(true);
                        } else if (error === 403 || error === 500) {
                          setServerErrorOTP(true);
                        }
                      });
                  }}
                  disabled={input.otp ? false : true}
                />
              </View>
            </View>
          </>
        ) : null}

        {/* STEP 4 : CREATE PASSWORD */}
        {step === 4 ? (
          <View>
            <View
              style={[
                Common.backgroundLayout,
                Layout.colVCenter,
                Gutters.smallTMargin,
                Gutters.regularPadding,
              ]}>
              <Text variant="semibold" size="base">
                {t('registerStepFour.title')}
              </Text>
              <Text
                style={[Gutters.regularVMargin, Fonts.textCenter]}
                color={Colors.neutral[400]}>
                {t('registerStepFour.onboard')}
              </Text>
              <FastImage
                source={Images.registerScreen.inputNewPassword}
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
                label={t('registerStepFour.inputPass')}
                value={input.newPassword}
                onChangeValue={text => {
                  console.log(
                    text,
                    input.confirmPassword,
                    '<< log new password',
                  );

                  setInput(prev => ({...prev, newPassword: text}));
                  if (text.length == 0) {
                    setErrorMessagePassword(
                      `${t('registerStepFour.passRequired')}`,
                    );
                  } else if (text.length < 6) {
                    setErrorMessagePassword(
                      `${t('registerStepFour.passTooShort')}`,
                    );
                  } else if (
                    !/[0-9]/.test(text) ||
                    !/[a-z]/.test(text) ||
                    !/[A-Z]/.test(text) ||
                    !/[^0-9a-zA-Z]/.test(text)
                  ) {
                    setErrorMessagePassword(
                      `${t('registerStepFour.passNotValid')}`,
                    );
                  } else {
                    setErrorMessagePassword('');
                  }
                }}
                style={[Gutters.smallTMargin]}
                placeholder={t('registerStepFour.placeholderPass')}
                secureTextEntry={input.newPasswordHidden}
                rightIcon={input.newPasswordHidden ? 'eye' : 'eye-off'}
                onPressRightIcon={() =>
                  setInput(prev => ({
                    ...prev,
                    newPasswordHidden: !prev.newPasswordHidden,
                  }))
                }
                errorMessage={errorMessagePassword}
                errorMessageSize={'xs'}
              />

              <InputField
                label={t('registerStepFour.inputConfirmPass')}
                value={input.confirmPassword}
                onChangeValue={text => {
                  {
                    setInput(prev => ({...prev, confirmPassword: text}));

                    if (text.length == 0) {
                      setErrorMessageConfirmPassword(
                        `${t('registerStepFour.confPassRequired')}`,
                      );
                    } else if (text !== input.newPassword) {
                      setErrorMessageConfirmPassword(
                        `${t('registerStepFour.confPassMismatch')}`,
                      );
                    } else if (text.length < 6) {
                      setErrorMessageConfirmPassword(
                        `${t('registerStepFour.passTooShort')}`,
                      );
                    } else {
                      setErrorMessageConfirmPassword('');
                    }
                  }
                }}
                style={[Gutters.smallTMargin]}
                placeholder={t('registerStepFour.placeholderConfirmPass')}
                secureTextEntry={input.confirmPasswordHidden}
                rightIcon={input.confirmPasswordHidden ? 'eye' : 'eye-off'}
                onPressRightIcon={() =>
                  setInput(prev => ({
                    ...prev,
                    confirmPasswordHidden: !prev.confirmPasswordHidden,
                  }))
                }
                errorMessage={errorMessageConfirmPassword}
                errorMessageSize={'xs'}
              />

              <Text variant="semibold" style={[Gutters.smallTMargin]}>
                {t('registerStepFour.passReq')}
              </Text>
              <View style={[Layout.rowHCenter, Gutters.smallTMargin]}>
                <Icon name="dot" size={6} color={Colors.info[600]} />
                <Text variant="light" size="xs" style={[Gutters.tinyLMargin]}>
                  {t('registerStepFour.passReqOne')}
                </Text>
              </View>
              <View style={[Layout.rowHCenter, Gutters.tinyTMargin]}>
                <Icon name="dot" size={6} color={Colors.info[600]} />
                <Text variant="light" size="xs" style={[Gutters.tinyLMargin]}>
                  {t('registerStepFour.passReqTwo')}
                </Text>
              </View>
              <View style={[Layout.rowHCenter, Gutters.tinyTMargin]}>
                <Icon name="dot" size={6} color={Colors.info[600]} />
                <Text variant="light" size="xs" style={[Gutters.tinyLMargin]}>
                  {t('registerStepFour.passReqThree')}
                </Text>
              </View>
              <View style={[Layout.rowHCenter, Gutters.tinyTMargin]}>
                <Icon name="dot" size={6} color={Colors.info[600]} />
                <Text variant="light" size="xs" style={[Gutters.tinyLMargin]}>
                  {t('registerStepFour.passReqFour')}
                </Text>
              </View>

              <View style={[Layout.rowHCenter, Gutters.smallTMargin]}>
                <Button
                  title={t('registerScreen.nextButton')}
                  titleStyle={{color: Colors.white}}
                  style={[Gutters.smallVPadding]}
                  onPress={() => setShowModal(true)}
                  disabled={
                    errorMessageConfirmPassword ||
                    input.confirmPassword === '' ||
                    errorMessagePassword ||
                    input.newPassword === '' ||
                    input.newPassword !== input.confirmPassword
                      ? true
                      : false
                  }
                />
              </View>
            </View>
          </View>
        ) : null}

        {/* STEP 5 : CHOOSE AVATAR */}
        {step === 5 ? (
          <>
            <View
              style={[
                Common.backgroundLayout,
                Layout.colVCenter,
                Gutters.smallTMargin,
                Gutters.regularPadding,
              ]}>
              <Text variant="semibold" size="base">
                {t('registerStepFive.onboard')}
              </Text>
              <Text
                style={[Gutters.regularVMargin, Fonts.textCenter]}
                color={Colors.neutral[400]}>
                {t('registerStepFive.helper')}
              </Text>

              <View
                style={{
                  height: 148,
                  width: 148,
                  borderRadius: 74,
                }}>
                <FastImage
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 74,
                    backgroundColor: Colors.primary[100],
                  }}
                  source={{
                    uri: selectAvatarImage,
                  }}
                  resizeMode={FastImage.resizeMode.contain}
                />
              </View>
            </View>

            <View
              style={[
                Common.backgroundLayout,
                Gutters.smallTMargin,
                Gutters.smallPadding,
                Layout.fill,
              ]}>
              <View
                style={[
                  Layout.rowHCenter,
                  Gutters.smallTMargin,
                  Gutters.xlargeHMargin,
                ]}>
                <Button
                  title={t('registerStepFive.male')}
                  titleSize={10}
                  colors={avatarType === 'Male' ? '' : 'white'}
                  titleStyle={[
                    {
                      color:
                        avatarType === 'Male'
                          ? Colors.white
                          : Colors.neutral[400],
                      fontSize: 12,
                    },
                  ]}
                  style={[Gutters.tinyVPadding]}
                  onPress={() => {
                    setAvatarType('Male');
                    // if (selectAvatar !== 1) {
                    //   setSelectAvatar(1);
                    // }
                  }}
                />
                <Button
                  title={t('registerStepFive.female')}
                  titleSize={'xs2'}
                  colors={avatarType === 'Female' ? '' : 'white'}
                  titleStyle={{
                    color:
                      avatarType === 'Female'
                        ? Colors.white
                        : Colors.neutral[400],
                    fontSize: 12,
                  }}
                  onPress={() => {
                    setAvatarType('Female');
                    // if (selectAvatar !== 1) {
                    //   setSelectAvatar(1);
                    // }
                  }}
                  style={[Gutters.tinyVPadding]}
                />
              </View>

              <FlatList
                data={avatarType === 'Male' ? avatarMale : avatarFemale}
                renderItem={renderItem}
                // keyExtractor={item => item.id}
                // extraData={selectedId}
                horizontal={false}
                numColumns={4}
                contentContainerStyle={{
                  flexGrow: 1,
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  // alignItems: 'flex-start',
                }}
              />

              <View style={Layout.fill}></View>

              <View
                style={[
                  Layout.rowHCenter,
                  Gutters.smallTMargin,
                  {marginTop: 40},
                ]}>
                <Button
                  title={t('loginScreen.continue')}
                  titleStyle={{color: Colors.white}}
                  style={[Gutters.smallVPadding]}
                  onPress={() => {
                    createAccount(input)
                      .then(response => {
                        setStep(6);
                      })
                      .catch(error => {
                        setStep(5);
                        console.log(error, 'error di screen');
                      });
                  }}
                />
              </View>
            </View>
          </>
        ) : null}

        {/* STEP 6 : SUCCESS */}
        {step === 6 ? (
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
                source={Images.registerScreen.successRegister}
                resizeMode={FastImage.resizeMode.contain}
                style={[{width: width / 1.5, height: width / 1.5}]}
              />
              <Text variant="semibold" size="base">
                {t('registerStepSix.onboard')}
              </Text>
              <Text
                style={[Gutters.regularVMargin, Fonts.textCenter]}
                color={Colors.neutral[400]}>
                {t('registerStepSix.text')}
              </Text>
            </View>
            <View style={{height: width / 1.4}}></View>
            <View style={[Common.backgroundLayout, Gutters.smallPadding]}>
              <Button
                title={t('loginScreen.continue')}
                titleStyle={{color: Colors.white}}
                style={[Gutters.smallVPadding]}
                onPress={() => navigate('OnboardingScreen')}
              />
            </View>
          </>
        ) : null}
      </Content>

      <Modal
        variant="bottom"
        isVisible={showModal}
        hideModal={() => setShowModal(false)}>
        <BiometricsModalRegister
          biometricsPayload={{
            phoneNumber: input.phoneNumber,
            password: input.newPassword,
          }}
          showModal={showModal}
          step={step}
          onStepChange={handleStepChange}
          onModalChange={handleShowModal}
        />
      </Modal>

      {openDatePicker ? (
        <DatePicker
          modal
          mode="date"
          open={openDatePicker}
          date={date}
          maximumDate={date}
          onConfirm={date => {
            setOpenDatePicker(false);
            setInput(prev => ({...prev, birthday: date}));
            setDate(date);
          }}
          onCancel={() => {
            setOpenDatePicker(false);
          }}
          locale={t('registerStepOne.dateLocale')}
        />
      ) : null}
    </Container>
  );
};

const mapStateToProps = ({auth}: RootState) => ({
  //Reserved
});
const mapDispatchToProps = {
  _getAvatarListMale: getAvatarListMale,
  _getAvatarListFemale: getAvatarListFemale,
  _requestOtp: sendOTP,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;
export default connector(RegisterContainer);
