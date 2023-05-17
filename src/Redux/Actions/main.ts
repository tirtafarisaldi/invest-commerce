import {ACTION_TYPES} from '../constants/actionTypes';

export const setNavigationState = (payload: any) => ({
  type: ACTION_TYPES.MAIN.SET_NAVIGATION_STATE,
  payload,
});
