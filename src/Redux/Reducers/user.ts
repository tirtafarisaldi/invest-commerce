import {IOtherProfile, IUserProfile} from 'src/Interfaces/APIPayload/User';
import {ACTION_TYPES} from '../constants/actionTypes';
import {ProcessState} from './auth';

interface UserState {
  fetchProfileProcess: ProcessState;
  updateProfileProcess: ProcessState;
  deleteAccountProcess: ProcessState;
  errorFetchProfile: any;
  errorUpdateProfile: any;
  errorDeleteAccount: any;
  profileData: IUserProfile;
  otherProfileData: IOtherProfile;
}

const initialState: UserState = {
  fetchProfileProcess: {
    loading: false,
    success: false,
    failed: false,
  },
  updateProfileProcess: {
    loading: false,
    success: false,
    failed: false,
  },
  deleteAccountProcess: {
    loading: false,
    success: false,
    failed: false,
  },
  errorFetchProfile: null,
  errorUpdateProfile: null,
  errorDeleteAccount: null,
  profileData: {
    id: '',
    phoneNumber: '',
    email: '',
    birthDate: '',
    name: '',
    seedsTag: '',
    refCode: '',
    avatar: '',
    preferredLanguage: '',
    bio: '',
    pin: false,
    followers: 0,
    following: 0,
    posts: 0,
    claims: {
      sub: '',
      phoneNumber: '',
      email: '',
      birthDate: '',
      name: '',
      seedsTag: '',
      refCode: '',
      avatar: '',
      role: '',
      preferredLanguage: '',
      iss: '',
      aud: [],
      exp: 0,
      nbf: 0,
      iat: 0,
    },
  },
  otherProfileData: {
    id: '',
    phoneNumber: '',
    email: '',
    birthDate: '',
    name: '',
    seedsTag: '',
    refCode: '',
    avatar: '',
    role: '',
    preferredLanguage: '',
  },
};

export default (
  state: UserState = initialState,
  {type, payload}: {type: ''; payload: Partial<UserState>},
): UserState => {
  switch (type) {
    case ACTION_TYPES.USER.FETCH_PROFILE_START:
      return {
        ...state,
        fetchProfileProcess: {
          loading: true,
          success: false,
          failed: false,
        },
        errorFetchProfile: null,
      };
    case ACTION_TYPES.USER.FETCH_PROFILE_FAILED:
      return {
        ...state,
        fetchProfileProcess: {
          loading: false,
          success: false,
          failed: true,
        },
        ...payload,
      };
    case ACTION_TYPES.USER.FETCH_PROFILE_SUCCESS:
      return {
        ...state,
        fetchProfileProcess: {
          loading: false,
          success: true,
          failed: false,
        },
        ...payload,
      };
    case ACTION_TYPES.AUTH.LOGOUT:
      return initialState;
    default:
      return state;
  }
};
