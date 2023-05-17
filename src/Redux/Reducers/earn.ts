import {ITierUser} from 'src/Interfaces/APIPayload/Earn';
import {ACTION_TYPES} from '../constants/actionTypes';

const {ACTIVITY, TASK, TREASURE, TIER} = ACTION_TYPES.EARN;

type IInitState = {
  loadingActivity: boolean;
  loadingCompletedTask: boolean;
  loadingUncompletedTask: boolean;
  loadingActivitySummary: boolean;
  loadingTreasureActive: boolean;
  loadingTreasureExpired: boolean;
  loadingTierUser: boolean;
  error: any;
  activityList: any;
  completedTaskList: any;
  unCompletedTaskList: any;
  activitySummary: any;
  treasureActive: any;
  treasureExpired: any;
  tierUser: ITierUser;
};
const initialState: IInitState = {
  loadingActivity: false,
  loadingCompletedTask: false,
  loadingUncompletedTask: false,
  loadingActivitySummary: false,
  loadingTreasureActive: false,
  loadingTreasureExpired: false,
  loadingTierUser: false,
  error: null,
  activityList: [],
  completedTaskList: [],
  unCompletedTaskList: [],
  activitySummary: {},
  treasureActive: [],
  treasureExpired: [],
  tierUser: {
    currentExp: 0,
    currentTier: '',
    nextExp: 0,
    expExpiration: '',
    tierList: [],
  },
};

export default (
  state = initialState,
  {type, payload}: {type: string; payload: any},
): IInitState => {
  switch (type) {
    case ACTIVITY.GET_USER_ACTIVITY_START:
      return {...state, loadingActivity: true};
    case ACTIVITY.GET_USER_ACTIVITY_FAILED:
      return {...state, loadingActivity: false, error: payload};
    case ACTIVITY.GET_USER_ACTIVITY_SUCCESS:
      return {...state, loadingActivity: false, error: null};
    case ACTIVITY.GET_ACTIVITY_SUMMARY_START:
      return {...state, loadingUncompletedTask: true};
    case ACTIVITY.GET_ACTIVITY_SUMMARY_FAILED:
      return {...state, loadingUncompletedTask: false, error: payload};
    case ACTIVITY.GET_ACTIVITY_SUMMARY_SUCCESS:
      return {...state, loadingUncompletedTask: false, error: null};
    case TASK.GET_COMPLETED_TASK_START:
      return {...state, loadingCompletedTask: true};
    case TASK.GET_COMPLETED_TASK_FAILED:
      return {...state, loadingCompletedTask: false, error: payload};
    case TASK.GET_COMPLETED_TASK_SUCCESS:
      return {...state, loadingCompletedTask: false, error: null};
    case TASK.GET_UNCOMPLETED_TASK_START:
      return {...state, loadingUncompletedTask: true};
    case TASK.GET_UNCOMPLETED_TASK_FAILED:
      return {...state, loadingUncompletedTask: false, error: payload};
    case TASK.GET_UNCOMPLETED_TASK_SUCCESS:
      return {...state, loadingUncompletedTask: false, error: null};
    case TREASURE.GET_TREASURE_ACTIVE_START:
      return {...state, loadingTreasureActive: true};
    case TREASURE.GET_TREASURE_ACTIVE_FAILED:
      return {...state, loadingTreasureActive: false, error: payload};
    case TREASURE.GET_TREASURE_ACTIVE_SUCCESS:
      return {...state, loadingTreasureActive: false, error: null};
    case TREASURE.GET_TREASURE_EXPIRED_START:
      return {...state, loadingTreasureExpired: true};
    case TREASURE.GET_TREASURE_EXPIRED_FAILED:
      return {...state, loadingTreasureExpired: false, error: payload};
    case TREASURE.GET_TREASURE_EXPIRED_SUCCESS:
      return {...state, loadingTreasureExpired: false, error: null};
    case TIER.GET_TIER_USER_START:
      return {...state, loadingTierUser: true};
    case TIER.GET_TIER_USER_FAILED:
      return {...state, loadingTierUser: false, error: payload};
    case TIER.GET_TIER_USER_SUCCESS:
      return {...state, loadingTierUser: false, error: null, tierUser: payload};
    default:
      return state;
  }
};
