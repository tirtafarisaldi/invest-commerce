import {ACTION_TYPES} from '../constants/actionTypes';

export interface ProcessState {
  loading: boolean;
  success: boolean;
  failed: boolean;
}
export interface AuthState {
  loginProcess: ProcessState;
  forgotPasswordProcess: ProcessState;
  requestOtpProcess: ProcessState;
  verifyOtpProcess: ProcessState;
  createPasswordProcess: ProcessState;
  errorLogin: any;
  errorForgotPassword: any;
  errorRequestOtp: any;
  errorVerifyOtp: any;
  errorCreatePassword: any;
  isLogin: boolean;
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  refreshTokenOnExpire: boolean;
}

const initialState: AuthState = {
  loginProcess: {
    loading: false,
    success: false,
    failed: false,
  },
  forgotPasswordProcess: {
    loading: false,
    success: false,
    failed: false,
  },
  requestOtpProcess: {
    loading: false,
    success: false,
    failed: false,
  },
  verifyOtpProcess: {
    loading: false,
    success: false,
    failed: false,
  },
  createPasswordProcess: {
    loading: false,
    success: false,
    failed: false,
  },
  errorLogin: null,
  errorForgotPassword: null,
  errorRequestOtp: null,
  errorVerifyOtp: null,
  errorCreatePassword: null,
  isLogin: false,
  accessToken: '',
  refreshToken: '',
  expiresAt: 0,
  refreshTokenOnExpire: false,
};

export default (
  state: AuthState = initialState,
  {type, payload}: {type: string; payload: Partial<AuthState>},
): AuthState => {
  switch (type) {
    case ACTION_TYPES.AUTH.LOGIN_START:
      return {
        ...state,
        loginProcess: {
          loading: true,
          success: false,
          failed: false,
        },
        errorLogin: null,
      };
    case ACTION_TYPES.AUTH.LOGIN_FAILED:
      return {
        ...state,
        loginProcess: {
          loading: false,
          success: false,
          failed: false,
        },
        ...payload,
      };
    case ACTION_TYPES.AUTH.LOGIN_SUCCESS:
      return {
        ...state,
        loginProcess: {
          loading: false,
          success: true,
          failed: false,
        },
        errorLogin: null,
        isLogin: true,
        ...payload,
      };
    case ACTION_TYPES.AUTH.FORGOT_PASSWORD_START:
      return {
        ...state,
        forgotPasswordProcess: {
          loading: true,
          success: false,
          failed: false,
        },
        errorForgotPassword: null,
      };
    case ACTION_TYPES.AUTH.FORGOT_PASSWORD_FAILED:
      return {
        ...state,
        forgotPasswordProcess: {
          loading: false,
          success: false,
          failed: false,
        },
        ...payload,
      };
    case ACTION_TYPES.AUTH.FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        forgotPasswordProcess: {
          loading: false,
          success: true,
          failed: false,
        },
      };
    case ACTION_TYPES.AUTH.REQUEST_OTP_START:
      return {
        ...state,
        verifyOtpProcess: initialState.forgotPasswordProcess,
        requestOtpProcess: {
          loading: true,
          success: false,
          failed: false,
        },
        errorVerifyOtp: null,
      };
    case ACTION_TYPES.AUTH.REQUEST_OTP_FAILED:
      return {
        ...state,
        requestOtpProcess: {
          loading: false,
          success: false,
          failed: true,
        },
        ...payload,
      };
    case ACTION_TYPES.AUTH.REQUEST_OTP_SUCCESS:
      return {
        ...state,
        requestOtpProcess: {
          loading: false,
          success: true,
          failed: false,
        },
        errorRequestOtp: null,
        ...payload,
      };
    case ACTION_TYPES.AUTH.VERIFY_OTP_START:
      return {
        ...state,
        forgotPasswordProcess: initialState.forgotPasswordProcess,
        verifyOtpProcess: {
          loading: true,
          success: false,
          failed: false,
        },
        errorVerifyOtp: null,
      };
    case ACTION_TYPES.AUTH.VERIFY_OTP_FAILED:
      return {
        ...state,
        verifyOtpProcess: {
          loading: false,
          success: false,
          failed: true,
        },
        ...payload,
      };
    case ACTION_TYPES.AUTH.VERIFY_OTP_SUCCESS:
      return {
        ...state,
        verifyOtpProcess: {
          loading: false,
          success: true,
          failed: false,
        },
        errorVerifyOtp: null,
        ...payload,
      };
    case ACTION_TYPES.AUTH.CREATE_PASSWORD_START:
      return {
        ...state,
        createPasswordProcess: {
          loading: true,
          success: false,
          failed: false,
        },
        errorCreatePassword: null,
      };
    case ACTION_TYPES.AUTH.CREATE_PASSWORD_FAILED:
      return {
        ...state,
        createPasswordProcess: {
          loading: false,
          success: false,
          failed: true,
        },
        ...payload,
      };
    case ACTION_TYPES.AUTH.CREATE_PASSWORD_SUCCESS:
      return {
        ...state,
        createPasswordProcess: {
          loading: false,
          success: true,
          failed: false,
        },
        errorCreatePassword: null,
        ...payload,
      };
    case ACTION_TYPES.AUTH.RESET_AUTH_PROCESS:
      return {
        ...state,
        loginProcess: initialState.loginProcess,
        forgotPasswordProcess: initialState.forgotPasswordProcess,
        verifyOtpProcess: initialState.verifyOtpProcess,
        createPasswordProcess: initialState.createPasswordProcess,
      };
    case ACTION_TYPES.AUTH.RESET_AUTH_ERROR_MESSAGE:
      return {
        ...state,
        errorLogin: null,
        errorCreatePassword: null,
        errorForgotPassword: null,
        errorVerifyOtp: null,
        // another error here
      };
    case ACTION_TYPES.AUTH.REFRESH_TOKEN:
      return {
        ...state,
        ...payload,
      };
    case ACTION_TYPES.AUTH.LOGOUT:
      return initialState;
    default:
      return state;
  }
};
