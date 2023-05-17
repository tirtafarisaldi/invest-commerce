import {StyleSheet, View} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import useTheme from '@Hooks/useTheme';
import {HeaderTitle, RequiredModalProps} from '..';

interface IModalFull extends RequiredModalProps {
  title?: string;
  hideModal: () => void;
}

const ModalFull = ({title, hideModal, children, ...props}: IModalFull) => {
  const {Layout, Common, Colors} = useTheme();
  return (
    <Modal style={{margin: 0}} {...props}>
      <View style={[Common.backgroundLayout, Layout.fill]}>
        <HeaderTitle
          title={title}
          onPressBack={hideModal}
          titleColor={Colors.neutral[500]}
        />
        {children}
      </View>
    </Modal>
  );
};

export default ModalFull;

const styles = StyleSheet.create({});
