import {Pressable, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Text from '@Atom/Text';
import useTheme from '@Hooks/useTheme';
import {Button} from '@Atom/Button';
import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';
import Icon from '@Atom/Icon';
import {useTranslation} from 'react-i18next';
import {IBiometricsState} from 'src/Redux/Reducers/biometrics';
import {useDispatch, useSelector} from 'react-redux';
import {saveCredential} from '@Actions/biometrics';

const rnBiometrics = new ReactNativeBiometrics();
type Props = {
  step: number;
  showModal: boolean;
  onStepChange: (newStep: number) => void;
  onModalChange: (show: boolean) => void;
  biometricsPayload: any;
};

const BiometricsModalRegister = (props: Props) => {
  const dispatch = useDispatch();
  const {Colors, Gutters, Layout, Fonts} = useTheme();
  const {t} = useTranslation();
  const [activatingFinger, setActivatingFinger] = useState(false);
  const [fingerprintError, setFingerPrintError] = useState(false);
  const [biometricType, setBiometricType] = useState('');

  const registerBiometrics = (payload: Partial<IBiometricsState>) => {
    return new Promise((resolve, reject) => {
      rnBiometrics
        .createKeys()
        .then(res => {
          dispatch(saveCredential({...payload, publicKey: res.publicKey}));
          return res.publicKey;
        })
        .then(res => {
          resolve(res);
          handleShowModal(false);
          handleNextStep(5);
        })
        .catch(err => reject(err));
    });
  };

  const handleNextStep = (step: any) => {
    props.onStepChange(step);
  };

  const handleShowModal = (show: boolean) => {
    props.onModalChange(show);
  };

  const checkBiometrics = async () => {
    try {
      const {available, biometryType} = await rnBiometrics.isSensorAvailable();
      if (available && biometryType === BiometryTypes.TouchID) {
        console.log('TouchID is supported');
        setBiometricType('TouchID');
      } else if (available && biometryType === BiometryTypes.FaceID) {
        console.log('FaceID is supported');
        setBiometricType('FaceID');
      } else if (available && biometryType === BiometryTypes.Biometrics) {
        console.log('Biometrics is supported');
        setBiometricType('Biometrics');
      } else {
        throw 'Biometrics not supported';
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkBiometrics();
    if (activatingFinger) {
      const checkAndRegisterBiometrics = async () => {
        try {
          const {available, biometryType} =
            await rnBiometrics.isSensorAvailable();
          if (available && biometryType === BiometryTypes.TouchID) {
            console.log('TouchID is supported');
          } else if (available && biometryType === BiometryTypes.FaceID) {
            console.log('FaceID is supported');
          } else if (available && biometryType === BiometryTypes.Biometrics) {
            console.log('Biometrics is supported');
          } else {
            throw 'Biometrics not supported';
          }

          const {keysExist} = await rnBiometrics.biometricKeysExist();
          if (keysExist) {
            console.log('Keys exist', keysExist);
          } else {
            setFingerPrintError(true);
            console.log('Keys do not exist or were deleted');
          }

          await registerBiometrics(props.biometricsPayload);
          // rnBiometrics.createKeys();

          const {publicKey} = await rnBiometrics.createKeys();
          console.log(publicKey, 'public key');
          const {success, signature} = await rnBiometrics.createSignature({
            promptMessage: 'Seeds Biometric Register',
            payload:
              Math.round(new Date().getTime() / 1000).toString() + 'login',
          });

          if (success) {
            console.log(signature, 'signature');
          } else {
            setFingerPrintError(true);
            throw 'Failed to enroll ID';
          }

          // sendPublicKeyToServer(publicKey)
        } catch (error) {
          setFingerPrintError(true);
          console.log(error);
        }
      };
      checkAndRegisterBiometrics();
    } else {
      console.log('not aktiv');
    }

    return () => {};
  }, [activatingFinger]);

  return (
    <View style={[Layout.colVCenter]}>
      <Text style={[Fonts.textCenter]} variant="semibold" size="base">
        {t('biometricsModal.setupBiometrics')}
      </Text>
      <Text
        style={[Gutters.regularVMargin, Gutters.largeHMargin, Fonts.textCenter]}
        variant="normal"
        color={Colors.neutral[400]}>
        {biometricType === 'FaceID'
          ? t('biometricsModal.prosBiometricsFace')
          : t('biometricsModal.prosBiometricsFingerprint')}
      </Text>
      <Icon
        name={biometricType === 'FaceID' ? 'face-id' : 'fingerprint'}
        size={60}
        color={Colors.primary[600]}
      />
      <Text
        color={Colors.neutral[400]}
        size="xs"
        style={[Gutters.smallVMargin]}>
        {biometricType === 'FaceID'
          ? t('biometricsModal.howToBiometricsFace')
          : t('biometricsModal.howToBiometricsFingerprint')}
      </Text>

      {fingerprintError ? (
        <Text
          variant="normal"
          color={Colors.red[600]}
          size="xs"
          style={[Gutters.smallVMargin]}>
          Oops something went wrong. Please try again!
        </Text>
      ) : null}

      <View style={[Layout.rowHCenter, Gutters.smallTMargin]}>
        {!activatingFinger && !fingerprintError ? (
          <>
            <Button
              type="outline"
              title={t('biometricsModal.buttonSkip')}
              titleStyle={[{color: Colors.primary[600]}]}
              onPress={() => {
                handleNextStep(5);
                handleShowModal(false);
              }}
              style={[Gutters.smallVPadding]}
            />
            <Button
              title={t('biometricsModal.buttonActivated')}
              titleSize={'xs2'}
              titleStyle={{color: Colors.white}}
              onPress={() => {
                setActivatingFinger(true);
                // setTimeout(() => {
                //   setActivatingFinger(false);
                //   setFingerPrintError(true);
                // }, 3000);
              }}
              style={[Gutters.smallVPadding]}
            />
          </>
        ) : null}

        {activatingFinger ? (
          <Button
            title={t('biometricsModal.buttonCancel')}
            colors="white"
            titleStyle={{color: Colors.primary[600]}}
            onPress={() => {
              setActivatingFinger(false);
            }}
            style={[Gutters.smallVPadding]}
          />
        ) : null}

        {fingerprintError ? (
          <>
            <Button
              type="outline"
              title={t('biometricsModal.buttonCancel')}
              titleStyle={[{color: Colors.primary[600]}]}
              onPress={() => {
                setFingerPrintError(false);
                setActivatingFinger(false);
              }}
              style={[Gutters.smallVPadding]}
            />
            <Button
              title={t('biometricsModal.buttonTryAgain')}
              titleStyle={{color: Colors.white}}
              onPress={() => {
                setFingerPrintError(false), setActivatingFinger(true);
              }}
              style={[Gutters.smallVPadding]}
            />
          </>
        ) : null}
      </View>
    </View>
  );
};

export default BiometricsModalRegister;
