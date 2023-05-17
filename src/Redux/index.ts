import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  applyMiddleware,
  compose,
  legacy_createStore as createStore,
} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import thunk from 'redux-thunk';
import appReducers, {RootState} from './Reducers';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  version: 0,
  whitelist: ['auth', 'main', 'earn', 'user', 'biometrics'],
  timeout: 0,
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const pReducers = persistReducer<RootState>(persistConfig, appReducers);

const store = createStore(pReducers, composeEnhancers(applyMiddleware(thunk)));

const persistor = persistStore(store);

export {store, persistor};
