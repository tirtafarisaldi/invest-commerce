import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {Container, Content} from '@Organism/Basic';
import Text from '@Atom/Text';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from 'src/Redux/Reducers';
import {logout} from '@Actions/auth';
import {HeaderTitle} from '@Molecule/Header';
import {useTranslation} from 'react-i18next';
import useTheme from '@Hooks/useTheme';
import {Pressable} from 'react-native';
import Icon from '@Atom/Icon';
import {Avatar} from '@Atom/Avatar';
import FastImage from 'react-native-fast-image';
import {navigate, navigateBack} from '@Navigators/utils';
import Modal from '@Molecule/Modal';
import SwitchLanguageModal from './EditProfile/Components/SwitchLanguageModal';

interface SectionMenu {
  title: string;
  iconName: string;
  nextScreen: string;
  onPress?: () => void;
}

const Setting = (props: SectionMenu & ReduxProps) => {
  const {Layout, Common, Colors, Gutters, Images} = useTheme();
  const {t} = useTranslation();
  const {profileData} = props.userState;

  const [inputValue, setInputValue] = useState({
    avatarUrl: profileData.avatar || '',
    name: profileData.name || '',
    seedsTag: profileData.seedsTag || '',
    dob: profileData.birthDate || '',
    bio: profileData.bio || '',
    phoneNumber: profileData.phoneNumber || '',
    email: profileData.email || '',
  });

  const [modal, setModal] = useState({
    switchLanguage: false,
  });

  const sectionIIMenu: SectionMenu[] = [
    {
      iconName: 'user',
      title: t('settingScreen.editProfile'),
      nextScreen: 'EditProfileScreen',
    },
  ];

  const sectionIIIMenu: SectionMenu[] = [
    {
      iconName: 'globe',
      title: t('settingScreen.language'),
      nextScreen: 'TermScreen',
      onPress: () => setModal(prev => ({...prev, switchLanguage: true})),
    },
    {
      iconName: 'file-text',
      title: t('settingScreen.biometrics'),
      nextScreen: 'DisclosureScreen',
    },
  ];

  const sectionIVMenu: SectionMenu[] = [
    {
      iconName: 'user-x',
      title: t('settingScreen.blockList'),
      nextScreen: 'TermScreen',
    },
    {
      iconName: 'file-text',
      title: t('settingScreen.legal'),
      nextScreen: 'LegalScreen',
    },
    {
      iconName: 'help-circle',
      title: t('settingScreen.faqAndHelp'),
      nextScreen: 'PrivacyScreen',
    },
    {
      iconName: 'star',
      title: t('settingScreen.rateApps'),
      nextScreen: 'SocialScreen',
    },
    {
      iconName: 'log-out',
      title: t('settingScreen.logOut'),
      nextScreen: 'CircleScreen',
      onPress: props._logout,
    },
  ];

  return (
    <Container>
      <HeaderTitle title={t('settingScreen.setting')} />
      <Content
        contentContainerStyle={[{flexGrow: 1}]}
        showsVerticalScrollIndicator={false}>
        <View
          style={[
            Gutters.smallTMargin,
            Common.backgroundLayout,
            Gutters.smallPadding,
          ]}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
            }}>
            <View
              style={{
                height: 120,
                flex: 1.25,
              }}>
              <Avatar style={{}} size={70} imageUrl={profileData?.avatar} />
            </View>
            <View
              style={{
                flex: 4.75,
                display: 'flex',
              }}>
              <View
                style={{
                  flex: 0.75,
                  display: 'flex',
                  flexDirection: 'row',
                }}>
                <Text
                  variant="semibold"
                  size={'base'}
                  style={{
                    marginTop: 'auto',
                    marginBottom: 'auto',
                  }}>
                  {profileData?.name}
                </Text>
                <FastImage
                  source={Images.profile.achievement}
                  style={[
                    {
                      width: 20,
                      height: 20,
                      marginTop: 'auto',
                      marginBottom: 'auto',
                      marginLeft: 5,
                    },
                  ]}
                  resizeMode={FastImage.resizeMode.contain}
                />
              </View>
              <View
                style={{
                  flex: 0.75,
                }}>
                <Text
                  size={'xs'}
                  style={{
                    marginTop: 'auto',
                    marginBottom: 'auto',
                  }}>
                  @{profileData?.seedsTag}
                </Text>
              </View>
              <View
                style={{
                  flex: 0.75,
                }}>
                <Text
                  size={'xs'}
                  style={{
                    marginTop: 'auto',
                    marginBottom: 'auto',
                  }}>
                  +{profileData?.phoneNumber}
                </Text>
              </View>
              <View
                style={{
                  flex: 3.75,
                }}>
                <View
                  style={{
                    width: 75,
                    backgroundColor: Colors.primary[500],
                    height: '60%',
                    marginTop: 'auto',
                    marginBottom: 'auto',
                    borderRadius: 999,
                    flexDirection: 'row',
                  }}>
                  <View
                    style={{
                      width: 20,
                      backgroundColor: Colors.primary[200],
                      height: 20,
                      marginTop: 'auto',
                      marginBottom: 'auto',
                      borderRadius: 999,
                      flexDirection: 'row',
                      marginLeft: 4,
                    }}>
                    <View
                      style={{
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        marginTop: 'auto',
                        marginBottom: 'auto',
                      }}>
                      <Icon
                        name="feather"
                        size="base"
                        color={Colors.primary[600]}
                      />
                    </View>
                  </View>
                  <Text
                    variant="semibold"
                    style={{
                      marginTop: 'auto',
                      marginBottom: 'auto',
                      marginLeft: 4,
                    }}
                    size={'xs'}
                    color="white">
                    Sprout
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View
          style={[
            Gutters.smallTMargin,
            Common.backgroundLayout,
            // Gutters.smallPadding,
            Gutters.smallPadding,
            Gutters.largeLPadding,
            Gutters.largeBPadding,
          ]}>
          <View style={[Common.backgroundLayout]}>
            {sectionIIMenu.map((el, index) => {
              return (
                <Pressable
                  key={el.title}
                  onPress={() => navigate(el.nextScreen)}
                  style={{
                    // backgroundColor: index % 2 == 0 ? 'red' : 'blue',
                    flex: 1,
                    flexDirection: 'row',
                    marginTop: index == 0 ? 10 : 40,
                  }}>
                  <View
                    style={{
                      flex: 0.75,
                      alignItems: 'flex-start',
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
                    <Text size={'sm'}>{el.title}</Text>
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
          </View>
        </View>

        <View
          style={[
            Gutters.smallTMargin,
            Common.backgroundLayout,
            // Gutters.smallPadding,
            Gutters.smallPadding,
            Gutters.largeLPadding,
            Gutters.largeBPadding,
          ]}>
          <View style={[Common.backgroundLayout]}>
            {sectionIIIMenu.map((el, index) => {
              return (
                <Pressable
                  key={el.title}
                  onPress={() =>
                    el.onPress ? el.onPress() : navigate(el.nextScreen)
                  }
                  style={{
                    // backgroundColor: index % 2 == 0 ? 'red' : 'blue',
                    flex: 1,
                    flexDirection: 'row',
                    marginTop: index == 0 ? 10 : 35,
                  }}>
                  <View
                    style={{
                      flex: 0.75,
                      alignItems: 'flex-start',
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
                    <Text size={'sm'}>{el.title}</Text>
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
          </View>
        </View>

        <View
          style={[
            Gutters.smallTMargin,
            Common.backgroundLayout,
            // Gutters.smallPadding,
            Gutters.smallPadding,
            Gutters.largeLPadding,
            Gutters.xlargeBPadding,
          ]}>
          <View style={[Common.backgroundLayout]}>
            {sectionIVMenu.map((el, index) => {
              return (
                <Pressable
                  key={el.title}
                  onPress={() =>
                    el.onPress ? el.onPress() : navigate(el.nextScreen)
                  }
                  style={{
                    // backgroundColor: index % 2 == 0 ? 'red' : 'blue',
                    flex: 1,
                    flexDirection: 'row',
                    marginTop: index == 0 ? 10 : 35,
                  }}>
                  <View
                    style={{
                      flex: 0.75,
                      alignItems: 'flex-start',
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
                    <Text size={'sm'}>{el.title}</Text>
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

            {/* <View
              style={[
                Layout.rowHCenter,
                Gutters.smallTMargin,
                {marginTop: '5%'},
              ]}></View> */}
          </View>
        </View>
      </Content>
      <Modal
        variant="bottom"
        isVisible={modal.switchLanguage}
        hideModal={() => setModal(prev => ({...prev, switchLanguage: false}))}>
        <SwitchLanguageModal
          hideModal={() => setModal(prev => ({...prev, switchLanguage: false}))}
        />
      </Modal>
    </Container>
  );
};

const mapStateToProps = ({user}: RootState) => ({
  userState: user,
});
const mapDispatchToProps = {
  _logout: logout,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;
export default connector(Setting);
