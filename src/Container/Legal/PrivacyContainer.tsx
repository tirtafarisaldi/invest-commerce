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

const PrivacyContainer = () => {
  const {Common, Fonts, Gutters, Layout, Images} = useTheme();
  const {t} = useTranslation();

  const [detailVisibility, setDetailVisibility] = useState<DetailVisibility>(
    {},
  );

  const dataAccordionLegal = [
    {
      title: t('privacyScreen.reserved'),
      description: t('privacyScreen.reservedText'),
    },
  ];

  return (
    <Container>
      <Content contentContainerStyle={[]} showsVerticalScrollIndicator={false}>
        <HeaderTitle title={t('legalScreen.privacyPolicy')} />
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
            {t('privacyScreen.lastUpdate')}:{' '}
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
            style={{
              textAlign: 'left',
              marginTop: '5%',
            }}>
            {t('privacyScreen.opening')}
          </Text>
        </View>
        {dataAccordionLegal.map(el => (
          <View
            key={el.title}
            style={[Common.backgroundLayout, Gutters.smallPadding]}>
            <Pressable
              key={el.title}
              onPress={() =>
                setDetailVisibility({
                  ...detailVisibility,
                  [el.title]: !detailVisibility[el.title],
                })
              }
              style={{
                height: 25,
                width: '100%',
                marginLeft: 'auto',
                marginRight: 'auto',
                flex: 1,
                flexDirection: 'row',
              }}>
              <View
                style={{
                  flex: 5,
                  justifyContent: 'center',
                }}>
                <Text
                  size={'base'}
                  style={{
                    textDecorationLine: 'underline',
                  }}>
                  {el.title}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                }}>
                <Icon
                  name={
                    detailVisibility[el.title] ? 'chevron-up' : 'chevron-down'
                  }
                  size={20}
                  color={Colors.neutral[300]}
                />
              </View>
            </Pressable>

            {detailVisibility[el.title] ? (
              <View>
                <Text variant="normal" size={'sm'}>
                  {el.description}
                </Text>
              </View>
            ) : null}
          </View>
        ))}

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

export default PrivacyContainer;
