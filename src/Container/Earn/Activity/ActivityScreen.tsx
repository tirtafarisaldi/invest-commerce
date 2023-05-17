import {ActivityIndicator, FlatList, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Container, Content} from '@Organism/Basic';
import {HeaderTitle} from '@Molecule/index';
import useTheme from '@Hooks/useTheme';
import Text from '@Atom/Text';
import {ActivityCard, ProgressBarPlain, TreasureCard} from '../Components';
import FastImage from 'react-native-fast-image';
import {connect, ConnectedProps} from 'react-redux';
import {
  getUserActivity,
  getCompletedTask,
  getUncompletedTask,
  getActivitySummary,
} from '@Actions/earn';
import {RootState} from 'src/Redux/Reducers';
import moment from 'moment';
import {useTranslation} from 'react-i18next';

type Props = ReduxProps;

interface ActivitySummary {
  rank: any;
  nextRankExp: any;
  todayExp: any;
  totalExp: any;
  todayCompletedTasks: any;
  todayUncompletedTasks: any;
  totalCompletedTasks: any;
}

const ActivityScreen: React.FC<Props> = props => {
  const {t} = useTranslation();
  const {Common, Gutters, Layout, Images, Colors, Fonts} = useTheme();

  const {
    _getUserActivity,
    _getCompletedTask,
    _getUncompletedTask,
    _getActivitySummary,
    loadingUncompletedTask,
    loadingCompletedTask,
    loadingActivity,
    loadingActivitySummary,
  } = props;

  const [loading, setLoading] = useState(false);
  const [activityList, setActivityList] = useState([]);
  const [completedTaskList, setCompletedTaskList] = useState([]);
  const [unCompletedTaskList, setUncompletedTaskList] = useState([]);
  const [activitySummaryUser, setActivitySummaryUser] =
    useState<ActivitySummary>({
      rank: null,
      nextRankExp: null,
      todayExp: null,
      totalExp: null,
      todayCompletedTasks: null,
      todayUncompletedTasks: null,
      totalCompletedTasks: null,
    });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      Promise.all([
        _getUserActivity(),
        _getCompletedTask(),
        _getUncompletedTask(),
        _getActivitySummary(),
      ]).then((res: any) => {
        setLoading(false);
        setActivityList(res[0]?.activities);
        setCompletedTaskList(res[1]?.completedTasks);
        setUncompletedTaskList(res[2]?.uncompletedTasks);
        setActivitySummaryUser(res[3]?.expSummary);
      });
    };
    fetchData();
  }, []);

  const renderTreasureExpired = () => {
    return (
      <>
        <Text variant="semibold"> {t('earnScreen.treasureExpired')}</Text>
        <Text color={Colors.neutral[400]}>
          {t('earnScreen.makeTransactionAndCompleteMission')}
        </Text>
        <View style={Gutters.smallTMargin}>
          <TreasureCard disabled={true} />
        </View>
      </>
    );
  };

  const CardActivity = ({title, value}: any) => {
    return (
      <View style={[Layout.rowHCenter, Layout.scrollSpaceBetween]}>
        <Text color={Colors.secondary[700]}>{title}</Text>
        <Text>{value}</Text>
      </View>
    );
  };

  const renderActivity = () => {
    return (
      <>
        <View
          style={[
            Layout.rowHCenter,
            Layout.scrollSpaceBetween,
            Layout.alignItemsCenter,
            Gutters.smallBPadding,
            {borderBottomWidth: 1, borderColor: Colors.neutral[200]},
          ]}>
          <View style={[Layout.rowHCenter]}>
            <FastImage
              source={Images.discover.user}
              style={{width: 40, height: 40}}
              resizeMode="contain"
            />
            <View style={[Gutters.smallLMargin]}>
              <Text variant="semibold">Prabu Firgantoro</Text>
              <Text size="xs">@prabufirgan</Text>
            </View>
          </View>
          <View style={Layout.alignItemsCenter}>
            <FastImage
              source={Images.earn.award}
              style={{width: 20, height: 20}}
              resizeMode="contain"
            />
            <Text variant="semibold" color={Colors.secondary[600]}>
              {`Rank ${activitySummaryUser?.rank}th`}
            </Text>
          </View>
        </View>
        <View style={[Gutters.smallTPadding]}>
          <ProgressBarPlain
            height={8}
            backgroundColor={'grey'}
            completedColor={Colors.secondary[500]}
            percentage={`${String(
              (activitySummaryUser?.totalExp /
                activitySummaryUser?.nextRankExp) *
                100,
            )}%`}
            leftNumber={activitySummaryUser?.totalExp}
            rightNumber={activitySummaryUser?.nextRankExp}
            topRightNumber={activitySummaryUser?.rank - 1}
          />
          <View>
            <CardActivity
              title={t('earnScreen.todayXp')}
              value={activitySummaryUser?.todayExp}
            />
            <CardActivity
              title={t('earnScreen.totalXp')}
              value={activitySummaryUser?.totalExp}
            />
            <CardActivity
              title={t('earnScreen.todayCompleteTask')}
              value={activitySummaryUser?.todayCompletedTasks}
            />
            <CardActivity
              title={t('earnScreen.todayUncompleteTask')}
              value={activitySummaryUser?.todayUncompletedTasks}
            />
            <CardActivity
              title={t('earnScreen.totalCompleteTask')}
              value={activitySummaryUser?.totalCompletedTasks}
            />
          </View>
        </View>
      </>
    );
  };

  const renderEmptyTask = () => {
    return (
      <View style={[{alignItems: 'center'}, Gutters.smallTMargin]}>
        <FastImage
          source={Images.earn.empty}
          style={{width: 180, height: 180}}
          resizeMode="contain"
        />
        <View style={[Layout.alignItemsCenter, Gutters.smallTMargin]}>
          <Text variant="semibold" size="base">
            {t('earnScreen.greatJob')}
          </Text>
          <Text variant="semibold" color={Colors.neutral[400]}>
            {t('earnScreen.noUncompleteTask')}
          </Text>
        </View>
      </View>
    );
  };

  const renderList = ({item, i}: any) => {
    return (
      <ActivityCard
        name={item?.name}
        key={i}
        date={moment(item?.Date).format('DD/MM/YYYY')}
        max={item?.isMax}
        exp={item?.exp}
        count={item?.count ? item?.count : item?.detail?.length}
      />
    );
  };

  return (
    <Container>
      <HeaderTitle title={t('earnScreen.allActivity')} />
      <Content contentContainerStyle={[]} showsVerticalScrollIndicator={false}>
        {loading ? (
          <View style={Gutters.smallTMargin}>
            <ActivityIndicator size="large" color={Colors.secondary[600]} />
          </View>
        ) : (
          <>
            <View
              style={[
                Common.backgroundLayout,
                Gutters.regularPadding,
                Gutters.smallTMargin,
              ]}>
              {renderActivity()}
            </View>
            <View
              style={[
                Common.backgroundLayout,
                Gutters.regularPadding,
                Gutters.smallTMargin,
              ]}>
              <Text size="base" variant="semibold">
                {t('earnScreen.allActivity')}
              </Text>
              <View style={Gutters.tinyPadding}>
                <FlatList
                  data={activityList}
                  keyExtractor={(item, index) => 'key' + index}
                  renderItem={renderList}
                  showsVerticalScrollIndicator={false}
                />
              </View>
            </View>
            <View
              style={[
                Common.backgroundLayout,
                Gutters.regularPadding,
                Gutters.smallTMargin,
              ]}>
              <Text size="base" variant="semibold">
                {t('earnScreen.todayUncompleteTask')}
              </Text>
              {/* <View style={Gutters.tinyPadding}>{renderEmptyTask()}</View> */}
              <View style={Gutters.tinyPadding}>
                <FlatList
                  data={unCompletedTaskList}
                  keyExtractor={(item, index) => 'key' + index}
                  renderItem={renderList}
                  showsVerticalScrollIndicator={false}
                />
              </View>
            </View>
            <View
              style={[
                Common.backgroundLayout,
                Gutters.regularPadding,
                Gutters.smallTMargin,
              ]}>
              <Text size="base" variant="semibold">
                {t('earnScreen.todayCompleteTask')}
              </Text>
              <View style={Gutters.tinyPadding}>
                <FlatList
                  data={completedTaskList}
                  keyExtractor={(item, index) => 'key' + index}
                  renderItem={renderList}
                  showsVerticalScrollIndicator={false}
                />
              </View>
            </View>
          </>
        )}
      </Content>
    </Container>
  );
};

const mapStateToProps = ({earn}: RootState) => ({
  loadingActivity: earn.loadingActivity,
  loadingCompletedTask: earn.loadingCompletedTask,
  loadingUncompletedTask: earn.loadingUncompletedTask,
  loadingActivitySummary: earn.loadingActivitySummary,
});
const mapDispatchToProps = {
  _getUserActivity: getUserActivity,
  _getCompletedTask: getCompletedTask,
  _getUncompletedTask: getUncompletedTask,
  _getActivitySummary: getActivitySummary,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(ActivityScreen);
