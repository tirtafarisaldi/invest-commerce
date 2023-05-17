import {ACTION_TYPES} from '../constants/actionTypes';
import {ParamListBase, RouteProp} from '@react-navigation/native';

type NavState = {
  routes: RouteProp<ParamListBase>[];
  navigation: any;
};
export interface MainState {
  navState: NavState;
}

const initialState: MainState = {
  navState: {
    routes: [],
    navigation: {},
  },
};

export default (
  state: MainState = initialState,
  {type, payload}: {type: string; payload: Partial<MainState>},
) => {
  switch (type) {
    case ACTION_TYPES.MAIN.SET_NAVIGATION_STATE:
      return {
        ...state,
        navState: {
          ...state.navState,
          ...payload,
        },
      };

    default:
      return state;
  }
};
