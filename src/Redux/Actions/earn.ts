import Endpoints from '@Services/API/endpoint';
import {http} from '@Services/API/http';
import {Dispatch, AnyAction} from 'redux';
import {ACTION_TYPES} from '../constants/actionTypes';
import {RootState} from '../Reducers';
const {ACTIVITY, TASK, TREASURE, TIER} = ACTION_TYPES.EARN;

export const getUserActivity = () => (dispatch: Dispatch<AnyAction>) => {
  const path = Endpoints.earn.activity;

  dispatch({type: ACTIVITY.GET_USER_ACTIVITY_START});
  return new Promise((resolve, reject) => {
    http
      .get(path)
      .then(res => {
        dispatch({type: ACTIVITY.GET_USER_ACTIVITY_SUCCESS, payload: res.data});
        resolve(res.data);
      })
      .catch(err => {
        console.log('error', err.response.data);
        dispatch({type: ACTIVITY.GET_USER_ACTIVITY_FAILED, payload: err});
      });
  });
};

export const getCompletedTask = () => (dispatch: Dispatch<AnyAction>) => {
  const path = Endpoints.earn.completedTask;

  dispatch({type: TASK.GET_COMPLETED_TASK_START});
  return new Promise((resolve, reject) => {
    http
      .get(path)
      .then(res => {
        dispatch({type: TASK.GET_COMPLETED_TASK_SUCCESS, payload: res.data});
        resolve(res.data);
      })
      .catch(err => {
        console.log('erro', err.response.data);
        dispatch({type: TASK.GET_COMPLETED_TASK_FAILED, payload: err});
      });
  });
};

export const getUncompletedTask = () => (dispatch: Dispatch<AnyAction>) => {
  const path = Endpoints.earn.uncompletedTask;

  dispatch({type: TASK.GET_UNCOMPLETED_TASK_START});
  return new Promise((resolve, reject) => {
    http
      .get(path)
      .then(res => {
        dispatch({type: TASK.GET_UNCOMPLETED_TASK_SUCCESS, payload: res.data});
        resolve(res.data);
      })
      .catch(err => {
        console.log('erro', err.response.data);
        dispatch({type: TASK.GET_UNCOMPLETED_TASK_FAILED, payload: err});
      });
  });
};

export const getActivitySummary = () => (dispatch: Dispatch<AnyAction>) => {
  const path = Endpoints.earn.activitySummary;

  dispatch({type: ACTIVITY.GET_ACTIVITY_SUMMARY_START});
  return new Promise((resolve, reject) => {
    http
      .get(path)
      .then(res => {
        dispatch({
          type: ACTIVITY.GET_ACTIVITY_SUMMARY_SUCCESS,
          payload: res.data,
        });
        resolve(res.data);
      })
      .catch(err => {
        console.log('erro', err.response.data);
        dispatch({type: ACTIVITY.GET_ACTIVITY_SUMMARY_FAILED, payload: err});
      });
  });
};

export const getTreasureActive = () => (dispatch: Dispatch<AnyAction>) => {
  const path = Endpoints.earn.treasureActive;

  dispatch({type: TREASURE.GET_TREASURE_ACTIVE_START});
  return new Promise((resolve, reject) => {
    http
      .get(path)
      .then(res => {
        dispatch({
          type: TREASURE.GET_TREASURE_ACTIVE_SUCCESS,
          payload: res.data,
        });
        resolve(res.data);
      })
      .catch(err => {
        console.log('erro', err.response.data);
        dispatch({type: TREASURE.GET_TREASURE_ACTIVE_FAILED, payload: err});
      });
  });
};

export const getTreasureExpired = () => (dispatch: Dispatch<AnyAction>) => {
  const path = Endpoints.earn.treasureExpired;

  dispatch({type: TREASURE.GET_TREASURE_EXPIRED_START});
  return new Promise((resolve, reject) => {
    http
      .get(path)
      .then(res => {
        dispatch({
          type: TREASURE.GET_TREASURE_EXPIRED_SUCCESS,
          payload: res.data,
        });
        resolve(res.data);
      })
      .catch(err => {
        console.log('erro', err.response.data);
        dispatch({type: TREASURE.GET_TREASURE_EXPIRED_FAILED, payload: err});
      });
  });
};

export const getTierUser = () => (dispatch: Dispatch<AnyAction>) => {
  const path = Endpoints.earn.tier;

  dispatch({type: TIER.GET_TIER_USER_START});
  return new Promise((resolve, reject) => {
    http
      .get(path)
      .then(res => {
        dispatch({
          type: TIER.GET_TIER_USER_SUCCESS,
          payload: res.data,
        });
        resolve(res.data);
      })
      .catch(err => {
        console.log('err gagal', err.response);

        dispatch({type: TIER.GET_TIER_USER_FAILED, payload: err});
        reject(err);
      });
  });
};
