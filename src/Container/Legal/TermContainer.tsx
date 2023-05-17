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

const TermContainer = () => {
  const {Common, Fonts, Gutters, Layout, Images} = useTheme();
  const {t} = useTranslation();

  const [detailVisibility, setDetailVisibility] = useState<DetailVisibility>(
    {},
  );

  const dataAccordionLegal = [
    {
      title: t('tncScreen.general'),
      description: t('tncScreen.generalText'),
    },
    {
      title: t('tncScreen.appTerm'),
      description: t('tncScreen.appTermText'),
    },
    {
      title: t('tncScreen.warranties'),
      description: t('tncScreen.warrantiesText'),
    },
    {
      title: t('tncScreen.liability'),
      description: t('tncScreen.liabilityText'),
    },
    {
      title: t('tncScreen.indemnity'),
      description: t('tncScreen.indemnityText'),
    },
    {
      title: t('tncScreen.licensing'),
      description: t('tncScreen.licensingText'),
    },
    {
      title: t('tncScreen.passedAway'),
      description: t('tncScreen.passedAwayText'),
    },
    {
      title: t('tncScreen.intProperty'),
      description: t('tncScreen.intPropertyText'),
    },
    {
      title: t('tncScreen.termination'),
      description: t('tncScreen.terminationText'),
    },
    {
      title: t('tncScreen.miscellaneous'),
      description: t('tncScreen.miscellaneousText'),
    },
  ];

  return (
    <Container>
      <Content contentContainerStyle={[]} showsVerticalScrollIndicator={false}>
        <HeaderTitle title={t('tncScreen.tnc')} />
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
            {t('tncScreen.lastUpdate')}:{' '}
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
            {t('tncScreen.opening')}
          </Text>
        </View>
        {dataAccordionLegal.map(el => (
          <View
            key={el.title}
            style={[
              Common.backgroundLayout,
              Gutters.smallLPadding,
              Gutters.regularTPadding,
              Gutters.smallRPadding,
            ]}>
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
                  color={
                    detailVisibility[el.title]
                      ? Colors.primary[600]
                      : Colors.neutral[500]
                  }
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
                  color={
                    detailVisibility[el.title]
                      ? Colors.primary[600]
                      : Colors.neutral[300]
                  }
                />
              </View>
            </Pressable>

            {detailVisibility[el.title] ? (
              <View>
                <Text variant="normal" size={'xs'}>
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

export default TermContainer;
