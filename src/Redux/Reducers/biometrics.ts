import {ACTION_TYPES} from '../constants/actionTypes';

// THIS STATE IS USED FOR SAVING CREDENTIAL TO BE OVERRIDDEN BY BIOMETRICS
// SINCE BE DOES NOT PROVIDE ANY API
// BY ENROLLING BIOMETRICS, USER CAN GET SAVED CREDENTIAL

export interface IBiometricsState {
  phoneNumber: string;
  password: string;
  pin: string;
  publicKey: string;
}
const initialState: IBiometricsState = {
  phoneNumber: '',
  password: '',
  pin: '',
  publicKey: '',
};

export default (
  state: IBiometricsState = initialState,
  {type, payload}: {type: string; payload: Partial<IBiometricsState>},
): IBiometricsState => {
  switch (type) {
    case ACTION_TYPES.BIOMETRICS.SAVE_CREDENTIAL:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};
