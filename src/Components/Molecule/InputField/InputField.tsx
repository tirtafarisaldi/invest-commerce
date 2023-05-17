import {
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputKeyPressEventData,
  TextStyle,
  TouchableOpacity,
  View,
  ViewProps,
} from 'react-native';
import React, {RefObject, useState} from 'react';
import {IconName, Icon, TFontSizes} from '@Atom/index';
import useTheme from '@Hooks/useTheme';
import Text from '@Atom/Text';

interface IInputField extends ViewProps {
  label?: string;
  value: string;
  onChangeValue: (text: string) => void;
  variant?: 'underlined' | 'bordered';
  disabled?: boolean;
  placeholder?: string;
  helperText?: string;
  leftIcon?: IconName;
  iconSize?: TFontSizes;
  rightIcon?: IconName;
  onPressLeftIcon?: () => void;
  onPressRightIcon?: () => void;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  labelStyle?: StyleProp<TextStyle>;
  errorMessage?: string;
  errorMessageSize?: TFontSizes;
  showErrorBorder?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  secureTextEntry?: boolean;
  maxLength?: number;
  inputStyle?: StyleProp<TextStyle>;
  inputRef?: RefObject<TextInput>;
  mandatoryMark?: boolean;
  onKeyPress?: (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => void;
}

const InputField = ({
  label,
  value,
  onChangeValue,
  variant = 'underlined',
  disabled = false,
  placeholder = '',
  helperText = '',
  leftIcon,
  iconSize,
  rightIcon,
  onPressLeftIcon,
  onPressRightIcon,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  labelStyle,
  errorMessage,
  errorMessageSize,
  showErrorBorder,
  onFocus,
  onBlur,
  secureTextEntry = false,
  maxLength,
  inputStyle,
  inputRef,
  mandatoryMark = false,
  onKeyPress,
  ...props
}: IInputField) => {
  const {Colors, Layout, Gutters, Fonts, FontSize} = useTheme();
  const [isFocused, setIsFocused] = useState<boolean>(false);

  return (
    <View {...props}>
      {label ? (
        <Text variant="semibold" style={labelStyle}>
          {label}
          {mandatoryMark ? (
            <Text style={labelStyle} color={Colors.red[600]}>
              *
            </Text>
          ) : null}
        </Text>
      ) : null}
      <View
        style={[
          Layout.rowHCenter,
          Gutters.tinyPadding,
          Gutters.tinyBMargin,
          {
            borderBottomWidth: 1,
            marginTop: variant === 'bordered' ? 5 : 0,
            borderRightWidth: variant === 'bordered' ? 1 : 0,
            borderLeftWidth: variant === 'bordered' ? 1 : 0,
            borderTopWidth: variant === 'bordered' ? 1 : 0,
            borderRadius: variant === 'bordered' ? 12 : 0,
            borderColor:
              errorMessage || showErrorBorder
                ? Colors.danger[500]
                : isFocused
                ? Colors.primary[500]
                : Colors.neutral[300],
            backgroundColor: disabled ? Colors.neutral[200] : Colors.white,
          },
        ]}>
        {leftIcon ? (
          <TouchableOpacity
            disabled={!onPressLeftIcon}
            onPress={onPressLeftIcon}>
            <Icon
              name={leftIcon}
              size={iconSize}
              color={disabled ? Colors.neutral[200] : Colors.neutral[500]}
            />
          </TouchableOpacity>
        ) : null}
        <TextInput
          value={value}
          onChangeText={text => onChangeValue?.(text)}
          style={[
            FontSize.sm,
            Fonts.normal,
            Layout.fill,
            {
              padding: 0,
              color: disabled ? Colors.neutral[400] : Colors.neutral[900],
              marginLeft: leftIcon ? 5 : 0,
              marginRight: rightIcon ? 5 : 0,
            },
            inputStyle,
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
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          secureTextEntry={secureTextEntry}
          maxLength={maxLength}
          ref={inputRef}
          onKeyPress={onKeyPress}
        />
        {rightIcon ? (
          <TouchableOpacity
            disabled={!onPressRightIcon}
            onPress={onPressRightIcon}>
            <Icon
              name={rightIcon}
              size={iconSize}
              color={disabled ? Colors.neutral[300] : Colors.neutral[400]}
            />
          </TouchableOpacity>
        ) : null}
      </View>
      {errorMessage ? (
        <Text color={Colors.danger[500]} size={errorMessageSize}>
          {errorMessage}
        </Text>
      ) : null}
      {helperText ? (
        <Text color={Colors.neutral[300]}>{helperText}</Text>
      ) : null}
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({});
