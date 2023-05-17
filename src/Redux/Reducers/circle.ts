import {ACTION_TYPES} from '../constants/actionTypes';

export interface CircleState {
  showFloatingCreatePost: boolean;
}

const initialState = {
  showFloatingCreatePost: false,
};

export default (
  state: CircleState = initialState,
  {type, payload}: {type: string; payload: Partial<CircleState>},
): CircleState => {
  switch (type) {
    case ACTION_TYPES.CIRCLE.SHOW_FLOATING_CREATE_POST:
      return {
        ...state,
        showFloatingCreatePost: payload.showFloatingCreatePost || false,
      };

    default:
      return state;
  }
};
