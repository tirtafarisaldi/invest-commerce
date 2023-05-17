import {Dimensions, StyleSheet} from 'react-native';
import {ThemeVariables} from './theme';

export const {width, height} = Dimensions.get('window');

export default function ({}: ThemeVariables) {
  return StyleSheet.create({
    /* Column Layouts */
    column: {
      flexDirection: 'column',
    },
    columnReverse: {
      flexDirection: 'column-reverse',
    },
    colCenter: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    colVCenter: {
      flexDirection: 'column',
      alignItems: 'center',
    },
    colHCenter: {
      flexDirection: 'column',
      justifyContent: 'center',
    },
    /* Row Layouts */
    row: {
      flexDirection: 'row',
    },
    rowReverse: {
      flexDirection: 'row-reverse',
    },
    rowCenter: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    rowVCenter: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    rowHCenter: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    /* Default Layouts */
    center: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    alignItemsCenter: {
      alignItems: 'center',
    },
    alignItemsStart: {
      alignItems: 'flex-start',
    },
    alignItemsStretch: {
      alignItems: 'stretch',
    },
    justifyContentCenter: {
      justifyContent: 'center',
    },
    justifyContentAround: {
      justifyContent: 'space-around',
    },
    justifyContentBetween: {
      justifyContent: 'space-between',
    },
    justifyContentStart: {
      justifyContent: 'flex-start',
    },
    scrollSpaceAround: {
      flexGrow: 1,
      justifyContent: 'space-around',
    },
    scrollSpaceBetween: {
      flexGrow: 1,
      justifyContent: 'space-between',
    },
    selfStretch: {
      alignSelf: 'stretch',
    },
    /* Sizes Layouts */
    fill: {
      flex: 1,
    },
    fillGutterSmall: {
      alignItems: 'center',
      paddingHorizontal: 15,
    },
    fullSize: {
      height: '100%',
      width: '100%',
    },
    fullWidth: {
      width: '100%',
    },
    fullHeight: {
      height: '100%',
    },
    /* Operation Layout */
    mirror: {
      transform: [{scaleX: -1}],
    },
    rotate90: {
      transform: [{rotate: '90deg'}],
    },
    rotate90Inverse: {
      transform: [{rotate: '-90deg'}],
    },
    smallRound: {
      borderRadius: 10,
    },
    regularRound: {
      borderRadius: 20,
    },
    round: {
      borderRadius: 999,
    },
    smallRoundTopEnd: {
      borderTopRightRadius: 10,
      borderTopLeftRadius: 10,
    },
    regularRoundTopEnd: {
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
    },
    modalBottom: {
      margin: 0,
      justifyContent: 'flex-end',
    },
    iconWrap: {
      borderRadius: 99,
      padding: 8,
    },
    progressBarWrap: {
      width: '100%',
      height: 17,
      marginVertical: 10,
      borderRadius: 10,
      top: -2,
    },
    topProgressBar: {top: -51, flexDirection: 'row'},
    rightProgressBar: {
      padding: 5,
      borderRadius: 99,
      top: -7,
      alignItems: 'center',
    },
  });
}
