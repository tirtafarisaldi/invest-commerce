import {http} from '@Services/API/http';
import Endpoints from '@Services/API/endpoint';
import {Dispatch, AnyAction} from 'redux';
import {ACTION_TYPES} from '../constants/actionTypes';

export const fetchMyProfile = () => (dispatch: Dispatch<AnyAction>) => {
  const path = Endpoints.user.profile;

  dispatch({type: ACTION_TYPES.USER.FETCH_PROFILE_START});

  return new Promise((resolve, reject) => {
    http
      .get(path)
      .then(res => {
        console.log('fetch profile', res.data);

        dispatch({
          type: ACTION_TYPES.USER.FETCH_PROFILE_SUCCESS,
          payload: {profileData: res.data},
        });
        resolve(res.data);
      })
      .catch(err => {
        console.log('err profile', err.response);

        dispatch({
          type: ACTION_TYPES.USER.FETCH_PROFILE_FAILED,
          payload: err?.data?.message,
        });
        reject(err);
      });
  });
};

export const fetchUserProfileById =
  (id: string) => (dispatch: Dispatch<AnyAction>) => {
    const path = `${Endpoints.user.profile}/${id}`;

    dispatch({type: ACTION_TYPES.USER.FETCH_PROFILE_START});

    return new Promise((resolve, reject) => {
      http
        .get(path)
        .then(res => {
          dispatch({
            type: ACTION_TYPES.USER.FETCH_PROFILE_SUCCESS,
            payload: {otherProfileData: res.data},
          });
          resolve(res.data);
        })
        .catch(err => {
          dispatch({
            type: ACTION_TYPES.USER.FETCH_PROFILE_FAILED,
            payload: err?.data?.message,
          });
          reject(err);
        });
    });
  };
