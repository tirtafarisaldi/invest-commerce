import {
  TextInput,
  TextInputKeyPressEventData,
  TouchableOpacity,
  View,
  ViewProps,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import useTheme from '@Hooks/useTheme';
import InputField from './InputField';
import Text from '@Atom/Text';
import {useTranslation} from 'react-i18next';
import {NativeSyntheticEvent} from 'react-native';

interface IOtpInput extends ViewProps {
  value: string;
  onChangeValue: (text: string) => void;
  initialCountdown: number;
  onResendOtp: () => void;
  errorMessage?: string;
  onChangeErrorMessage?: (text: string) => void;
}

const OTPInputField = ({
  value,
  onChangeValue,
  initialCountdown,
  onResendOtp,
  errorMessage,
  onChangeErrorMessage,
  ...props
}: IOtpInput) => {
  const {Common, Fonts, Gutters, Layout, Images, Colors} = useTheme();
  const {t} = useTranslation();
  const box0 = useRef<TextInput>(null);
  const box1 = useRef<TextInput>(null);
  const box2 = useRef<TextInput>(null);
  const box3 = useRef<TextInput>(null);

  const [otpValue, setOtpValue] = useState(
    value ? value.split('') : ['', '', '', ''],
  );
  const [lastKeyEventTimestamp, setLastKeyEventTimestamp] = useState(0);

  const onInputOtpValue = (otp: string, index: number) => {
    let newOtpValue = [...otpValue];
    if (otp === 'clear') {
      for (let i = index; i < otpValue.length; i++) {
        newOtpValue[i] = '';
      }
      onChangeValue('');
      onChangeErrorMessage?.('');
      setOtpValue(newOtpValue);
      return;
    }

    newOtpValue[index] = otp;
    setOtpValue(newOtpValue);

    switch (index) {
      case 0:
        box1.current?.focus();
        break;
      case 1:
        box2.current?.focus();
        break;
      case 2:
        box3.current?.focus();
        break;
      case 3:
        box3.current?.blur();
        onChangeValue(newOtpValue.join(''));
        break;
    }
  };

  const onKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number,
  ) => {
    if (Math.abs(lastKeyEventTimestamp - e.timeStamp) < 50) return;
    if (e.nativeEvent.key === 'Backspace') {
      switch (index) {
        case 1:
          box0.current?.focus();
          break;
        case 2:
          box1.current?.focus();
          break;
        case 3:
          box2.current?.focus();
          break;
      }
    }
    setLastKeyEventTimestamp(e.timeStamp);
  };

  useEffect(() => {
    box0.current?.focus();

    return () => {
      box0.current?.blur();
    };
  }, []);

  return (
    <View {...props}>
      <View style={[Layout.rowHCenter]}>
        <InputField
          inputRef={box0}
          value={otpValue[0]}
          onChangeValue={text => onInputOtpValue(text, 0)}
          onFocus={() => onInputOtpValue('clear', 0)}
          maxLength={1}
          style={[Layout.fill, Gutters.smallHMargin]}
          inputStyle={{
            textAlign: 'center',
            fontSize: 30,
            fontFamily: 'Poppins-SemiBold',
          }}
          keyboardType="number-pad"
          showErrorBorder={!!errorMessage}
        />
        <InputField
          inputRef={box1}
          value={otpValue[1]}
          onChangeValue={text => onInputOtpValue(text, 1)}
          onFocus={() => onInputOtpValue('clear', 1)}
          maxLength={1}
          style={[Layout.fill, Gutters.smallHMargin]}
          inputStyle={{
            textAlign: 'center',
            fontSize: 30,
            fontFamily: 'Poppins-SemiBold',
          }}
          keyboardType="number-pad"
          onKeyPress={e => onKeyPress(e, 1)}
          showErrorBorder={!!errorMessage}
        />
        <InputField
          inputRef={box2}
          value={otpValue[2]}
          onChangeValue={text => onInputOtpValue(text, 2)}
          onFocus={() => onInputOtpValue('clear', 2)}
          maxLength={1}
          style={[Layout.fill, Gutters.smallHMargin]}
          inputStyle={{
            textAlign: 'center',
            fontSize: 30,
            fontFamily: 'Poppins-SemiBold',
          }}
          keyboardType="number-pad"
          onKeyPress={e => onKeyPress(e, 2)}
          showErrorBorder={!!errorMessage}
        />
        <InputField
          inputRef={box3}
          value={otpValue[3]}
          onChangeValue={text => onInputOtpValue(text, 3)}
          onFocus={() => onInputOtpValue('clear', 3)}
          maxLength={1}
          style={[Layout.fill, Gutters.smallHMargin]}
          inputStyle={{
            textAlign: 'center',
            fontSize: 30,
            fontFamily: 'Poppins-SemiBold',
          }}
          keyboardType="number-pad"
          onKeyPress={e => onKeyPress(e, 3)}
          showErrorBorder={!!errorMessage}
        />
      </View>
      <Text
        style={[Fonts.textCenter, Gutters.smallTMargin]}
        color={Colors.red[500]}>
        {errorMessage}
      </Text>
      <View
        style={[
          Layout.rowHCenter,
          Layout.justifyContentBetween,
          Gutters.smallTMargin,
        ]}>
        <Text size="xs" color={Colors.neutral[400]}>
          {Number(initialCountdown) > 1
            ? `${initialCountdown} ${t('forgotPasswordScreen.seconds')}`
            : Number(initialCountdown) === 1
            ? `${initialCountdown} ${t('forgotPasswordScreen.second')}`
            : ''}
        </Text>
        <TouchableOpacity disabled={initialCountdown > 0} onPress={onResendOtp}>
          <Text
            style={{
              textDecorationLine: initialCountdown > 0 ? 'none' : 'underline',
            }}
            color={
              initialCountdown > 0 ? Colors.neutral[400] : Colors.primary[600]
            }>
            {t('forgotPasswordScreen.resendOTP')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OTPInputField;
