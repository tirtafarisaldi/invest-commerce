import {getUserActivity} from '@Actions/earn';
import Text from '@Atom/Text';
import useTheme from '@Hooks/useTheme';
import {HeaderTitle} from '@Molecule/index';
import {Container, Content} from '@Organism/Basic';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from 'src/Redux/Reducers';
import {RewardsCard} from '../Components';

type Props = ReduxProps;

const RewardsScreen: React.FC<Props> = props => {
  const {t} = useTranslation();

  const {Common, Gutters, Layout, Images, Colors, Fonts} = useTheme();

  const {tierList} = props?.route?.params;

  const RewardsOption = ({name, exp, rewards}: any) => {
    let image = ``;
    if (name === 'Seedling') {
      image = require('@Assets/Images/EarnScreen/seedling.png');
    } else if (name === 'Seeds') {
      image = require('@Assets/Images/EarnScreen/seeds.png');
    } else if (name === 'Sapling') {
      image = require('@Assets/Images/EarnScreen/sapling.png');
    } else if (name === 'Tree') {
      image = require('@Assets/Images/EarnScreen/tree.png');
    } else if (name === 'Sprout') {
      image = require('@Assets/Images/EarnScreen/sprout.png');
    }

    return (
      <>
        <View style={[Layout.rowHCenter, Gutters.smallVMargin]}>
          <FastImage
            source={image}
            style={{width: 40, height: 40}}
            resizeMode="contain"
          />
          <View style={[Gutters.smallLMargin]}>
            <Text variant="semibold">{name}</Text>
            {name === 'Seeds' ? (
              <Text color={Colors.neutral[400]}>
                {t('earnScreen.startHere')}
              </Text>
            ) : (
              <Text color={Colors.neutral[400]}>
                {t('earnScreen.gotXP', {xp: exp})}
              </Text>
            )}
          </View>
        </View>
        {rewards?.map((el: any, i: number) => {
          return (
            <View style={Gutters.smallBMargin}>
              <RewardsCard
                title={el?.name}
                underTitle={el?.description}
                iconColor={
                  el?.name === 'Create 1 Circle'
                    ? Colors.primary[100]
                    : Colors.neutral[300]
                }
                style={{
                  backgroundColor:
                    el?.name === 'Create 1 Circle'
                      ? Colors.primary[600]
                      : Colors.neutral[200],
                }}
                fontColor={
                  el?.name === 'Create 1 Circle'
                    ? Colors.neutral[100]
                    : Colors.neutral[500]
                }
              />
            </View>
          );
        })}
      </>
    );
  };

  return (
    <Container>
      <HeaderTitle title="Rewards" />
      <Content contentContainerStyle={[]} showsVerticalScrollIndicator={false}>
        <View
          style={[
            Common.backgroundLayout,
            Gutters.smallTMargin,
            Gutters.regularPadding,
          ]}>
          <Text variant="semibold" size="base">
            {t('earnScreen.gotAll')}
          </Text>
          <Text color={Colors.neutral[300]}>
            {t('earnScreen.completeDaily')}
          </Text>
          {tierList?.map((el: any, i: number) => {
            return (
              <>
                <RewardsOption
                  name={el?.name}
                  exp={el?.exp}
                  rewards={el?.rewards}
                />
              </>
            );
          })}
        </View>
      </Content>
    </Container>
  );
};

const mapStateToProps = ({earn}: RootState) => ({
  loadingActivity: earn.loadingActivity,
});
const mapDispatchToProps = {
  _getUserActivity: getUserActivity,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(RewardsScreen);
