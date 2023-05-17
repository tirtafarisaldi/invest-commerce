import Axios, {AxiosError, AxiosRequestConfig} from 'axios';
import {store} from 'src/Redux';

import {BASE_URL} from '../BaseURL';
import i18n from 'src/Translations';
import {showToast} from '@Utils/toastHandler';
import {logout, refreshToken} from '@Actions/auth';
import {ACTION_TYPES} from 'src/Redux/constants/actionTypes';
import {navigateAndSimpleReset} from '@Navigators/utils';

const instance = Axios.create({
  baseURL: BASE_URL,
});

instance.interceptors.request.use(
  (config: any) => {
    // TODO: update token and fcmToken generated from BE
    const state = store.getState();
    const {accessToken} = state.auth;

    // const fcmToken = state.persisted.fcmToken;
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
    // config.headers['fcm-token'] = `${fcmToken}`;

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  response => {
    return Promise.resolve(response);
  },
  error => {
    const {t} = i18n;
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };
    console.log(
      `${originalRequest._retry ? 'Retried' : ''}Error ${
        error.response.status
      }: ${originalRequest.method?.toUpperCase()} ${originalRequest.baseURL}${
        originalRequest.url
      }`,
    );
    // Pass bypassInterceptors: true on request headers
    if (originalRequest.headers?.bypassInterceptors)
      return Promise.reject(error);

    if (Axios.isAxiosError(error) && error.response) {
      // The request was made and the server responded with a status code
      if (error.response.status === 401 || error.response.status === 403) {
        const {refreshTokenOnExpire} = store.getState().auth;
        // If user not check on login, or request retried already
        if (!refreshTokenOnExpire || originalRequest._retry) {
          store.dispatch({type: ACTION_TYPES.AUTH.LOGOUT});
          navigateAndSimpleReset('OnboardingScreen');
          setTimeout(
            () => showToast('errorMessage.sessionTimeout', 'info'),
            500,
          );
        } else {
          // Retry request with new token and mark it
          originalRequest._retry = true;
          refreshToken().then(payload => {
            store.dispatch({type: ACTION_TYPES.AUTH.REFRESH_TOKEN, payload});
            originalRequest.headers!!.Authorization = `Bearer ${payload.accessToken}`;
            return http(originalRequest);
          });
        }
      } else if (error.response.status === 500) {
        // Error from server
        showToast(t('errorMessage.unknownError'));
      }
      return Promise.reject(error);
    } else if (Axios.isAxiosError(error) && error.request) {
      // The request was made but no response was received
      console.log('net err', error);
      showToast(
        t('errorMessage.networkError'),
        'error',
        t('errorMessage.checkYourConnection'),
      );
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('unknown err', error);
      showToast(t('errorMessage.unknownError'));
    }
  },
);

export const http = instance;
