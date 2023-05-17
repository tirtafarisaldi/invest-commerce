import {StyleSheet, View} from 'react-native';
import React from 'react';
import {ModalProps} from 'react-native-modal';
import ModalCenter from './ModalCenter';
import ModalBottom from './ModalBottom';
import ModalFull from './ModalFull';

export type RequiredModalProps = Partial<ModalProps> &
  Pick<ModalProps, 'children' | 'isVisible'>;

interface IModal extends RequiredModalProps {
  variant: 'bottom' | 'center' | 'full';
  hideModal: () => void;
  modalTitle?: string; // full modal has title
}

const Modal = ({
  variant = 'bottom',
  isVisible,
  hideModal,
  modalTitle = '',
  ...props
}: IModal) => {
  switch (variant) {
    case 'center':
      return (
        <ModalCenter
          isVisible={isVisible}
          onBackButtonPress={hideModal}
          onBackdropPress={hideModal}
          onSwipeComplete={hideModal}
          statusBarTranslucent={true}
          {...props}
        />
      );
    case 'full':
      return (
        <ModalFull
          isVisible={isVisible}
          onBackButtonPress={hideModal}
          onBackdropPress={hideModal}
          onSwipeComplete={hideModal}
          statusBarTranslucent={false}
          title={modalTitle}
          hideModal={hideModal}
          {...props}
        />
      );
    case 'bottom':
    default:
      return (
        <ModalBottom
          onBackButtonPress={hideModal}
          onBackdropPress={hideModal}
          onSwipeComplete={hideModal}
          isVisible={isVisible}
          statusBarTranslucent={true}
          {...props}
        />
      );
  }
};

export default Modal;

const styles = StyleSheet.create({});
