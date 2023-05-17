import {ThemeState} from '../Actions/theme';
import {ACTION_TYPES} from '../constants/actionTypes';

const initialState: ThemeState = {
  theme: 'default',
  darkMode: null,
};

export default (
  state = initialState,
  {type, payload}: {type: string; payload: Partial<ThemeState>},
) => {
  switch (type) {
    case ACTION_TYPES.THEME.CHANGE_THEME:
      if (typeof payload.theme !== 'undefined') {
        state.theme = payload.theme;
      }
      if (typeof payload.darkMode !== 'undefined') {
        state.darkMode = payload.darkMode;
      }
      return {
        ...state,
      };
    case ACTION_TYPES.THEME.SET_DEFAULT_THEME:
      if (!state.theme) {
        if (typeof payload.theme !== 'undefined') {
          state.theme = payload.theme;
        }
        if (typeof payload.darkMode !== 'undefined') {
          state.darkMode = payload.darkMode;
        }
      }
      return {
        ...state,
      };
    default:
      return state;
  }
};
