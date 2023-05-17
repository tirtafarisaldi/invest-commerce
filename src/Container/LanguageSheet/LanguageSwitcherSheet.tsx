import React, {useCallback, useMemo, useRef, useState} from 'react';
import {View, Text, StyleSheet, Alert, TouchableOpacity} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import Common from '@Theme/Common';
import Gutters from '@Theme/Gutters';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@Hooks/index';
import Fonts from '@Theme/Fonts';
import {Button} from '@Atom/index';
import {Colors, FontSize} from '@Theme/Variables';
import RadioButtonContainer from '@Atom/Button/RadioButtonContainer';
import Images from '@Theme/Images';
import FastImage from 'react-native-fast-image';
import {height} from '@Theme/Layout';

const LanguageSwitcher = () => {
  const {t} = useTranslation();
  const {Common, Fonts, Images, Layout} = useTheme();
  const [chosenOption, setChosenOption] = useState('apple'); //will store our current user options
  const options = [
    {text: 'Bahasa Indonesia', value: 'id', icon: Images.langSwitch.id},
    {text: 'English', value: 'en', icon: Images.langSwitch.en},
  ];
  const handleSaveCurrentLanguage = {};
  const onRadioButtonPress = itemIdx => {
    console.log('Clicked', itemIdx);
  };
  return (
    <View style={Layout.fullWidth}>
      <Text style={styles.title}>{t('languageSwitcher.title')}</Text>
      <Text style={styles.text}>{t('languageSwitcher.choose')}</Text>
      <RadioButtonContainer values={options} onPress={onRadioButtonPress} />
      <View style={[{width: '90%', margin: 10, height: 50}]}>
        <Button
          onPress={handleSaveCurrentLanguage}
          titleStyle={[{color: Colors.white}]}
          title="Continue"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
    letterSpacing: 0.5,
    color: '#000',
  },
  text: {
    textAlign: 'center',
    fontSize: 14,
    marginBottom: 20,
    fontFamily: 'Poppins-Regular',
    color: '#000',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  appInfo: {
    flexDirection: 'row',
    marginLeft: '10%',
    alignItems: 'center',
    marginBottom: 20,
  },
  separator: {
    height: 1,
    backgroundColor: '#00000040',
    marginVertical: 10,
  },
  confirmButton: {
    backgroundColor: '#0080FB',
    height: 50,
    width: 50,
    borderRadius: 30,
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 15,
    alignItems: 'center',
  },
});

export default LanguageSwitcher;
