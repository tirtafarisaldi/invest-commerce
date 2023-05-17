import {StyleSheet, View} from 'react-native';
import React from 'react';
import Modal, {ModalProps} from 'react-native-modal';
import useTheme from '@Hooks/useTheme';

const ModalCenter = ({
  children,
  ...props
}: Partial<ModalProps> & Pick<ModalProps, 'children' | 'isVisible'>) => {
  const {Layout, Common, Gutters} = useTheme();
  return (
    <Modal style={{margin: 0}} swipeDirection={['down', 'left']} {...props}>
      <View
        style={[
          Common.backgroundLayout,
          Gutters.largeMargin,
          Gutters.regularPadding,
          Layout.smallRound,
        ]}>
        {children}
      </View>
    </Modal>
  );
};

export default ModalCenter;

const styles = StyleSheet.create({});
