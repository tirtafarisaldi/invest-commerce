import {AnyAction, Dispatch} from 'redux';
import {ACTION_TYPES} from '../constants/actionTypes';
import {IBiometricsState} from '../Reducers/biometrics';

export const saveCredential =
  (payload: Partial<IBiometricsState>) => (dispatch: Dispatch<AnyAction>) => {
    dispatch({type: ACTION_TYPES.BIOMETRICS.SAVE_CREDENTIAL, payload});
  };
