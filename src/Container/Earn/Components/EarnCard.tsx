import {TouchableOpacity, View} from 'react-native';
import React from 'react';
import useTheme from '@Hooks/useTheme';
import {useTranslation} from 'react-i18next';
import Text from '@Atom/Text';
import ProgressBar from '@Container/Profile/Components/ProgressBar';
import Icon from '@Atom/Icon';
import {navigate} from '@Navigators/utils';
import {ConnectedProps, connect} from 'react-redux';
import {getTierUser} from '@Actions/earn';
import {SvgUri} from 'react-native-svg';
import {RootState} from 'src/Redux/Reducers';

const EarnCard = (props: ReduxProps) => {
  const {Gutters, Colors, Layout, Images, Common} = useTheme();
  const {t} = useTranslation();
  const {tierUser} = props.earnState;

  return (
    <View style={Gutters.smallPadding}>
      <View
        style={[
          Common.backgroundLayout,
          Gutters.smallPadding,
          {
            elevation: 6,
            borderRadius: 12,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.2,
            shadowRadius: 1.41,
          },
        ]}>
        <View style={[Layout.rowHCenter]}>
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
              {t('myProfileScreen.youHaveXp', {xp: tierUser?.currentExp})}
            </Text>
            <TouchableOpacity
              onPress={() => navigate('EarnScreen')}
              style={[Layout.rowHCenter, Gutters.tinyVPadding]}>
              <ProgressBar
                currentExp={tierUser.currentExp}
                nextExp={tierUser.nextExp}
                tierList={tierUser.tierList}
                bulletSize={15}
                style={[Gutters.tinyRMargin]}
              />
              <Icon
                name="chevron-right"
                size="xl2"
                color={Colors.primary[700]}
              />
            </TouchableOpacity>
            <Text size="xs">
              {t('myProfileScreen.xpToNextLv', {xp: tierUser.currentExp})}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = ({earn}: RootState) => ({
  earnState: earn,
});

const mapDispatchToProps = {
  _getTier: getTierUser,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;
export default connector(EarnCard);
