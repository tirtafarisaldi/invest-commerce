import {Button, Icon, Text} from '@Atom/index';
import {useTheme} from '@Hooks/index';
import {navigate, navigateBack} from '@Navigators/utils';
import {HeaderTitle} from '@Molecule/Header';
import {Container, Content} from '@Organism/Basic';
import {Colors} from '@Theme/Variables';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Platform,
  TouchableOpacity,
  View,
  ScrollView,
  Pressable,
} from 'react-native';
import {LegalScreenProps} from './index';
import FastImage from 'react-native-fast-image';
import {width} from '@Theme/Layout';
import {InputField, PhoneInputField, OTPInputField} from '@Molecule/InputField';
import Modal from '@Molecule/Modal';

type Props = LegalScreenProps;
interface LegalMenu {
  title: string;
  iconName: string;
  nextScreen: string;
}

const LegalContainer = () => {
  const {Common, Fonts, Gutters, Layout, Images} = useTheme();
  const {t} = useTranslation();

  const legalMenu: LegalMenu[] = [
    {
      iconName: 'file-text',
      title: t('legalScreen.tnc'),
      nextScreen: 'TermScreen',
    },
    {
      iconName: 'file',
      title: t('legalScreen.disclosure'),
      nextScreen: 'DisclosureScreen',
    },
    {
      iconName: 'award',
      title: t('legalScreen.privacyPolicy'),
      nextScreen: 'PrivacyScreen',
    },
    {
      iconName: 'chat-outline',
      title: t('legalScreen.socmedGuidelines'),
      nextScreen: 'SocialScreen',
    },
    {
      iconName: 'users',
      title: t('legalScreen.circleMembership'),
      nextScreen: 'CircleScreen',
    },
  ];

  return (
    <Container>
      <Content contentContainerStyle={[]} showsVerticalScrollIndicator={false}>
        <HeaderTitle title={t('legalScreen.legal')} />
        <View
          style={[
            Common.backgroundLayout,
            Layout.colVCenter,
            Gutters.smallTMargin,
            Gutters.regularPadding,
            Layout.fill,
          ]}>
          <FastImage
            source={Images.legalScreen.legal}
            resizeMode={FastImage.resizeMode.contain}
            style={[{width: width / 1.5, height: width / 1.5}]}
          />
        </View>
        <View style={[Common.backgroundLayout, Gutters.smallPadding]}>
          {legalMenu.map(el => {
            return (
              <Pressable
                key={el.title}
                onPress={() => navigate(el.nextScreen)}
                style={{
                  height: 60,
                  width: '95%',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  borderBottomWidth: 2,
                  borderColor: Colors.neutral[200],
                  flex: 1,
                  flexDirection: 'row',
                  paddingBottom: 10,
                  marginBottom: 20,
                }}>
                <View
                  style={{
                    flex: 0.75,
                    justifyContent: 'center',
                  }}>
                  <Icon
                    name={el.iconName}
                    size={25}
                    color={Colors.neutral[500]}
                  />
                </View>
                <View
                  style={{
                    flex: 4.25,
                    justifyContent: 'center',
                  }}>
                  <Text size={'base'}>{el.title}</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                  }}>
                  <Icon
                    name={'chevron-right'}
                    size={20}
                    color={Colors.neutral[300]}
                  />
                </View>
              </Pressable>
            );
          })}

          <View
            style={[
              Layout.rowHCenter,
              Gutters.smallTMargin,
              {marginTop: '20%'},
            ]}></View>
        </View>
      </Content>
    </Container>
  );
};

export default LegalContainer;
