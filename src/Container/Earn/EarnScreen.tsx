import {
  View,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Container, Content} from '@Organism/Basic';
import {HeaderTitle} from '@Molecule/index';
import useTheme from '@Hooks/useTheme';
import Text from '@Atom/Text';
import {ActivityCard, ProgressBar, RewardsCard} from './Components';
import Icon from '@Atom/Icon';
import FastImage from 'react-native-fast-image';
import {Button} from '@Atom/Button';
import {navigate} from '@Navigators/utils';
import {TreasureCard} from './Components';
import {getTierUser, getTreasureActive, getUserActivity} from '@Actions/earn';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from 'src/Redux/Reducers';
import moment from 'moment';
import {useTranslation} from 'react-i18next';
import Modal from '@Molecule/Modal';

interface TierUser {
  currentExp: any;
  expExpiration: any;
  nextExp: any;
  tierList: any;
}

function EarnScreen(props: any) {
  const {Common, Gutters, Layout, Images, Colors, Fonts} = useTheme();
  const {t} = useTranslation();

  const {
    loadingActivity,
    loadingTierUser,
    loadingTreasureActive,
    _getUserActivity,
    _getTierUser,
    _getTreasureActive,
  } = props;

  const [loading, setLoading] = useState(false);
  const [activityList, setActivityList] = useState([]);
  const [isClaimModalShow, setClaimModalShow] = useState(false);
  const [treasureActive, setTreasureActive] = useState([]);
  const [tierUser, setTierUser] = useState<TierUser>({
    currentExp: null,
    expExpiration: null,
    nextExp: null,
    tierList: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      Promise.all([
        _getUserActivity(),
        _getTierUser(),
        _getTreasureActive(),
      ]).then((res: any) => {
        setLoading(false);
        setActivityList(res[0]?.activities);
        setTierUser(res[1]);
        setTreasureActive(res[2]?.treasures);
      });
    };
    fetchData();
  }, []);

  const toPage = (page: any, data?: any) => {
    navigate(page, data);
  };

  const renderActivityCard = ({item, i}: any) => {
    return (
      <ActivityCard
        name={item?.name}
        key={item?.count}
        date={moment(item?.Date).format('DD/MM/YYYY')}
        max={item?.isMax}
        exp={item?.exp}
        count={item?.count}
      />
    );
  };

  const renderXpToNextLevel = () => {
    let nextLevel = 'Sprout';
    let nextXp = 0;
    let currentXp = tierUser?.currentExp;
    if (currentXp < 200) {
      nextLevel = 'Sprout';
      nextXp = 200 - currentXp;
    } else if (currentXp > 200 && currentXp < 300) {
      nextLevel = 'Seedling';
      nextXp = 300 - currentXp;
    } else if (currentXp > 300 && currentXp < 500) {
      nextLevel = 'Sapling';
      nextXp = 500 - currentXp;
    } else if (currentXp > 500) {
      nextLevel = 'Tree';
      nextXp = 1000 - currentXp;
    }

    return (
      <View
        style={[
          Gutters.tinyPadding,
          Layout.rowHCenter,
          Gutters.tinyTMargin,
          {
            borderRadius: 12,
            borderWidth: 1,
            borderColor: Colors.red[600],
            backgroundColor: Colors.red[100],
          },
        ]}>
        <View style={[Gutters.smallHPadding]}>
          <Icon name="clock" color={Colors.red[600]} />
        </View>
        <View style={[{width: '80%'}]}>
          <Text>
            {t('earnScreen.toReachXp', {
              xp: nextXp,
              level: nextLevel,
            })}{' '}
            {moment(tierUser?.expExpiration).format('DD MMM YYYY')}
          </Text>
        </View>
      </View>
    );
  };

  let currentExp = tierUser?.currentExp;
  let percentage = 0;
  if (currentExp < 200) {
    percentage = currentExp;
  } else if (currentExp < 300) {
    percentage = 200 + currentExp;
  } else if (currentExp < 500) {
    percentage = 300 + currentExp;
  } else if (currentExp < 1000) {
    percentage = currentExp;
  }

  const renderModal = () => {
    return (
      <>
        <Modal
          variant="bottom"
          isVisible={isClaimModalShow}
          hideModal={() => {
            setClaimModalShow(false);
          }}>
          <View style={Layout.alignItemsCenter}>
            <FastImage
              source={Images.earn.userWithCoin}
              style={{width: 200, height: 200}}
              resizeMode="contain"
            />
            <View style={[Layout.alignItemsCenter, {width: '70%'}]}>
              <Text variant="bold"> {t('earnScreen.congratulations')}</Text>
              <Text variant="bold">{t('earnScreen.rewardsClaimed')}</Text>
              <Text style={[Gutters.smallTMargin, Fonts.textCenter]}>
                {t('earnScreen.completeToGetReward')}
              </Text>
            </View>
          </View>
          <View>
            <Button
              onPress={() => setClaimModalShow(false)}
              title={t('earnScreen.continue')}
              style={[Gutters.tinyVPadding, {flex: undefined}]}
              titleStyle={{color: 'white'}}
            />
          </View>
        </Modal>
      </>
    );
  };

  return (
    <Container>
      <HeaderTitle title={t('Earn')} />
      {renderModal()}
      <Content contentContainerStyle={[]} showsVerticalScrollIndicator={false}>
        {loading ? (
          <View style={Gutters.smallTMargin}>
            <ActivityIndicator size="large" color={Colors.primary[600]} />
          </View>
        ) : (
          <>
            <View style={[Common.backgroundLayout, Gutters.smallTMargin]}>
              <ImageBackground
                source={Images.earn.background}
                style={{width: Dimensions.get('window').width, height: 160}}
              />
              <View style={[Layout.alignItemsCenter, {top: -10}]}>
                <Text variant="semibold" size="base">
                  {t('earnScreen.sprout')}
                </Text>
                <Text size="xs" color={Colors.neutral[500]}>
                  {tierUser?.currentExp} {t('earnScreen.xp')}
                </Text>
                <View style={{top: -8, width: '100%', alignItems: 'center'}}>
                  <ProgressBar
                    data={tierUser?.tierList}
                    height={8}
                    backgroundColor={'grey'}
                    completedColor={Colors.secondary[500]}
                    percentage={`${String((percentage / 1000) * 100)}%`}
                    numberOfPercent={percentage}
                  />
                </View>
                {renderXpToNextLevel()}
              </View>
            </View>
            <View style={[Common.backgroundLayout, Gutters.smallTMargin]}>
              <View
                style={[
                  Layout.scrollSpaceBetween,
                  Layout.rowHCenter,
                  Layout.alignItemsCenter,
                  Gutters.regularPadding,
                ]}>
                <Text variant="semibold" size="base">
                  {t('earnScreen.treasure')}
                </Text>
                {treasureActive?.length > 0 ? (
                  <TouchableOpacity onPress={() => toPage('TreasureScreen')}>
                    <Text size="xs" color={Colors.primary[600]}>
                      {t('earnScreen.seeAll')}
                    </Text>
                  </TouchableOpacity>
                ) : null}
              </View>
              {treasureActive?.length > 0 ? (
                <TreasureCard
                  date={new Date()}
                  disabled={treasureActive[0]?.isClaimed}
                  title={treasureActive[0]?.name}
                  description={treasureActive[0]?.description}
                  expDate={treasureActive[0]?.expiration}
                  onButtonPress={() => setClaimModalShow(true)}
                />
              ) : null}
            </View>
            <View
              style={[
                Common.backgroundLayout,
                Gutters.smallTMargin,
                Gutters.regularPadding,
              ]}>
              <Text variant="semibold" size="base">
                {t('earnScreen.rewards')}
              </Text>
              {tierUser?.tierList
                ? tierUser?.tierList[1]?.rewards?.map((el: any, i: number) => {
                    return (
                      <View style={Gutters.smallTMargin}>
                        <RewardsCard
                          index={i}
                          title={el?.name}
                          underTitle={el?.description}
                          iconColor={Colors.primary[100]}
                          style={{backgroundColor: Colors.primary[600]}}
                          fontColor={Colors.neutral[100]}
                        />
                      </View>
                    );
                  })
                : null}
            </View>
            <View
              style={[
                Common.backgroundLayout,
                Gutters.smallTMargin,
                Gutters.regularPadding,
              ]}>
              <View
                style={[
                  Layout.scrollSpaceBetween,
                  Layout.rowHCenter,
                  Layout.alignItemsCenter,
                ]}>
                <Text variant="semibold" size="base">
                  {t('earnScreen.activity')}
                </Text>
                {activityList?.length > 0 ? (
                  <TouchableOpacity onPress={() => toPage('ActivityScreen')}>
                    <Text size="xs" color={Colors.primary[600]}>
                      {t('earnScreen.seeAll')}
                    </Text>
                  </TouchableOpacity>
                ) : null}
              </View>
              <FlatList
                data={
                  activityList?.length > 2
                    ? activityList.slice(0, 3)
                    : activityList
                }
                keyExtractor={(item, index) => 'key' + index}
                renderItem={renderActivityCard}
                showsVerticalScrollIndicator={false}
              />
            </View>
            <View
              style={[
                Common.backgroundLayout,
                Gutters.smallTMargin,
                Gutters.regularPadding,
              ]}>
              <View style={Layout.rowHCenter}>
                <FastImage
                  source={Images.earn.padlock}
                  style={{width: 30, height: 30}}
                  resizeMode="contain"
                />
                <View style={[Gutters.smallLMargin]}>
                  <Text variant="semibold">
                    {t('earnScreen.waitingToUnlock')}
                  </Text>
                  <Text color={Colors.neutral[400]}>
                    {t('earnScreen.collectXpToUnlockRewards')}
                  </Text>
                </View>
              </View>
              <View style={[Gutters.smallTMargin]}>
                {tierUser?.tierList
                  ? tierUser?.tierList[2]?.rewards?.map(
                      (el: any, i: number) => {
                        return (
                          <RewardsCard
                            index={i}
                            title={el?.name}
                            underTitle={el?.description}
                            iconColor={Colors.neutral[300]}
                          />
                        );
                      },
                    )
                  : null}
                <View style={Gutters.smallTMargin}>
                  <Button
                    onPress={() => toPage('RewardsScreen', tierUser)}
                    title={'See all rewards'}
                    type="outline"
                    titleStyle={{color: Colors.primary[600]}}
                    titleVariant="semibold"
                  />
                </View>
              </View>
            </View>
          </>
        )}
      </Content>
    </Container>
  );
}

const mapStateToProps = ({earn}: RootState) => ({
  loadingActivity: earn.loadingActivity,
  loadingTierUser: earn.loadingTierUser,
  loadingTreasureActive: earn.loadingTreasureActive,
});
const mapDispatchToProps = {
  _getUserActivity: getUserActivity,
  _getTierUser: getTierUser,
  _getTreasureActive: getTreasureActive,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(EarnScreen);
