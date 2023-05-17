import {
  FlatList,
  Keyboard,
  StyleProp,
  StyleSheet,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
  ViewProps,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {Icon, TFontSizes} from '@Atom/index';
import useTheme from '@Hooks/useTheme';
import Text from '@Atom/Text';
import Modal from '@Molecule/Modal';
import worldDialCodeMaster from '@Assets/DialCode/worldDialCode.json';
import {useTranslation} from 'react-i18next';
import InputField from './InputField';
import useKeyboardPadding from '@Hooks/useKeyboardPadding';
import {standardizePhoneNumber} from '@Utils/standardizePhoneNumber';

interface IInputField extends ViewProps {
  label: string;
  value: string;
  onChangeValue: (text: string) => void;
  disabled?: boolean;
  placeholder?: string;
  helperText?: string;
  labelStyle?: StyleProp<TextStyle>;
  errorMessage?: string;
  errorMessageSize?: TFontSizes;
  onFocus?: () => void;
  onBlur?: () => void;
  mandatoryMark?: boolean;
  countryCodeValue?: string;
  onChangeCountryCode?: (text: string) => void;
}

const PhoneInputField = ({
  label,
  value,
  onChangeValue,
  disabled = false,
  placeholder = '',
  helperText = '',
  labelStyle,
  errorMessage,
  errorMessageSize = 'xs',
  onFocus,
  onBlur,
  mandatoryMark = false,
  countryCodeValue,
  onChangeCountryCode,
  ...props
}: IInputField) => {
  const {Colors, Layout, Gutters, Fonts, FontSize} = useTheme();
  const {t} = useTranslation();
  const {keyboardPadding} = useKeyboardPadding(14);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const [modal, setModal] = useState({
    countryCode: false,
  });
  const [worldDialCode, setWorldDialCode] = useState(worldDialCodeMaster);
  const [selectedCountryCode, setSelectedCountryCode] = useState(
    worldDialCodeMaster.find(o => o.dial_code === countryCodeValue) ||
      worldDialCodeMaster[101],
  );
  const [searchInput, setSearchInput] = useState('');

  const splitNumber = (num: string): string =>
    num.split(/(?=(?:\d{4})+$)/).join(' ');

  useEffect(() => {
    if (!searchInput) setWorldDialCode(worldDialCodeMaster);

    setWorldDialCode(
      worldDialCodeMaster.filter(code =>
        code.name.toLowerCase().includes(searchInput.toLowerCase()),
      ),
    );
  }, [searchInput]);

  useEffect(() => {
    setSearchInput('');
  }, [modal.countryCode]);

  return (
    <View {...props}>
      <Text variant="semibold" style={labelStyle}>
        {label}
        {mandatoryMark ? (
          <Text style={labelStyle} color={Colors.red[600]}>
            *
          </Text>
        ) : null}
      </Text>
      <View
        style={[
          Layout.rowHCenter,
          Gutters.smallPadding,
          Gutters.tinyBMargin,
          {
            borderBottomWidth: 1,
            borderColor: errorMessage
              ? Colors.danger[500]
              : isFocused
              ? Colors.primary[500]
              : Colors.neutral[300],
            backgroundColor: disabled ? Colors.neutral[200] : Colors.white,
          },
        ]}>
        <TouchableOpacity
          style={[Layout.rowHCenter, Gutters.smallRMargin]}
          onPress={() => setModal(prev => ({...prev, countryCode: true}))}>
          <Text>{selectedCountryCode?.flag}</Text>
          <Text style={[Gutters.tinyHMargin]}>
            {selectedCountryCode?.dial_code}
          </Text>
          <Icon name="chevron-down" />
        </TouchableOpacity>
        <TextInput
          value={splitNumber(value)}
          onChangeText={text =>
            onChangeValue?.(
              standardizePhoneNumber(text, selectedCountryCode.dial_code),
            )
          }
          style={[
            Layout.fill,
            {
              padding: 0,
              fontSize: FontSize.base,
              color: disabled ? Colors.neutral[200] : Colors.neutral[400],
            },
          ]}
          placeholder={placeholder}
          placeholderTextColor={Colors.neutral[300]}
          editable={!disabled}
          onFocus={() => {
            onFocus?.();
            setIsFocused(true);
          }}
          onBlur={() => {
            onBlur?.();
            setIsFocused(false);
          }}
          keyboardType="number-pad"
        />
      </View>
      {errorMessage ? (
        <Text color={Colors.danger[500]} size={errorMessageSize}>
          {errorMessage}
        </Text>
      ) : null}
      {helperText ? (
        <Text color={Colors.neutral[300]}>{helperText}</Text>
      ) : null}
      <Modal
        variant="bottom"
        isVisible={modal.countryCode}
        hideModal={() => setModal(prev => ({...prev, countryCode: false}))}>
        <View style={[{paddingBottom: keyboardPadding}]}>
          <Text
            variant="semibold"
            style={[Fonts.textCenter, Gutters.smallBMargin]}>
            {t('globalComponent.selectCountry')}
          </Text>
          <InputField
            variant="bordered"
            value={searchInput}
            onChangeValue={text => setSearchInput(text)}
            leftIcon="search"
          />
          <FlatList
            data={worldDialCode}
            keyExtractor={item => item.code}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => {
                  setSelectedCountryCode(item);
                  onChangeCountryCode?.(item.dial_code);
                  setModal(prev => ({...prev, countryCode: false}));
                }}
                style={[
                  Layout.rowHCenter,
                  Gutters.tinyPadding,
                  Gutters.tinyVMargin,
                  Layout.smallRound,
                  {backgroundColor: Colors.neutral[200]},
                ]}>
                <Text>{item.flag}</Text>
                <Text style={[Layout.fill, Gutters.smallHMargin]}>
                  {item.name}
                </Text>
                <Text variant="semibold">{item.dial_code}</Text>
              </TouchableOpacity>
            )}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </Modal>
    </View>
  );
};

export default PhoneInputField;

const styles = StyleSheet.create({});
