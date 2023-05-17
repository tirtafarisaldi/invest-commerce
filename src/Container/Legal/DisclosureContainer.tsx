import {Icon, Text} from '@Atom/index';
import {useTheme} from '@Hooks/index';
import {navigate, navigateBack} from '@Navigators/utils';
import {HeaderTitle} from '@Molecule/Header';
import {Container, Content} from '@Organism/Basic';
import {Colors} from '@Theme/Variables';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import {TermScreenProps} from './index';
import {Pressable} from 'react-native';

type Props = TermScreenProps;
interface DetailVisibility {
  [key: string]: boolean;
}

const DisclosureContainer = () => {
  const {Common, Fonts, Gutters, Layout, Images} = useTheme();
  const {t} = useTranslation();

  const [detailVisibility, setDetailVisibility] = useState<DetailVisibility>(
    {},
  );

  const dataAccordionLegal = [
    {
      title: t('disclosureScreen.reserved'),
      description: t('disclosureScreen.reservedText'),
    },
  ];

  return (
    <Container>
      <Content contentContainerStyle={[]} showsVerticalScrollIndicator={false}>
        <HeaderTitle title={t('legalScreen.disclosure')} />
        <View
          style={[
            Common.backgroundLayout,
            // Layout.colVCenter,
            Gutters.smallTMargin,
            Gutters.regularPadding,
            Layout.fill,
          ]}>
          <Text
            variant="semibold"
            style={{
              textAlign: 'left',
            }}>
            {t('disclosureScreen.lastUpdate')}:{' '}
            <Text
              color={Colors.secondary[600]}
              variant="semibold"
              style={{
                textAlign: 'left',
              }}>
              26 April 2022
            </Text>
          </Text>
          <Text
            variant="semibold"
            style={{
              textAlign: 'left',
              marginTop: '5%',
            }}>
            {t('disclosureScreen.summary')}:{' '}
          </Text>

          <Text
            style={{
              textAlign: 'left',
              marginTop: '5%',
            }}>
            {t('disclosureScreen.opening')}
          </Text>
        </View>

        <View
          style={[
            Common.backgroundLayout,
            // Gutters.smallTMargin,
            Gutters.smallPadding,
            Layout.fill,
          ]}>
          <View style={Layout.fill} />

          <View style={[Layout.rowHCenter, Gutters.smallTMargin]}></View>
        </View>
      </Content>
    </Container>
  );
};

export default DisclosureContainer;
