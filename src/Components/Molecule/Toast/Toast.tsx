import {StyleSheet, TouchableOpacity, View, ViewStyle} from 'react-native';
import React from 'react';
import {ToastProps} from 'react-native-toast-notifications/lib/typescript/toast';
import {Icon, IconName, Text} from '@Atom/index';
import {width} from '@Theme/Layout';
import useTheme from '@Hooks/useTheme';
import {useToast} from 'react-native-toast-notifications';

const Toast = ({message, data, type, ...props}: ToastProps) => {
  const {Colors, Common, Fonts, Gutters, Layout, Images} = useTheme();
  const toast = useToast();

  const getToastStyle = () => {
    switch (type) {
      case 'success':
        return styles(data).success;
      case 'error':
        return styles(data).error;
      case 'warning':
        return styles(data).warning;
      case 'info':
      default:
        return styles(data).info;
    }
  };

  const getIconName = (): IconName => {
    switch (type) {
      case 'success':
        return 'check-circle-filled';
      case 'error':
        return 'x-circle-filled';
      case 'warning':
        return 'warning-triangle-filled';
      case 'info':
      default:
        return 'info-circle-filled';
    }
  };

  return (
    <View
      style={[
        Gutters.smallPadding,
        Gutters.tinyBMargin,
        Layout.smallRound,
        Layout.row,
        Layout.alignItemsStart,
        getToastStyle(),
        {borderWidth: 1, width: width - 30},
      ]}>
      <View
        style={[
          {
            backgroundColor: getToastStyle()?.borderColor,
            padding: 3,
            borderRadius: 5,
          },
        ]}>
        <Icon name={getIconName()} color={Colors.white} />
      </View>
      <View style={[Layout.fill, Gutters.smallHMargin]}>
        <Text variant="semibold" size="base">
          {message}
        </Text>
        {data?.description ? (
          <Text color={Colors.neutral[400]} size="xs">
            {data?.description}
          </Text>
        ) : null}
      </View>
      <TouchableOpacity onPress={() => props.onPress?.(props.id)}>
        <Icon name="x" size="xl" color={getToastStyle().borderColor} />
      </TouchableOpacity>
    </View>
  );
};

export default Toast;

const styles = (data: any) =>
  StyleSheet.create({
    info: {
      backgroundColor: '#EBF3FF',
      borderColor: '#006FFF',
    },
    success: {
      backgroundColor: '#EFFBEF',
      borderColor: '#2B9429',
    },
    error: {
      backgroundColor: '#FEEDEC',
      borderColor: '#F11C0E',
    },
    warning: {
      backgroundColor: '#FEF5EC',
      borderColor: '#ED8812',
    },
  });
