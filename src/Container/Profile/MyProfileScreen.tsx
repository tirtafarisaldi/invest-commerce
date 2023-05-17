import {
  Animated,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Container, Content} from '@Organism/Basic';
import Text from '@Atom/Text';
import {HeaderTitle} from '@Molecule/index';
import {useTranslation} from 'react-i18next';
import useTheme from '@Hooks/useTheme';
import {navigate} from '@Navigators/utils';
import {Avatar} from '@Atom/Avatar';
import FastImage from 'react-native-fast-image';
import Icon from '@Atom/Icon';
import ProgressBar from './Components/ProgressBar';
import {Route, TabView} from 'react-native-tab-view';
import {Post} from './Post';
import {Circle} from './Circle';
import {Play} from './Play';
import {height} from '@Theme/Layout';
import {RootState} from 'src/Redux/Reducers';
import {ConnectedProps, connect} from 'react-redux';
import {IMyProfile} from '.';
import {SvgUri} from 'react-native-svg';
import {getTierUser} from '@Actions/earn';

const MyProfile = (props: IMyProfile & ReduxProps) => {
  const {Layout, Common, Colors, Gutters, Images} = useTheme();
  const {t} = useTranslation();
  const [hideProfileInfo, setHideProfileInfo] = useState(false);
  const [lastScrollValue, setlastScrollValue] = useState(0);
  const [tabActive, setTabActive] = useState(0);
  const [routes] = useState([
    {key: 'post', title: 'Post'},
    {key: 'circle', title: 'Circle'},
    {key: 'play', title: 'Play'},
  ]);
  const {profileData} = props.userState;
  const {tierUser} = props.earnState;

  const _renderScene = ({route}: {route: Route}) => {
    switch (route.key) {
      case 'post':
        return <Post onScroll={hideProfileOnScroll} />;
      case 'circle':
        return <Circle onScroll={hideProfileOnScroll} />;
      case 'play':
        return <Play onScroll={hideProfileOnScroll} />;
    }
  };

  useEffect(() => {
    props._getTier();

    return () => {};
  }, []);

  return (
    <Container>
      <HeaderTitle
        title={t('myProfileScreen.header')}
        rightIcon="settings"
        rightIconColor={Colors.neutral[800]}
        onPressRightIcon={() => navigate('SettingScreen')}
      />
      <Content
        contentContainerStyle={[{flexGrow: 1}]}
        showsVerticalScrollIndicator={false}>
        {/* TOP SECTION */}
        <View
          style={{overflow: 'hidden', maxHeight: hideProfileInfo ? 0 : height}}>
          <View
            style={[
              Gutters.smallTMargin,
              Common.backgroundLayout,
              Gutters.smallPadding,
              Gutters.largeBPadding,
            ]}>
            <View style={[Layout.rowHCenter]}>
              <Avatar size={100} isOnline imageUrl={profileData?.avatar} />
              <View style={[Gutters.smallLMargin, Layout.fill]}>
                <View style={[Layout.rowHCenter]}>
                  <View style={[Layout.colCenter, Layout.fill]}>
                    <Text variant="semibold" color={Colors.black}>
                      {profileData?.posts}
                    </Text>
                    <Text size="xs" color={Colors.black} style={{opacity: 0.5}}>
                      {t('myProfileScreen.post')}
                    </Text>
                  </View>
                  <View style={[Layout.colCenter, Layout.fill]}>
                    <Text variant="semibold" color={Colors.black}>
                      {profileData?.followers}
                    </Text>
                    <Text size="xs" color={Colors.black} style={{opacity: 0.5}}>
                      {t('myProfileScreen.followers')}
                    </Text>
                  </View>
                  <View style={[Layout.colCenter, Layout.fill]}>
                    <Text variant="semibold" color={Colors.black}>
                      {profileData?.following}
                    </Text>
                    <Text size="xs" color={Colors.black} style={{opacity: 0.5}}>
                      {t('myProfileScreen.following')}
                    </Text>
                  </View>
                </View>
                <View
                  style={[
                    Layout.rowHCenter,
                    Layout.justifyContentAround,
                    Gutters.smallTMargin,
                  ]}>
                  <TouchableOpacity
                    style={[
                      Gutters.tinyPadding,
                      Layout.round,
                      {backgroundColor: Colors.primary[100]},
                    ]}>
                    <FastImage
                      source={Images.profile.achievement}
                      style={[{width: 30, height: 30}]}
                      resizeMode={FastImage.resizeMode.contain}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigate('ReferralScreen')}
                    style={[
                      Gutters.smallHPadding,
                      Layout.rowCenter,
                      Layout.round,
                      {height: 36, backgroundColor: Colors.primary[100]},
                    ]}>
                    <Text color={Colors.primary[600]} size="xs">
                      {profileData?.refCode}
                    </Text>
                    <View
                      style={[
                        Gutters.tinyLMargin,
                        Gutters.tinyPadding,
                        Layout.round,
                        {backgroundColor: Colors.primary[200]},
                      ]}>
                      <Icon
                        name="share-2"
                        size="base"
                        color={Colors.primary[600]}
                      />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigate('EditProfileScreen')}
                    style={[
                      Gutters.smallHPadding,
                      Layout.round,
                      Layout.center,
                      {
                        height: 36,
                        backgroundColor: Colors.white,
                        borderWidth: 1,
                        borderColor: Colors.neutral[900],
                      },
                    ]}>
                    <Text color={Colors.neutral[900]} size="xs">
                      {t('myProfileScreen.editProfile')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={[Layout.rowHCenter, Gutters.smallTMargin]}>
              <Text
                color={Colors.neutral[500]}
                variant="semibold"
                style={[Gutters.tinyRMargin]}>
                @{profileData?.seedsTag}
              </Text>
              <Icon name="check-circle-filled" color={Colors.secondary[600]} />
            </View>
            <Text style={[Gutters.tinyVMargin]} size="xs">
              {profileData?.name}
            </Text>
            <Text style={[{maxWidth: '85%'}]} size="xs">
              {profileData?.bio}
            </Text>
            <View style={[Layout.rowHCenter, Gutters.smallTMargin]}>
              <View style={[Layout.center]}>
                <SvgUri
                  width={35}
                  height={35}
                  uri={
                    tierUser?.tierList.find(
                      o => o.name === tierUser.currentTier,
                    )?.image || ''
                  }
                  style={[Gutters.tinyBMargin]}
                />
                <Text variant="semibold" size="xs" style={[]}>
                  {tierUser?.currentTier}
                </Text>
              </View>
              <View style={[Gutters.smallHMargin, Layout.fill]}>
                <Text size="xs" variant="semibold">
                  {t('myProfileScreen.youHaveXp', {xp: tierUser?.currentExp})}
                </Text>
                <TouchableOpacity
                  onPress={() => navigate('EarnScreen')}
                  style={[Layout.rowHCenter, Gutters.tinyVPadding]}>
                  <ProgressBar
                    style={[Gutters.tinyRMargin]}
                    currentExp={tierUser.currentExp}
                    nextExp={tierUser.nextExp}
                    tierList={tierUser.tierList}
                  />
                  <Icon
                    name="chevron-right"
                    size="xl2"
                    color={Colors.primary[700]}
                  />
                </TouchableOpacity>
                <Text size="xs">
                  {t('myProfileScreen.xpToNextLv', {xp: tierUser?.nextExp})}
                </Text>
              </View>
            </View>
          </View>
        </View>
        {/* BOTTOM SECTION */}
        <View
          style={[
            Layout.rowCenter,
            Gutters.smallTMargin,
            Common.backgroundLayout,
            {borderBottomWidth: 1, borderColor: Colors.neutral[200]},
          ]}>
          <TouchableOpacity
            style={[Layout.fill, Layout.center]}
            onPress={() => setTabActive(0)}>
            <View
              style={[
                Gutters.smallHPadding,
                Gutters.tinyVPadding,
                {
                  borderBottomWidth: 4,
                  borderRadius: 2,
                  borderColor:
                    tabActive === 0 ? Colors.primary[600] : Colors.transparent,
                  marginBottom: -2,
                },
              ]}>
              <Text
                variant={tabActive === 0 ? 'semibold' : 'normal'}
                color={
                  tabActive === 0 ? Colors.primary[600] : Colors.neutral[400]
                }>
                {t('myProfileScreen.post')}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[Layout.fill, Layout.center]}
            onPress={() => setTabActive(1)}>
            <View
              style={[
                Gutters.smallHPadding,
                Gutters.tinyVPadding,
                {
                  borderBottomWidth: 4,
                  borderRadius: 2,
                  borderColor:
                    tabActive === 1 ? Colors.primary[600] : Colors.transparent,
                  marginBottom: -2,
                },
              ]}>
              <Text
                variant={tabActive === 1 ? 'semibold' : 'normal'}
                color={
                  tabActive === 1 ? Colors.primary[600] : Colors.neutral[400]
                }>
                {t('myProfileScreen.circle')}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[Layout.fill, Layout.center]}
            onPress={() => setTabActive(2)}>
            <View
              style={[
                Gutters.smallHPadding,
                Gutters.tinyVPadding,
                {
                  borderBottomWidth: 4,
                  borderRadius: 2,
                  borderColor:
                    tabActive === 2 ? Colors.primary[600] : Colors.transparent,
                  marginBottom: -2,
                },
              ]}>
              <Text
                variant={tabActive === 2 ? 'semibold' : 'normal'}
                color={
                  tabActive === 2 ? Colors.primary[600] : Colors.neutral[400]
                }>
                {t('myProfileScreen.play')}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <TabView
          navigationState={{index: tabActive, routes}}
          onIndexChange={setTabActive}
          renderScene={_renderScene}
          renderTabBar={() => null}
        />
      </Content>
    </Container>
  );

  function hideProfileOnScroll(e: NativeSyntheticEvent<NativeScrollEvent>) {
    const {x, y} = e.nativeEvent.contentOffset;
    // console.log(y, lastScrollValue, lastScrollValue - y);
    setlastScrollValue(y);
    if (y <= 0 && lastScrollValue - y < 200) {
      setHideProfileInfo(false);
    } else {
      setHideProfileInfo(true);
    }
  }
};

const mapStateToProps = ({user, earn}: RootState) => ({
  userState: user,
  earnState: earn,
});

const mapDispatchToProps = {
  _getTier: getTierUser,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;
export default connector(MyProfile);
