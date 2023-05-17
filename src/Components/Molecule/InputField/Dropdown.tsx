import {
  KeyboardTypeOptions,
  StyleProp,
  StyleSheet,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
  ViewProps,
} from 'react-native';
import React, {RefObject, useRef, useState} from 'react';
import {IconName, Icon, TFontSizes} from '@Atom/index';
import useTheme from '@Hooks/useTheme';
import Text from '@Atom/Text';

interface IInputField extends ViewProps {
  label?: string;
  value?: string;
  variant?: 'underlined' | 'bordered' | 'labelOnly';
  disabled?: boolean;
  placeholder?: string;
  helperText?: string;
  leftIcon?: IconName;
  iconSize?: TFontSizes;
  rightIcon?: IconName;
  onPress?: () => void;
  labelStyle?: StyleProp<TextStyle>;
  errorMessage?: string;
  inputStyle?: StyleProp<TextStyle>;
  mandatoryMark?: boolean;
}

const Dropdown = ({
  label,
  value,
  variant = 'underlined',
  disabled = false,
  placeholder = '',
  helperText = '',
  leftIcon,
  iconSize,
  rightIcon,
  onPress,
  labelStyle,
  errorMessage,
  inputStyle,
  mandatoryMark = false,
  ...props
}: IInputField) => {
  const {Colors, Layout, Gutters, Fonts, FontSize} = useTheme();

  return (
    <View {...props}>
      {label && variant !== 'labelOnly' ? (
        <Text variant="semibold" style={labelStyle}>
          {label}
          {mandatoryMark ? (
            <Text style={labelStyle} color={Colors.red[600]}>
              *
            </Text>
          ) : null}
        </Text>
      ) : null}
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
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
            borderColor: errorMessage
              ? Colors.danger[500]
              : Colors.neutral[300],
            backgroundColor: disabled ? Colors.neutral[200] : Colors.white,
          },
        ]}>
        {leftIcon ? (
          <Icon
            name={leftIcon}
            size={iconSize}
            color={disabled ? Colors.neutral[200] : Colors.neutral[500]}
          />
        ) : null}
        {/* using disabled textinput to avoid difference with InputField component */}
        <View pointerEvents="none" style={[Layout.fill]}>
          {variant === 'labelOnly' ? (
            <View style={[Layout.rowHCenter]}>
              <TextInput
                value={label}
                style={[
                  Fonts.semibold,
                  {
                    fontSize: FontSize.sm,
                    padding: 0,
                    color: disabled ? Colors.neutral[400] : Colors.neutral[500],
                    marginLeft: leftIcon ? 5 : 0,
                    marginRight: rightIcon && !mandatoryMark ? 5 : 0,
                  },
                  labelStyle,
                ]}
              />
              {mandatoryMark ? (
                <Text
                  style={[{marginRight: 5}, labelStyle]}
                  color={Colors.red[600]}>
                  *
                </Text>
              ) : null}
            </View>
          ) : (
            <TextInput
              value={value}
              style={[
                FontSize.sm,
                Fonts.normal,
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
              editable={false}
            />
          )}
        </View>
        {rightIcon ? (
          <Icon
            name={rightIcon}
            size={iconSize}
            color={disabled ? Colors.neutral[300] : Colors.neutral[400]}
          />
        ) : null}
      </TouchableOpacity>
      {errorMessage ? (
        <Text color={Colors.danger[500]}>{errorMessage}</Text>
      ) : null}
      {helperText ? (
        <Text color={Colors.neutral[300]}>{helperText}</Text>
      ) : null}
    </View>
  );
};

export default Dropdown;

const styles = StyleSheet.create({});
