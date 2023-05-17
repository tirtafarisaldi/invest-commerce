import {TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {Container, Content} from '@Organism/Basic';
import Text from '@Atom/Text';
import useTheme from '@Hooks/useTheme';
import {useTranslation} from 'react-i18next';
import {Avatar} from '@Atom/Avatar';
import Icon from '@Atom/Icon';
import {navigateBack} from '@Navigators/utils';
import {Dropdown, InputField, PhoneInputField} from '@Molecule/index';
import {Button} from '@Atom/Button';
import Modal from '@Molecule/Modal';
import DeleteAccountModal from './Components/DeleteAccountModal';
import {ConnectedProps, connect} from 'react-redux';
import {RootState} from 'src/Redux/Reducers';
import {IEditProfile} from '.';
import moment from 'moment';
import {standardizePhoneNumber} from '@Utils/standardizePhoneNumber';

const EditProfile = (props: IEditProfile & ReduxProps) => {
  const {Layout, Common, Colors, Fonts, Gutters, Images} = useTheme();
  const {t} = useTranslation();
  const {profileData} = props.userState;

  const [input, setInput] = useState({
    avatarUrl: profileData.avatar || '',
    name: profileData.name || '',
    seedsTag: profileData.seedsTag || '',
    dob: profileData.birthDate || '',
    bio: profileData.bio || '',
    phoneNumber: profileData.phoneNumber
      ? standardizePhoneNumber(profileData.phoneNumber)
      : '',
    email: profileData.email || '',
  });
  const [modal, setModal] = useState({
    deleteAccount: false,
  });

  return (
    <Container>
      <View
        style={[
          Common.header.headerBrandContent,
          Common.backgroundLayout,
          Gutters.tinyHPadding,
        ]}>
        <TouchableOpacity onPress={navigateBack} style={{flex: 0.25}}>
          <Icon name="arrow-left" size="xl" />
        </TouchableOpacity>
        <Text variant="semibold" style={[Layout.fill, Fonts.textCenter]}>
          {t('editProfileScreen.header')}
        </Text>
        <TouchableOpacity style={[{flex: 0.25}]}>
          <Text variant="semibold" color={Colors.primary[600]}>
            {t('editProfileScreen.headerRight')}
          </Text>
        </TouchableOpacity>
      </View>
      <Content
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          Common.backgroundLayout,
          Gutters.smallPadding,
          {flexGrow: 1},
        ]}>
        <View style={[Layout.center]}>
          <TouchableOpacity>
            <Avatar size={100} imageUrl={input.avatarUrl} />
            <Text
              size="xs"
              style={[
                Gutters.tinyTMargin,
                Fonts.textCenter,
                {textDecorationLine: 'underline'},
              ]}
              color={Colors.primary[600]}>
              {t('editProfileScreen.editImage')}
            </Text>
          </TouchableOpacity>
        </View>
        <InputField
          label={t('editProfileScreen.name')}
          mandatoryMark
          value={input.name}
          onChangeValue={val => setInput(prev => ({...prev, name: val}))}
          style={[Gutters.smallTMargin]}
        />
        <InputField
          label={t('editProfileScreen.seedsTag')}
          mandatoryMark
          value={input.seedsTag}
          onChangeValue={val => setInput(prev => ({...prev, seedsTag: val}))}
          style={[Gutters.smallTMargin]}
        />
        <Dropdown
          label={t('editProfileScreen.dob')}
          mandatoryMark
          value={input.dob ? moment(input.dob).format('DD / MM / YYYY') : ''}
          style={[Gutters.smallTMargin]}
          placeholder="Select Date"
          rightIcon="chevron-right"
        />
        <InputField
          label="Bio"
          value={input.bio}
          onChangeValue={val => setInput(prev => ({...prev, bio: val}))}
          style={[Gutters.smallTMargin]}
        />
        <PhoneInputField
          label={t('editProfileScreen.phoneNumber')}
          value={input.phoneNumber}
          mandatoryMark
          onChangeValue={text =>
            setInput(prev => ({...prev, phoneNumber: text}))
          }
          style={[Gutters.smallTMargin]}
        />
        <InputField
          label={t('editProfileScreen.email')}
          mandatoryMark
          value={input.email}
          onChangeValue={val => setInput(prev => ({...prev, email: val}))}
          style={[Gutters.smallTMargin]}
          rightIcon="chevron-right"
        />
        <Dropdown
          label={t('editProfileScreen.linkedAccount')}
          variant="labelOnly"
          mandatoryMark
          value={input.email}
          style={[Gutters.smallTMargin]}
          rightIcon="chevron-right"
        />
        <Dropdown
          label={t('editProfileScreen.changePin')}
          variant="labelOnly"
          mandatoryMark
          value={input.email}
          style={[Gutters.smallTMargin]}
          rightIcon="chevron-right"
        />
        <Button
          type="outline"
          style={[Gutters.smallVMargin, {borderColor: Colors.red[600]}]}
          title={t('editProfileScreen.deleteAccount')}
          titleStyle={[{color: Colors.red[600]}]}
          onPress={() => setModal(prev => ({...prev, deleteAccount: true}))}
        />
      </Content>
      <Modal
        variant="bottom"
        isVisible={modal.deleteAccount}
        hideModal={() => setModal(prev => ({...prev, deleteAccount: false}))}>
        <DeleteAccountModal
          hideModal={() => setModal(prev => ({...prev, deleteAccount: false}))}
        />
      </Modal>
    </Container>
  );
};

const mapStateToProps = ({user}: RootState) => ({
  userState: user,
});

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;
export default connector(EditProfile);
