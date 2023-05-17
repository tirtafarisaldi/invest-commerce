import {combineReducers} from 'redux';
import {PersistState} from 'redux-persist';

import auth from './auth';
import biometrics from './biometrics';
import discover from './discover';
import earn from './earn';
import main from './main';
import theme from './theme';
import user from './user';
import circle from './circle';

const appReducers = combineReducers({
  auth,
  biometrics,
  circle,
  discover,
  earn,
  main,
  theme,
  user,
});

export type RootState = ReturnType<typeof appReducers> & {
  _persist: PersistState;
};

export default appReducers;
