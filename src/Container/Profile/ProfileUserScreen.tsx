import {View} from 'react-native';
import React from 'react';
import {Container, Content} from '@Organism/Basic';
import {HeaderTitle} from '@Molecule/index';
import {useTranslation} from 'react-i18next';
import useTheme from '@Hooks/useTheme';
import FastImage from 'react-native-fast-image';
import {Button, Text} from '@Atom/index';
import {Colors} from '@Theme/Variables';
import ButtonSimple from '@Atom/Button/ButtonSimple';

export default function ProfileUserScreen() {
  const {Common, Fonts, Gutters, Layout, Images} = useTheme();
  const {t} = useTranslation();
  return (
    <Container>
      <Content contentContainerStyle={[]} showsVerticalScrollIndicator={false}>
        <HeaderTitle title={t('Zack Dela Roca')} />
        <View
          style={[
            Common.backgroundLayout,
            Gutters.smallTMargin,
            Gutters.regularPadding,
          ]}>
          <View style={[Layout.rowCenter]}>
            <FastImage
              source={Images.discover.user}
              resizeMode={FastImage.resizeMode.contain}
              style={[{width: 90, height: 90}]}
            />
            <View
              style={[
                Gutters.smallLMargin,
                Layout.column,
                Layout.scrollSpaceBetween,
                Gutters.smallPadding,
                {flex: 1},
              ]}>
              <View style={[Layout.row, Layout.scrollSpaceBetween]}>
                <View>
                  <Text style={[Fonts.textCenter]} variant="bold">
                    10
                  </Text>
                  <Text style={[Fonts.textCenter]} color={Colors.neutral[400]}>
                    Post
                  </Text>
                </View>
                <View>
                  <Text style={[Fonts.textCenter]} variant="bold">
                    100
                  </Text>
                  <Text style={[Fonts.textCenter]} color={Colors.neutral[400]}>
                    Followers
                  </Text>
                </View>
                <View>
                  <Text style={[Fonts.textCenter]} variant="bold">
                    50
                  </Text>
                  <Text style={[Fonts.textCenter]} color={Colors.neutral[400]}>
                    Following
                  </Text>
                </View>
              </View>
              <View
                style={[
                  Layout.rowCenter,
                  Gutters.smallTMargin,
                  Layout.scrollSpaceBetween,
                ]}>
                <ButtonSimple title={'Follow'} />
                <Button type="iconOnly" />
                <Button type="iconOnly" />
                <Button type="iconOnly" />
              </View>
            </View>
          </View>
          <View>
            <Text variant="bold" size="base">
              @IsmailMesbah
            </Text>
            <Text size="base">IsmailMesbah</Text>
            <Text>
              Lorem ipsum dolor sit amet consectetur. At vel diam leo cras magna
              non amet. Tellus purus.
            </Text>
          </View>
          <FastImage
            source={Images.profile.example}
            resizeMode={FastImage.resizeMode.contain}
            style={[{width: '100%', height: 90}]}
          />
        </View>
        <View
          style={[
            Common.backgroundLayout,
            Gutters.smallTMargin,
            Gutters.regularPadding,
          ]}></View>
      </Content>
    </Container>
  );
}
