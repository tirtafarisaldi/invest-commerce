import {View, ViewProps} from 'react-native';
import React, {useEffect} from 'react';
import Text from '@Atom/Text';
import useTheme from '@Hooks/useTheme';

import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';
import Icon from '@Atom/Icon';
import BiometricsButton from './BiometricsButton';
import useBiometrics from '@Hooks/useBiometrics';
import {IBiometricsState} from 'src/Redux/Reducers/biometrics';

const rnBiometrics = new ReactNativeBiometrics({allowDeviceCredentials: true});

interface IBiometricsModal extends ViewProps {
  type: 'register' | 'verify';
  title?: string;
  description?: string;
  helperText?: string;
  errorMessage?: string;
  hideModal?: () => void;
  biometricsPayload?: Partial<IBiometricsState>;
  credentialToGet?: 'pin' | 'password';
  onCompleteVerify?: (payload: Partial<IBiometricsState>) => void;
}

const BiometricsModal = ({
  type,
  title,
  description,
  helperText,
  errorMessage,
  children,
  hideModal,
  biometricsPayload = {},
  credentialToGet = 'pin',
  onCompleteVerify,
  ...props
}: IBiometricsModal) => {
  const {Colors, Gutters, Layout, Fonts} = useTheme();
  const {registerBiometrics, verifyBiometrics, deletePublicKey} =
    useBiometrics();

  const register = async () => {
    try {
      const registerValue = await registerBiometrics(biometricsPayload);
      console.log(registerValue);
    } catch (error) {
      console.log('error register biometrics', error);
      // TODO : handle error
    }
    hideModal?.();
  };

  const verify = async () => {
    try {
      const verifyValue = await verifyBiometrics(credentialToGet);
      console.log('verify biometry', verifyValue);
      onCompleteVerify?.(verifyValue);
    } catch (error) {
      console.log('error verify biometrics', error);
      // TODO : handle error
    }
    hideModal?.();
  };

  useEffect(() => {
    if (type === 'register') {
      register();
    } else if (type === 'verify') {
      verify();
    }
    // deletePublicKey();
  }, []);

  return (
    <View style={[Layout.colVCenter]} {...props}>
      {title ? (
        <Text style={[Fonts.textCenter]} variant="semibold" size="base">
          {title}
        </Text>
      ) : null}
      {description ? (
        <Text style={[Gutters.smallVMargin, Fonts.textCenter]}>
          {description}
        </Text>
      ) : null}
      <BiometricsButton
        iconSize={60}
        noBorder
        iconColor={Colors.primary[600]}
      />
      {helperText ? (
        <Text
          color={Colors.neutral[400]}
          size="xs"
          style={[Gutters.smallVMargin]}>
          {helperText}
        </Text>
      ) : null}
      {errorMessage ? (
        <Text color={Colors.red[600]} size="sm" style={[Gutters.smallBMargin]}>
          {errorMessage}
        </Text>
      ) : null}
      {children}
    </View>
  );
};

export default BiometricsModal;
