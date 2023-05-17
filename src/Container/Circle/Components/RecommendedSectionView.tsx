/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {View} from 'react-native';
import {useDispatch} from 'react-redux';
import Icon from '@Atom/Icon';
import Text from '@Atom/Text';
import Separator from '@Atom/Separator';
import {Colors} from '@Theme/Variables';
import CirclePostCardView from './CirclePostCardView';
import {ACTION_TYPES} from 'src/Redux/constants/actionTypes';

const RecommendedSectionView = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch({
      type: ACTION_TYPES.CIRCLE.SHOW_FLOATING_CREATE_POST,
      payload: {
        showFloatingCreatePost: false,
      },
    });
  }, [dispatch]);

  return (
    <>
      <View
        style={{
          backgroundColor: 'white',
          paddingHorizontal: 16,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Icon color={Colors.neutral[300]} name="pin-2" />
          <Text color={Colors.neutral[300]} text="Pinned Post" />
        </View>
        <Separator
          variant="horizontal"
          size={{
            height: 2,
          }}
          margin={12}
        />
      </View>
      <CirclePostCardView />
    </>
  );
};

export default RecommendedSectionView;
