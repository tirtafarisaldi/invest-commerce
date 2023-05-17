import {getTreasureActive, getTreasureExpired} from '@Actions/earn';
import Text from '@Atom/Text';
import useTheme from '@Hooks/useTheme';
import {HeaderTitle} from '@Molecule/index';
import {Container, Content} from '@Organism/Basic';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, View} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from 'src/Redux/Reducers';
import {TreasureCard} from '../Components';
import Modal from '@Molecule/Modal';
import FastImage from 'react-native-fast-image';
import {useTranslation} from 'react-i18next';
import {Button} from '@Atom/index';

type Props = ReduxProps;

const TreasureScreen: React.FC<Props> = props => {
  const {Common, Gutters, Layout, Images, Colors, Fonts} = useTheme();
  const {t} = useTranslation();

  const {
    _getTreasureActive,
    _getTreasureExpired,
    // loadingTreasureActive,
    // loadingTreasureExpired,
  } = props;

  const [loading, setLoading] = useState(false);
  const [treasureActive, setTreasureActive] = useState([]);
  const [treasureExpired, setTreasureExpired] = useState([]);
  const [isClaimModalShow, setClaimModalShow] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      Promise.all([_getTreasureActive(), _getTreasureExpired()]).then(
        (res: any) => {
          setLoading(false);
          setTreasureActive(res[0]?.treasures);
          setTreasureExpired(
            res[1].treasures.map((v: any) => Object.assign(v, {expired: true})),
          );
        },
      );
    };
    fetchData();
  }, []);

  const renderTreasureExpired = () => {
    return (
      <>
        {treasureActive?.length > 0 ? (
          <>
            <Text variant="semibold" size="base">
              {t('earnScreen.gotTreasure')}
            </Text>
            <Text color={Colors.neutral[400]}>
              {t('earnScreen.makeTransactionAndCompleteMission')}
            </Text>
          </>
        ) : (
          <>
            <Text variant="semibold" size="base">
              {t('earnScreen.treasureExpired')}
            </Text>
            <Text color={Colors.neutral[400]}>
              {t('earnScreen.makeTransactionAndCompleteMission')}
            </Text>
          </>
        )}
      </>
    );
  };

  const renderTreasure = ({item, i}: any) => {
    return item?.expired ? (
      <TreasureCard
        disabled={item?.expired}
        title={item?.name}
        description={item?.description}
        expDate={item?.expiration}
      />
    ) : (
      <TreasureCard
        title={item?.name}
        description={item?.description}
        expDate={item?.expiration}
        onButtonPress={() => setClaimModalShow(true)}
      />
    );
  };

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
      <HeaderTitle title={'Treasures'} />
      <Content
        contentContainerStyle={[
          Gutters.smallTMargin,
          Common.backgroundLayout,
          {flex: 1},
        ]}
        showsVerticalScrollIndicator={false}>
        {renderModal()}
        {loading ? (
          <View style={Gutters.smallTMargin}>
            <ActivityIndicator size="large" color={Colors.primary[600]} />
          </View>
        ) : (
          <>
            <View style={[Common.backgroundLayout, Gutters.regularPadding]}>
              {renderTreasureExpired()}
            </View>
            <FlatList
              data={[...treasureActive, ...treasureExpired]}
              keyExtractor={(item, index) => 'key' + index}
              renderItem={renderTreasure}
              showsVerticalScrollIndicator={false}
            />
          </>
        )}
      </Content>
    </Container>
  );
};

const mapStateToProps = ({earn}: RootState) => ({
  loadingTreasureActive: earn.loadingTreasureActive,
  loadingTreasureExpired: earn.loadingTreasureExpired,
});
const mapDispatchToProps = {
  _getTreasureActive: getTreasureActive,
  _getTreasureExpired: getTreasureExpired,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(TreasureScreen);
