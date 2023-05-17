import {Pressable, TextInput, TouchableOpacity, View} from 'react-native';
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
import i18n from 'src/Translations';

interface ISwitchLanguageModal {
  hideModal: () => void;
}

const SwitchLanguageModal = ({hideModal}: ISwitchLanguageModal) => {
  const {Layout, Common, Colors, Fonts, Gutters, Images, FontSize} = useTheme();
  const {t} = useTranslation();

  const {keyboardPadding} = useKeyboardPadding();

  const [language, setLanguage] = useState('ID');
  const [flag, setFlag] = useState('🇮🇩');
  const [value, setValue] = useState('id');

  const handleLanguageSelect = (code: any, flag: any) => {
    setLanguage(code);
    setFlag(flag);
  };

  const countrySelector = [
    {
      name: t('countrySelector.indonesia'),
      flag: '🇮🇩',
      code: 'ID',
      value: 'id',
      dial_code: '+62',
      color: 'blue',
    },
    {
      name: t('countrySelector.england'),
      flag: '🇬🇧',
      code: 'EN',
      value: 'en',
      dial_code: '+44',
      color: 'red',
    },
  ];

  return (
    <View style={{paddingBottom: keyboardPadding}}>
      <View style={[Layout.center]}>
        <Text variant="semibold" size={'base'} style={[Gutters.smallVMargin]}>
          {t('settingScreen.language')}
        </Text>
        <Text
          size={'sm'}
          style={[Gutters.smallBMargin]}
          color={Colors.neutral[400]}>
          {t('settingScreen.languageHelper')}
        </Text>

        {countrySelector.map(el => (
          <View
            key={el.code}
            style={{
              height: 50,
              width: '100%',
              // backgroundColor: 'red',
              borderRadius: 8,
              borderColor: Colors.neutral[200],
              borderWidth: 1,
              display: 'flex',
              flexDirection: 'row',
              marginBottom: 10,
            }}>
            <View
              style={{
                flex: 0.75,
                alignSelf: 'center',
                alignItems: 'center',
              }}>
              <Text size={'xl3'}>{el.flag}</Text>
            </View>
            <View
              style={{
                flex: 3.25,
                alignSelf: 'center',
              }}>
              <Text>{el.name}</Text>
            </View>
            <View
              style={{
                flex: 1,
                alignSelf: 'center',
                alignItems: 'center',
              }}>
              <Pressable
                onPress={() => {
                  setLanguage(el.code), setFlag(el.flag);
                  setValue(el.value);
                  i18n.changeLanguage(el.value);
                }}>
                {language === el.code ? (
                  <Icon
                    name={'radio-on'}
                    size={20}
                    color={Colors.primary[600]}
                  />
                ) : (
                  <Icon
                    name={'radio-off'}
                    size={20}
                    color={Colors.neutral[300]}
                  />
                )}
              </Pressable>
            </View>
          </View>
        ))}

        <Button
          title={t('editProfileScreen.continue')}
          onPress={() => hideModal}
          // disabled={!input.reasonToDelete}
          titleStyle={{color: Colors.white}}
          style={[
            // Gutters.smallTMargin,
            Gutters.largeBMargin,
            {flex: 0, width: '100%'},
          ]}
          // onPress={() => {
          //   if (input.reasonToDelete === 3) {
          //     setStep(3);
          //   } else {
          //     hideModal();
          //     navigate('EnterPinScreen', {
          //       type: 'DeleteAccount',
          //     });
          //   }
          // }}
        />
      </View>
    </View>
  );
};

export default SwitchLanguageModal;
