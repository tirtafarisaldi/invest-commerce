import {TextInput, TouchableOpacity, View} from 'react-native';
import React, {useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import useTheme from '@Hooks/useTheme';
import FastImage from 'react-native-fast-image';
import {width} from '@Theme/Layout';
import {Button} from '@Atom/Button';
import Text from '@Atom/Text';
import Icon from '@Atom/Icon';
import hexToRgba from '@Utils/hexToRgba';
import {navigate} from '@Navigators/utils';
import useKeyboardPadding from '@Hooks/useKeyboardPadding';

interface IDeleteAccountModal {
  hideModal: () => void;
}

const DeleteAccountModal = ({hideModal}: IDeleteAccountModal) => {
  const {Layout, Common, Colors, Fonts, Gutters, Images, FontSize} = useTheme();
  const {t} = useTranslation();
  const {keyboardPadding} = useKeyboardPadding();
  const tInputRef = useRef<TextInput>(null);

  const [step, setStep] = useState(1);
  const [input, setInput] = useState({
    reasonToDelete: 0,
    otherReason: '',
  });

  return (
    <View style={{paddingBottom: keyboardPadding}}>
      {step === 1 ? (
        <>
          <View style={[Layout.center]}>
            <FastImage
              source={Images.profile.deleteAccount}
              style={{width: width / 3, height: width / 3}}
              resizeMode={FastImage.resizeMode.contain}
            />
            <Text variant="semibold" size="base" style={[Fonts.textCenter]}>
              {t('editProfileScreen.areYouSure')}
            </Text>
            <Text
              color={Colors.neutral[400]}
              style={[Fonts.textCenter, Gutters.smallVMargin]}>
              {t('editProfileScreen.ifYes')}
            </Text>
          </View>
          <Button
            title={t('editProfileScreen.yes')}
            titleStyle={{color: Colors.white}}
            style={[{flex: 0, backgroundColor: Colors.red[600]}]}
            onPress={() => setStep(2)}
          />
          <Button
            title={t('editProfileScreen.no')}
            titleStyle={{color: Colors.secondary[600]}}
            style={[Common.backgroundLayout, {flex: 0}]}
            onPress={hideModal}
          />
        </>
      ) : null}
      {step === 2 ? (
        <>
          <Text variant="semibold" style={[Fonts.textCenter]}>
            {t('editProfileScreen.reasonToDelete')}
          </Text>
          <TouchableOpacity
            onPress={() => setInput(prev => ({...prev, reasonToDelete: 1}))}
            style={[
              Layout.rowHCenter,
              Layout.justifyContentBetween,
              Gutters.smallTMargin,
            ]}>
            <Text>I don't like the app</Text>
            <View
              style={[
                Layout.round,
                Layout.center,
                {
                  padding: FontSize['base'] / 3,
                  backgroundColor:
                    input.reasonToDelete === 1
                      ? hexToRgba(Colors.primary[600], 0.1)
                      : 'transparent',
                },
              ]}>
              <Icon
                name={input.reasonToDelete === 1 ? 'radio-on' : 'radio-off'}
                color={
                  input.reasonToDelete === 1
                    ? Colors.primary[600]
                    : Colors.neutral[300]
                }
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setInput(prev => ({...prev, reasonToDelete: 2}))}
            style={[
              Layout.rowHCenter,
              Layout.justifyContentBetween,
              Gutters.smallTMargin,
            ]}>
            <Text>There's too many bugs</Text>
            <View
              style={[
                Layout.round,
                Layout.center,
                {
                  padding: FontSize['base'] / 3,
                  backgroundColor:
                    input.reasonToDelete === 2
                      ? hexToRgba(Colors.primary[600], 0.1)
                      : 'transparent',
                },
              ]}>
              <Icon
                name={input.reasonToDelete === 2 ? 'radio-on' : 'radio-off'}
                color={
                  input.reasonToDelete === 2
                    ? Colors.primary[600]
                    : Colors.neutral[300]
                }
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setInput(prev => ({...prev, reasonToDelete: 3}))}
            style={[
              Layout.rowHCenter,
              Layout.justifyContentBetween,
              Gutters.smallTMargin,
            ]}>
            <Text>Other, specify</Text>
            <View
              style={[
                Layout.round,
                Layout.center,
                {
                  padding: FontSize['base'] / 3,
                  backgroundColor:
                    input.reasonToDelete === 3
                      ? hexToRgba(Colors.primary[600], 0.1)
                      : 'transparent',
                },
              ]}>
              <Icon
                name={input.reasonToDelete === 3 ? 'radio-on' : 'radio-off'}
                color={
                  input.reasonToDelete === 3
                    ? Colors.primary[600]
                    : Colors.neutral[300]
                }
              />
            </View>
          </TouchableOpacity>
          <Button
            title={t('editProfileScreen.continue')}
            disabled={!input.reasonToDelete}
            titleStyle={{color: Colors.white}}
            style={[Gutters.smallTMargin, {flex: 0}]}
            onPress={() => {
              if (input.reasonToDelete === 3) {
                setStep(3);
              } else {
                hideModal();
                navigate('EnterPinScreen', {
                  type: 'DeleteAccount',
                });
              }
            }}
          />
        </>
      ) : null}
      {step === 3 ? (
        <>
          <Text variant="semibold" style={[]}>
            {t('editProfileScreen.helpUs')}
          </Text>
          <TouchableOpacity
            onPress={tInputRef.current?.focus}
            style={[
              Layout.smallRound,
              Gutters.smallPadding,
              Gutters.smallTMargin,
              {
                height: 100,
                borderWidth: 1,
                borderColor: tInputRef.current?.isFocused
                  ? Colors.primary[600]
                  : Colors.neutral[300],
              },
            ]}>
            <TextInput
              autoFocus
              ref={tInputRef}
              value={input.otherReason}
              onChangeText={(text: string) =>
                setInput(prev => ({...prev, otherReason: text}))
              }
            />
          </TouchableOpacity>
          <Button
            title={t('editProfileScreen.continue')}
            disabled={!input.otherReason}
            titleStyle={{color: Colors.white}}
            style={[Gutters.smallTMargin, {flex: 0}]}
            onPress={() => {
              hideModal();
              navigate('EnterPinScreen', {
                type: 'DeleteAccount',
              });
            }}
          />
        </>
      ) : null}
    </View>
  );
};

export default DeleteAccountModal;
