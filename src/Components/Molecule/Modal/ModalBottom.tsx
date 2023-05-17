import {StyleSheet, View} from 'react-native';
import React from 'react';
import Modal, {ModalProps} from 'react-native-modal';
import useTheme from '@Hooks/useTheme';
import {height} from '@Theme/Layout';

const ModalBottom = ({
  children,
  ...props
}: Partial<ModalProps> & Pick<ModalProps, 'children' | 'isVisible'>) => {
  const {Layout, Common, Gutters} = useTheme();

  return (
    <Modal style={[Layout.modalBottom]} swipeDirection={['down']} {...props}>
      <View
        style={[
          Common.backgroundLayout,
          Layout.regularRoundTopEnd,
          Gutters.regularPadding,
          {
            maxHeight: height - 100,
          },
        ]}>
        {children}
      </View>
    </Modal>
  );
};

export default ModalBottom;

const styles = StyleSheet.create({});
