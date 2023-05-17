import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Container, Content} from '@Organism/Basic';
import Text from '@Atom/Text';
import FastImage from 'react-native-fast-image';
import {useTranslation} from 'react-i18next';
import useTheme from '@Hooks/useTheme';
import {height, width} from '@Theme/Layout';
import Icon from '@Atom/Icon';
import ProgressBar from '@Container/Profile/Components/ProgressBar';
import {ConnectedProps, connect} from 'react-redux';
import {getTierUser} from '@Actions/earn';
import {RootState} from 'src/Redux/Reducers';
import {SvgUri} from 'react-native-svg';
import Clipboard from '@react-native-clipboard/clipboard';

const Referral = (props: ReduxProps) => {
  const {t} = useTranslation();
  const {Layout, Colors, Common, Gutters, Images, Fonts} = useTheme();
  const bannerSize = Image.resolveAssetSource(
    Images.referralScreen.earnMoreExp,
  );
  const {tierUser} = props.earnState;
  const {profileData} = props.userState;

  return (
    <Container
      statusBar={{
        backgroundColor: Colors.primary[600],
        barStyle: 'light-content',
      }}>
      <Content
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        <FastImage
          source={Images.referralScreen.earnMoreExp}
          style={[
            Gutters.smallPadding,
            {
              width,
              height: (width * bannerSize.height) / height,
              justifyContent: 'center',
            },
          ]}>
          <Text color={Colors.white} size="lg">
            {t('referralScreen.referYourFriends')}
          </Text>
          <Text color={Colors.white} size="xl3" variant="semibold">
            {t('referralScreen.earnMoreXp')}
          </Text>
        </FastImage>
        <View style={[Layout.fill, Common.backgroundLayout]}>
          <View
            style={[
              Common.backgroundLayout,
              Layout.rowHCenter,
              Layout.smallRound,
              Gutters.smallPadding,
              Gutters.smallHMargin,
              Common.elevated,
              {marginTop: -30},
            ]}>
            <TouchableOpacity
              onPress={() => Clipboard.setString(profileData?.refCode)}
              style={[
                Layout.rowHCenter,
                Common.backgroundPrimary,
                Layout.fill,
                Layout.smallRound,
                Gutters.smallPadding,
              ]}>
              <Text style={[Layout.fill]} color={Colors.white}>
                {profileData?.refCode}
              </Text>
              <Icon name="copy" color={Colors.white} />
              <Text
                color={Colors.white}
                variant="semibold"
                style={[Gutters.tinyLMargin]}>
                {t('referralScreen.copy')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                Layout.smallRound,
                Gutters.smallPadding,
                Gutters.smallLMargin,
                {borderWidth: 2, borderColor: Colors.primary[600]},
              ]}>
              <Icon name="share-2" color={Colors.primary[600]} />
            </TouchableOpacity>
          </View>
          <View
            style={[
              Layout.rowHCenter,
              Gutters.smallMargin,
              Gutters.smallPadding,
              Layout.smallRound,
              {
                borderWidth: 1,
                borderColor: Colors.neutral[200],
              },
            ]}>
            <View style={[Layout.center]}>
              <SvgUri
                width={35}
                height={35}
                uri={
                  tierUser?.tierList.find(o => o.name === tierUser.currentTier)
                    ?.image || ''
                }
                style={[Gutters.tinyBMargin]}
              />
              <Text variant="semibold" size="xs" style={[]}>
                {tierUser?.currentTier}
              </Text>
            </View>
            <View style={[Gutters.smallHMargin, Layout.fill]}>
              <Text size="xs" variant="semibold">
                {t('myProfileScreen.xpToNextLv', {xp: tierUser.nextExp})}
              </Text>
              <View style={[Layout.rowHCenter, Gutters.tinyVPadding]}>
                <ProgressBar
                  currentExp={tierUser.currentExp}
                  nextExp={tierUser.nextExp}
                  tierList={tierUser.tierList}
                  bulletSize={11}
                  style={[Gutters.tinyRMargin]}
                />
                <Icon
                  name="chevron-right"
                  size="lg"
                  color={Colors.primary[700]}
                />
              </View>
              <View
                style={[
                  Layout.rowHCenter,
                  Layout.justifyContentBetween,
                  Gutters.smallRMargin,
                ]}>
                {tierUser.tierList.map((tier, idx) => (
                  <Text
                    key={idx}
                    size="xs2"
                    style={[Fonts.textCenter]}
                    color={Colors.neutral[400]}>
                    {tier.name}
                    {'\n'}
                    {tier.exp} XP
                  </Text>
                ))}
              </View>
            </View>
          </View>
          <Text style={[Gutters.smallMargin]} variant="semibold">
            {t('referralScreen.howReferralWorks')}
          </Text>
          <View
            style={[
              Gutters.smallMargin,
              Gutters.smallPadding,
              Layout.smallRound,
              {backgroundColor: Colors.primary[100]},
            ]}>
            <View style={[Layout.rowHCenter]}>
              <View
                style={[
                  Layout.round,
                  Common.backgroundLayout,
                  Gutters.smallPadding,
                  Common.elevated,
                  {shadowColor: Colors.neutral[300]},
                ]}>
                <Icon name="link" color={Colors.primary[600]} />
              </View>
              <Text style={[Gutters.smallHMargin, Layout.fill]}>
                Invite your friend to install the app with the link
              </Text>
            </View>
            <View style={[Layout.rowHCenter, Gutters.largeVMargin]}>
              <View
                style={[
                  Layout.round,
                  Common.backgroundLayout,
                  Gutters.smallPadding,
                  Common.elevated,
                  {shadowColor: Colors.neutral[300]},
                ]}>
                <Icon name="link" color={Colors.primary[600]} />
              </View>
              <Text style={[Gutters.smallHMargin, Layout.fill]}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
              </Text>
            </View>
            <View style={[Layout.rowHCenter]}>
              <View
                style={[
                  Layout.round,
                  Common.backgroundLayout,
                  Gutters.smallPadding,
                  Common.elevated,
                  {shadowColor: Colors.neutral[300]},
                ]}>
                <Icon name="coins" color={Colors.primary[600]} />
              </View>
              <Text style={[Gutters.smallHMargin, Layout.fill]}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
              </Text>
            </View>
          </View>
        </View>
      </Content>
    </Container>
  );
};

const mapStateToProps = ({user, earn}: RootState) => ({
  earnState: earn,
  userState: user,
});

const mapDispatchToProps = {
  _getTier: getTierUser,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;
export default connector(Referral);
