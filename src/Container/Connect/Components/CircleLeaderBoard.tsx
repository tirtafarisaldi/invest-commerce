import * as React from 'react';
import {Image, View} from 'react-native';
import {useTranslation} from 'react-i18next';

import useTheme from '@Hooks/useTheme';
import LeaderBoardCarousel from './LeaderBoardCarousel';

import CardHeader from './CardHeader';
import {LEADERBOARD_CIRCLE_LIST_DATA} from '@Container/Connect/Fixtures/CircleListData';

const CircleLeaderBoard = () => {
  const {t} = useTranslation();
  const {Gutters, Colors} = useTheme();
  return (
    <View
      style={{
        ...Gutters.smallPadding,
        ...Gutters.smallTMargin,
        backgroundColor: Colors.neutral[100],
      }}>
      <CardHeader
        title={t('connect.circleLeaderBoard')}
        description={t('connect.circleLeaderBoardDesc')}
        iconTitle={
          <Image source={require('src/Assets/Images/ranks-frame.png')} />
        }
      />
      <LeaderBoardCarousel data={LEADERBOARD_CIRCLE_LIST_DATA} />
    </View>
  );
};

export default CircleLeaderBoard;