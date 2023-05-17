/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {View} from 'react-native';
import {useDispatch} from 'react-redux';
import Text from '@Atom/Text';
import {Colors} from '@Theme/Variables';
import {ACTION_TYPES} from 'src/Redux/constants/actionTypes';

const dummies = [
  {
    title: 'About this circle',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
  },
  {
    title: 'Circle Rules',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
  },
  {
    title: 'Circle Hastag',
    description: '#stocks',
  },
];

const AboutSectionView = () => {
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
        {dummies.map(dummy => {
          return (
            <View key={dummy.title}>
              <Text variant="bold" text={dummy.title} />
              <Text
                text={dummy.description}
                color={
                  dummy.description.includes('#')
                    ? Colors.secondary[600]
                    : 'black'
                }
                style={{
                  marginTop: 8,
                  marginBottom: 16,
                }}
              />
            </View>
          );
        })}
      </View>
    </>
  );
};

export default AboutSectionView;
