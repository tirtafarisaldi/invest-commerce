import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import {LoginManager} from 'react-native-fbsdk-next';
import {http} from '@Services/API/http';
import Endpoints from '@Services/API/endpoint';
import {Dispatch, AnyAction} from 'redux';
import {ACTION_TYPES} from '../constants/actionTypes';
import {RootState} from '../Reducers';
import {navigateAndSimpleReset} from '@Navigators/utils';
import {fetchMyProfile} from './user';
import {getTierUser} from './earn';
const {GET_AVATAR_MALE, GET_AVATAR_FEMALE} = ACTION_TYPES.AUTH;

export const setIsLogin = (payload: any) => ({
  type: ACTION_TYPES.AUTH.SET_IS_LOGIN,
  payload,
});

export const getAvatarListMale = () => (dispatch: Dispatch<AnyAction>) => {
  const path = Endpoints.avatar.male;

  dispatch({type: GET_AVATAR_MALE});
  return new Promise((resolve, reject) => {
    http
      .get(path)
      .then(res => {
        dispatch({type: GET_AVATAR_MALE, payload: res.data.avatars});
        resolve(res.data.avatars);
      })
      .catch(err => {
        console.log('error', err);
      });
  });
};

export const getAvatarListFemale = () => (dispatch: Dispatch<AnyAction>) => {
  const path = Endpoints.avatar.female;

  dispatch({type: GET_AVATAR_FEMALE});
  return new Promise((resolve, reject) => {
    http
      .get(path)
      .then(res => {
        dispatch({type: GET_AVATAR_FEMALE, payload: res.data.avatars});
        resolve(res.data.avatars);
      })
      .catch(err => {
        console.log('error', err);
      });
  });
};

export const validatePhone = (phone: string) => {
  console.log(phone);

  const path = `${Endpoints.validate.phone}?phone=${phone.replace('+', '')}`;

  return new Promise((resolve, reject) => {
    http
      .get(path)
      .then(res => {
        resolve(res.status);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const validateEmail = (email: string) => {
  const path = `${Endpoints.validate.email}?email=${email.toLowerCase()}`;
  return new Promise((resolve, reject) => {
    http
      .get(path)
      .then(res => {
        resolve(res.status);
      })
      .catch(err => {
        console.log(err, 'error');
        reject(err);
      });
  });
};

export const validateSeedsTag = (seedsTag: string) => {
  const path = `${
    Endpoints.validate.seedsTag
  }?seeds-tag=${seedsTag.toLowerCase()}`;

  return new Promise((resolve, reject) => {
    http
      .get(path)
      .then(res => {
        resolve(res.status);
      })
      .catch(err => {
        console.log(err, 'error');
        reject(err);
      });
  });
};

export const validateRefCode = (refCode: string) => {
  const path = `${
    Endpoints.validate.refCode
  }?ref-code=${refCode.toLowerCase()}`;

  console.log(refCode);

  return new Promise((resolve, reject) => {
    http
      .get(path)
      .then(res => {
        resolve(res.status);
      })
      .catch(err => {
        console.log(err, 'error');
        reject(err);
      });
  });
};

export const sendOTP =
  (phone: string, method: 'whatsapp' | 'sms' = 'whatsapp') =>
  (dispatch: Dispatch<AnyAction>) => {
    const path = Endpoints.otp.sendOTP;

    const body = {
      phoneNumber: phone.replace('+', ''),
      method: method,
    };

    dispatch({type: ACTION_TYPES.AUTH.REQUEST_OTP_START});
    return new Promise((resolve, reject) => {
      http
        .put(path, body, {headers: {bypassInterceptors: true}})
        .then(res => {
          console.log(res.data.otp);
          dispatch({
            type: ACTION_TYPES.AUTH.REQUEST_OTP_SUCCESS,
          });
          resolve(res.data.otp);
        })
        .catch(err => {
          console.log(err, 'error');
          dispatch({
            type: ACTION_TYPES.AUTH.REQUEST_OTP_FAILED,
            payload: {errorVerifyOtp: err?.data?.message},
          });
          reject(err);
        });
    });
  };

export const verifyOTP = (
  phone: string,
  method: 'whatsapp' | 'sms',
  otp: string,
) => {
  const path = `${Endpoints.otp.verify}/${method}`;

  const body = {
    msisdn: phone.replace('+', ''),
    otp: otp,
  };

  return new Promise((resolve, reject) => {
    http
      .post(path, body)
      .then(res => {
        resolve(res.status);
      })
      .catch(err => {
        console.log(err, 'errpr');
        const statusCode = parseInt(err.message.split(' ').pop());
        reject(statusCode);
      });
  });
};

export const dispatchVerifyOTP =
  (phone: string, method: 'whatsapp' | 'sms', otp: string) =>
  (dispatch: Dispatch<AnyAction>) => {
    const path = `${Endpoints.otp.verify}/${method}`;
    const body = {
      msisdn: phone.replace('+', ''),
      otp,
    };

    dispatch({type: ACTION_TYPES.AUTH.VERIFY_OTP_START});
    return new Promise((resolve, reject) => {
      http
        .post(path, body)
        .then(res => {
          dispatch({type: ACTION_TYPES.AUTH.VERIFY_OTP_SUCCESS});
          resolve(res.status);
        })
        .catch(err => {
          dispatch({
            type: ACTION_TYPES.AUTH.VERIFY_OTP_FAILED,
            payload: {errorVerifyOtp: 'wrongOtp'},
          });
          reject(err);
        });
    });
  };

export const createAccount = (input: any) => {
  let path = Endpoints.auth.register;

  console.log(path);

  const body = {
    phoneNumber: input.countryCode.replace('+', '') + input.phoneNumber,
    email: input.email.toLowerCase(),
    birthDate: input.birthday,
    name: input.name,
    seedsTag: input.seedsTag.toLowerCase(),
    refCode: input.referralCode,
    password: input.newPassword,
    avatar: input.avatar,
  };

  console.log(body);

  return new Promise((resolve, reject) => {
    http
      .post(path, body)
      .then(res => {
        console.log(res);
        resolve(res);
      })
      .catch(err => {
        console.log(err, 'error on actions');
        reject(err);
      });
  });
};

export const loginPhoneNumber =
  (phoneNumber: string, password: string, checkKeepLogin: boolean = false) =>
  (dispatch: Dispatch<any>) => {
    const path = Endpoints.auth.loginPhone;
    const body = {
      phoneNumber: phoneNumber.replace('+', ''),
      password,
    };

    dispatch({type: ACTION_TYPES.AUTH.LOGIN_START});
    return new Promise((resolve, reject) => {
      http
        .post(path, body)
        .then(res => {
          dispatch({
            type: ACTION_TYPES.AUTH.LOGIN_SUCCESS,
            payload: {...res.data, refreshTokenOnExpire: checkKeepLogin},
          });
          dispatch(getTierUser());
          dispatch(fetchMyProfile());
          navigateAndSimpleReset('HomeScreen');
          resolve(res.data);
        })
        .catch((err: any) => {
          let message: string = err?.data?.message || '';
          if (message.includes('wrong phone number or password')) {
            message = 'wrongPhoneOrPassword';
          }
          dispatch({
            type: ACTION_TYPES.AUTH.LOGIN_FAILED,
            payload: {errorLogin: message},
          });
          reject(err);
        });
    });
  };

export const loginOauth =
  (
    channel: 'google' | 'facebook' | 'apple',
    identifier: string,
    callbackFailed?: () => void,
  ) =>
  async (dispatch: Dispatch<any>) => {
    const path = `${Endpoints.auth.loginOauth}/${channel}`;
    const body = {
      identifier,
    };

    dispatch({type: ACTION_TYPES.AUTH.LOGIN_START});
    return new Promise((resolve, reject) => {
      http
        .post(path, body)
        .then(res => {
          dispatch({type: ACTION_TYPES.AUTH.LOGIN_SUCCESS, payload: res.data});
          dispatch(getTierUser());
          dispatch(fetchMyProfile());
          navigateAndSimpleReset('HomeScreen');
          resolve(res.data);
        })
        .catch(err => {
          dispatch({
            type: ACTION_TYPES.AUTH.LOGIN_FAILED,
            payload: {errorLogin: err?.data?.message},
          });
          callbackFailed?.();
          reject(err);
        });
    });
  };

export const requestForgotPassword =
  (
    via: 'phone' | 'email',
    phoneOrEmail: string,
    otpMethod: 'whatsapp' | 'sms' = 'whatsapp',
  ) =>
  async (dispatch: Dispatch<any>) => {
    const validatePath =
      via === 'email'
        ? `${Endpoints.validate.email}?email=${phoneOrEmail.toLowerCase()}`
        : `${Endpoints.validate.phone}?phone=${phoneOrEmail.replace('+', '')}`;
    const forgotPassPath = Endpoints.email.forgotPasswordEmail;
    const forgotPassBody = {
      email: phoneOrEmail.toLowerCase(),
    };

    dispatch({type: ACTION_TYPES.AUTH.FORGOT_PASSWORD_START});

    return new Promise((resolve, reject) => {
      http
        .get(validatePath)
        .then(res => {
          if (res.status === 204) {
            // http 204 here means phone number / email is not registered
            dispatch({
              type: ACTION_TYPES.AUTH.FORGOT_PASSWORD_FAILED,
              payload: {
                errorForgotPassword: `${via}NotRegistered`,
              },
            });
          }
          resolve(res.data);
        })
        .catch(err => {
          if (err?.response?.status === 409) {
            // http 409 here means phone number / email is registered
            dispatch({type: ACTION_TYPES.AUTH.FORGOT_PASSWORD_SUCCESS});
            if (via === 'phone') {
              dispatch(sendOTP(phoneOrEmail.replace('+', ''), otpMethod));
              resolve('Email registered');
            } else {
              http
                .post(forgotPassPath, forgotPassBody)
                .then(res => {
                  resolve(res);
                })
                .catch(err => console.log('err sennd email', err.response));
            }
          } else {
            dispatch({
              type: ACTION_TYPES.AUTH.FORGOT_PASSWORD_FAILED,
              payload: {
                errorForgotPassword: err?.data?.message,
              },
            });
            reject(err);
          }
        });
    });
  };

export const changePassword =
  (
    via: 'email' | 'phone',
    phoneOrEmail: string,
    password: string,
    confirmPassword: string,
  ) =>
  (dispatch: Dispatch<AnyAction>) => {
    const path = Endpoints.user.changePassword;
    const body: any = {
      password,
    };
    via === 'email'
      ? (body.email = phoneOrEmail)
      : (body.phoneNumber = phoneOrEmail.replace('+', ''));

    dispatch({type: ACTION_TYPES.AUTH.CREATE_PASSWORD_START});
    return new Promise((resolve, reject) => {
      http
        .patch(path, body)
        .then(res => {
          dispatch({type: ACTION_TYPES.AUTH.CREATE_PASSWORD_SUCCESS});
          resolve(res.status);
        })
        .catch(err => {
          dispatch({
            type: ACTION_TYPES.AUTH.CREATE_PASSWORD_FAILED,
            payload: {errorCreatePassword: err?.data?.message},
          });
          reject(err);
        });
    });
  };

export const refreshToken = (): Promise<ILogin> => {
  return new Promise((resolve, reject) => {
    // TODO: call api and return new object containing new token and refresh token
    return resolve({
      accessToken: 'newApiToken',
      refreshToken: 'newRefreshToken',
      expiresAt: 1680765877,
    });
  });
};

export const logout = () => async (dispatch: Dispatch<AnyAction>) => {
  dispatch({type: ACTION_TYPES.AUTH.LOGOUT});
  GoogleSignin.signOut(); // logout google
  LoginManager.logOut(); // logout fb
  navigateAndSimpleReset('OnboardingScreen');
  // apparently not needed for apple
  // appleAuth.performRequest({
  //   requestedOperation: appleAuth.Operation.LOGOUT,
  // });
};

export const resetErrorMessage =
  () => async (dispatch: Dispatch<AnyAction>) => {
    dispatch({type: ACTION_TYPES.AUTH.RESET_AUTH_ERROR_MESSAGE});
  };

export const resetProcess = () => async (dispatch: Dispatch<AnyAction>) => {
  dispatch({type: ACTION_TYPES.AUTH.RESET_AUTH_PROCESS});
};
