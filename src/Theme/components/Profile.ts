import {CommonParams} from '@Theme/theme';
import {StyleSheet} from 'react-native';

export default function <C>({Colors, Layout}: CommonParams<C>) {
  return StyleSheet.create({
    container: (
      size: number,
      borderWidth: number,
      borderColor: string,
      borderRadius: number,
      backgroundColor: string,
    ) => ({
      width: size,
      height: size,
      borderWidth: borderWidth,
      borderColor: borderColor,
      borderRadius: borderRadius,
      backgroundColor: backgroundColor,
      ...Layout.center,
    }),
    status: (size: number, status: string) => ({
      width: 14,
      height: 14,
      backgroundColor:
        status == 'offline' ? Colors.statusOffline : Colors.statusOnline,
      position: 'absolute',
      bottom: 0,
      left: size - 16,
      borderRadius: 14 / 2,
      borderWidth: 2.5,
      borderColor: Colors.statusBorder,
    }),
    icon: (size: number) => ({
      position: 'absolute',
      top: 0,
      left: size - 18,
      backgroundColor: Colors.container,
      borderRadius: 7,
    }),
  });
}
