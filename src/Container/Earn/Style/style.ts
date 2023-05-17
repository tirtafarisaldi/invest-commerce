import {Dimensions, StyleSheet} from 'react-native';
import {ThemeVariables} from '@Theme/theme';

export const {width, height} = Dimensions.get('window');

const earnStyle = StyleSheet.create({
  ninetyWidth: {
    width: '90%',
  },
  topThirty: {marginTop: 30},
  progressBarWrap: {
    width: '95%',
    height: 8,
    marginVertical: 10,
    borderRadius: 5,
    top: -8,
  },
  topProgressBar: {
    marginVertical: 10,
    borderRadius: 5,
    position: 'absolute',
    bottom: 1,
    top: -7,
  },
  progressBarContent: {
    height: 35,
    width: 35,
    borderRadius: 99,
    top: -40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressBarIcon: {height: 20, width: 20, borderRadius: 99},
  minusTopAndCenter: {marginTop: -30, alignItems: 'center'},
  rewardsCardWrap: {
    borderRadius: 12,
    backgroundColor: '#F9F9F9',
    borderWidth: 1,
  },
  eightyWidth: {width: '80%'},
  treasureCardWrap: {
    height: 140,
    flexDirection: 'column',
    justifyContent: 'center',
    width: '92.5%',
  },
  roundFifty: {
    width: '50%',
    borderRadius: 99,
    paddingVertical: 3,
  },
});

export {earnStyle};
