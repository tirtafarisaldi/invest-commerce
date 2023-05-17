import {ACTION_TYPES} from '../constants/actionTypes';

const {NEWS, ADS_BANNER, MERCHANT_PROMO, SEARCH, TRENDING} =
  ACTION_TYPES.DISCOVER;

type IInitState = {
  loadingNews: boolean;
  loadingOthersNews: boolean;
  error: any;
};
const initialState: IInitState = {
  loadingNews: false,
  loadingOthersNews: false,
  error: null,
};

export default (
  state = initialState,
  {type, payload}: {type: string; payload: any},
): IInitState => {
  switch (type) {
    case NEWS.GET_HOT_NEWS_START:
      return {...state, loadingNews: true};
    case NEWS.GET_HOT_NEWS_FAILED:
      return {...state, loadingNews: false, error: payload};
    case NEWS.GET_HOT_NEWS_SUCCESS:
      return {...state, loadingNews: false, error: null};
    case NEWS.GET_YOU_MAY_LIKE_START:
      return {...state, loadingOthersNews: true};
    case NEWS.GET_YOU_MAY_LIKE_FAILED:
      return {...state, loadingOthersNews: false, error: payload};
    case NEWS.GET_YOU_MAY_LIKE_SUCCESS:
      return {...state, loadingOthersNews: false, error: null};
    case ADS_BANNER.GET_ADS_BANNER_START:
      return {...state};
    case ADS_BANNER.GET_ADS_BANNER_FAILED:
      return {...state, error: payload};
    case ADS_BANNER.GET_ADS_BANNER_SUCCESS:
      return {...state, error: null};
    case ADS_BANNER.GET_ADS_DETAIL_START:
      return {...state};
    case ADS_BANNER.GET_ADS_DETAIL_FAILED:
      return {...state, error: payload};
    case ADS_BANNER.GET_ADS_DETAIL_SUCCESS:
      return {...state, error: null};
    case MERCHANT_PROMO.GET_MERCHANT_PROMO_BANNER_START:
      return {...state};
    case MERCHANT_PROMO.GET_MERCHANT_PROMO_BANNER_FAILED:
      return {...state, error: payload};
    case MERCHANT_PROMO.GET_MERCHANT_PROMO_BANNER_SUCCESS:
      return {...state, error: null};
    case MERCHANT_PROMO.GET_MERCHANT_PROMO_DETAIL_START:
      return {...state};
    case MERCHANT_PROMO.GET_MERCHANT_PROMO_DETAIL_FAILED:
      return {...state, error: payload};
    case MERCHANT_PROMO.GET_MERCHANT_PROMO_DETAIL_SUCCESS:
      return {...state, error: null};
    case SEARCH.GET_SEARCH_START:
      return {...state};
    case SEARCH.GET_SEARCH_FAILED:
      return {...state, error: payload};
    case SEARCH.GET_SEARCH_SUCCESS:
      return {...state, error: null};
    case TRENDING.GET_TRENDING_CIRCLE_START:
      return {...state};
    case TRENDING.GET_TRENDING_CIRCLE_FAILED:
      return {...state, error: payload};
    case TRENDING.GET_TRENDING_CIRCLE_SUCCESS:
      return {...state, error: null};
    case TRENDING.GET_TRENDING_ASSET_START:
      return {...state};
    case TRENDING.GET_TRENDING_ASSET_FAILED:
      return {...state, error: payload};
    case TRENDING.GET_TRENDING_ASSET_SUCCESS:
      return {...state, error: null};
    default:
      return state;
  }
};
