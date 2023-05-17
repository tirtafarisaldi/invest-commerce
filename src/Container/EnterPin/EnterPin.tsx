import {TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Container, Content} from '@Organism/Basic';
import Text from '@Atom/Text';
import {StackScreenProps} from '@react-navigation/stack';
import {navigateBack, RootStackParamList} from '@Navigators/utils';
import useTheme from '@Hooks/useTheme';
import {useTranslation} from 'react-i18next';
import Icon from '@Atom/Icon';
import FastImage from 'react-native-fast-image';
import useBiometrics from '@Hooks/useBiometrics';
import {Numpad} from '@Molecule/Numpad';
import Modal from '@Molecule/Modal';
import {BiometricsButton} from '@Molecule/Biometrics';

type IEnterPinProps = StackScreenProps<RootStackParamList, 'EnterPinScreen'>;

const EnterPin = ({route}: IEnterPinProps) => {
  const {type} = route.params;
  const {Layout, Common, Colors, Fonts, Gutters, Images} = useTheme();
  const {t} = useTranslation();
  const {availableBiometry} = useBiometrics();

  const [pin, setPin] = useState('');
  const [error, setError] = useState(' ');
  const [modal, setModal] = useState({
    biometrics: false,
  });

  const onSubmit = async () => {
    try {
      switch (type) {
        case 'DeleteAccount':
          // TODO
          break;
      }
      throw 'Wrong PIN!';
    } catch (error: any) {
      // TODO: handle error, e.g:
      setPin('');
      setError(error.toString());
    }
  };

  useEffect(() => {
    if (availableBiometry !== 'none' && !modal.biometrics)
      setTimeout(() => {
        setModal({biometrics: true});
      }, 500);
  }, [availableBiometry]);

  useEffect(() => {
    if (pin.length < 6) return;

    onSubmit();
  }, [pin]);

  return (
    <Container>
      <View
        style={[
          Common.header.headerBrandContent,
          Common.backgroundLayout,
          Gutters.tinyHPadding,
        ]}>
        <TouchableOpacity onPress={navigateBack} style={{flex: 0.2}}>
          <Icon name="arrow-left" size="xl" />
        </TouchableOpacity>
        <FastImage
          source={Images.text_logo}
          style={[Common.header.headerLogo]}
          resizeMode={FastImage.resizeMode.contain}
        />
        <View style={[{flex: 0.2}]} />
      </View>
      <Content contentContainerStyle={[Layout.fill, Common.backgroundLayout]}>
        <View style={[Layout.fill, Layout.center]}>
          <Text variant="semibold" style={[Fonts.textCenter]} size="xl2">
            {t('enterPinScreen.enterYourPin')}
          </Text>
          <Text
            style={[Fonts.textCenter, Gutters.smallTMargin]}
            size="base"
            color={Colors.neutral[400]}>
            {t('enterPinScreen.enterCorrectly')}
          </Text>
        </View>
        <View
          style={[
            Layout.rowHCenter,
            Layout.justifyContentAround,
            Gutters.smallHMargin,
          ]}>
          {new Array(6).fill('').map((o, idx) => (
            <TouchableOpacity
              onPress={() => setPin(prev => prev.slice(0, idx))}
              key={idx}
              style={[
                Layout.round,
                {
                  width: 20,
                  height: 20,
                  borderWidth: 2,
                  borderColor:
                    error.trim() !== '' ? Colors.red[600] : Colors.neutral[300],
                  backgroundColor:
                    idx < pin.length ? Colors.primary[600] : Colors.white,
                },
              ]}
            />
          ))}
        </View>
        <Text
          color={Colors.red[600]}
          style={[
            Fonts.textCenter,
            Gutters.largeTMargin,
            Gutters.xlargeBMargin,
          ]}>
          {error}
        </Text>
        <Numpad
          value={pin}
          onChangeValue={val => setPin(val)}
          style={[{flex: 2}]}
        />
      </Content>
      <Modal
        variant="bottom"
        isVisible={modal.biometrics}
        hideModal={() => setModal(prev => ({...prev, biometrics: false}))}>
        <View>
          <Text variant="semibold" size="base">
            {t('enterPinScreen.inputPinWith', {
              biometric:
                availableBiometry === 'FaceID' ? 'Face ID' : 'fingerprint',
            })}
          </Text>
          <Text
            color={Colors.neutral[400]}
            style={[Gutters.tinyTMargin, Gutters.smallBMargin]}>
            {availableBiometry === 'FaceID'
              ? t('enterPinScreen.putYourFace')
              : t('enterPinScreen.placeYourFinger')}
          </Text>
          <View style={[Layout.center, Gutters.largeBMargin]}>
            <BiometricsButton
              noBorder
              iconSize={80}
              iconColor={Colors.primary[600]}
            />
          </View>
        </View>
      </Modal>
    </Container>
  );
};

export default EnterPin;
