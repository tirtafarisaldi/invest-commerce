import Endpoints from '@Services/API/endpoint';
import {http} from '@Services/API/http';
import {Dispatch, AnyAction} from 'redux';
import {ACTION_TYPES} from '../constants/actionTypes';
import {URLSearchParams} from '@Utils/helpers';
const {NEWS, ADS_BANNER, MERCHANT_PROMO, SEARCH, TRENDING} =
  ACTION_TYPES.DISCOVER;

export const getHotNews = () => (dispatch: Dispatch<AnyAction>) => {
  const path = Endpoints.news.hotNews;

  dispatch({type: NEWS.GET_HOT_NEWS_START});
  return new Promise((resolve, reject) => {
    http
      .get(path)
      .then(res => {
        dispatch({type: NEWS.GET_HOT_NEWS_SUCCESS, payload: res.data?.news});
        resolve(res.data?.news);
      })
      .catch(err => {
        console.log('erro', err);
        dispatch({type: NEWS.GET_HOT_NEWS_FAILED, payload: err});
      });
  });
};

export const getYouMayLikeNews =
  (query?: any) => (dispatch: Dispatch<AnyAction>) => {
    let path = Endpoints.news.youMayLike;

    if (query) {
      const qparam = URLSearchParams(query);
      path += qparam;
    }

    dispatch({type: NEWS.GET_YOU_MAY_LIKE_START});
    return new Promise((resolve, reject) => {
      http
        .get(path)
        .then(res => {
          dispatch({
            type: NEWS.GET_YOU_MAY_LIKE_SUCCESS,
            payload: res.data?.news,
          });
          resolve(res.data?.news);
        })
        .catch(err => {
          console.log('erro', err);
          dispatch({type: NEWS.GET_YOU_MAY_LIKE_FAILED, payload: err});
        });
    });
  };

export const getAdsBanner = () => (dispatch: Dispatch<AnyAction>) => {
  const path = Endpoints.ads.adsBanner;

  dispatch({type: ADS_BANNER.GET_ADS_BANNER_START});
  return new Promise((resolve, reject) => {
    http
      //TODO REMOVE APIDOG
      .get(
        `https://mock.apidog.com/m1/359559-0-default
${path}?apidogToken=eehSHOrpbaVBRSFx1VK0BCjsHExVLadS`,
        {baseURL: ''},
      )
      .then(res => {
        dispatch({type: ADS_BANNER.GET_ADS_BANNER_SUCCESS, payload: res.data});
        resolve(res.data);
      })
      .catch(err => {
        console.log('error', err);
        dispatch({type: ADS_BANNER.GET_ADS_BANNER_FAILED, payload: err});
      });
  });
};

export const getAdsDetail = (id: number) => (dispatch: Dispatch<AnyAction>) => {
  const path = `${Endpoints.ads.adsBanner}/${id}`;

  dispatch({type: ADS_BANNER.GET_ADS_DETAIL_START});
  return new Promise((resolve, reject) => {
    http
      //TODO REMOVE APIDOG
      .get(
        `https://mock.apidog.com/m1/359559-0-default
  ${path}?apidogToken=eehSHOrpbaVBRSFx1VK0BCjsHExVLadS`,
        {baseURL: ''},
      )
      .then(res => {
        dispatch({
          type: ADS_BANNER.GET_ADS_DETAIL_SUCCESS,
          payload: res.data,
        });
        resolve(res.data);
      })
      .catch(err => {
        console.log('error', err);
        dispatch({
          type: ADS_BANNER.GET_ADS_DETAIL_FAILED,
          payload: err,
        });
      });
  });
};

export const getMerchantPromo = () => (dispatch: Dispatch<AnyAction>) => {
  const path = Endpoints.promo.merchantPromo;

  dispatch({type: MERCHANT_PROMO.GET_MERCHANT_PROMO_BANNER_START});
  return new Promise((resolve, reject) => {
    http
      //TODO REMOVE APIDOG
      .get(
        `https://mock.apidog.com/m1/359559-0-default
${path}?limit=3&&apidogToken=eehSHOrpbaVBRSFx1VK0BCjsHExVLadS`,
        {baseURL: ''},
      )
      .then(res => {
        dispatch({
          type: MERCHANT_PROMO.GET_MERCHANT_PROMO_BANNER_SUCCESS,
          payload: res.data,
        });
        resolve(res.data);
      })
      .catch(err => {
        console.log('error', err);
        dispatch({
          type: MERCHANT_PROMO.GET_MERCHANT_PROMO_BANNER_FAILED,
          payload: err,
        });
      });
  });
};

export const getMerchantPromoDetail =
  (id: number) => (dispatch: Dispatch<AnyAction>) => {
    const path = `${Endpoints.promo.merchantPromo}/${id}`;
    dispatch({type: MERCHANT_PROMO.GET_MERCHANT_PROMO_DETAIL_START});
    return new Promise((resolve, reject) => {
      http
        .get(
          `https://mock.apidog.com/m1/359559-0-default
${path}?limit=3&&apidogToken=eehSHOrpbaVBRSFx1VK0BCjsHExVLadS`,
          {baseURL: ''},
        )
        .then(res => {
          dispatch({
            type: MERCHANT_PROMO.GET_MERCHANT_PROMO_DETAIL_SUCCESS,
            payload: res.data,
          });
          resolve(res.data);
        })
        .catch(err => {
          console.log('error', err);
          dispatch({
            type: MERCHANT_PROMO.GET_MERCHANT_PROMO_DETAIL_FAILED,
            payload: err,
          });
        });
    });
  };

export const getSearch =
  (search: any, type: any, filter: any) => (dispatch: Dispatch<AnyAction>) => {
    const path = Endpoints.search.search;
    const path2 = Endpoints.search.searchHashtag;
    let url = `/${type}${path}?search=${search}&page=1&limit=9999&sortBy=${filter}`;
    if (type === 'hashtag') {
      url = `${path2}?search=${search.replace('#', '')}`;
    }
    dispatch({type: SEARCH.GET_SEARCH_START});
    return new Promise((resolve, reject) => {
      http
        .get(url)
        .then(res => {
          dispatch({
            type: SEARCH.GET_SEARCH_SUCCESS,
            payload: res.data.result,
          });
          resolve(res.data.result);
          return res.data?.result;
        })
        .catch(err => {
          dispatch({type: SEARCH.GET_SEARCH_FAILED, payload: err});
        });
    });
  };

export const getTrendingCircle =
  (number: number) => (dispatch: Dispatch<AnyAction>) => {
    const path = Endpoints.trending.circle;
    let url = `${path}?page=1&limit=${number}`;
    dispatch({type: TRENDING.GET_TRENDING_CIRCLE_START});
    return new Promise((resolve, reject) => {
      http
        .get(url)
        .then(res => {
          dispatch({
            type: TRENDING.GET_TRENDING_CIRCLE_SUCCESS,
            payload: res.data.result,
          });
          resolve(res.data.result);
          return res.data?.result;
        })
        .catch(err => {
          console.log('error', err);
          dispatch({type: TRENDING.GET_TRENDING_CIRCLE_FAILED, payload: err});
        });
    });
  };

export const getTrendingAsset =
  (number: number, filter: any) => (dispatch: Dispatch<AnyAction>) => {
    const path = Endpoints.trending.asset;
    let url = `${path}?page=1&limit=${number}&sortBy=${filter}`;
    dispatch({type: TRENDING.GET_TRENDING_ASSET_START});
    return new Promise((resolve, reject) => {
      http
        .get(url)
        .then(res => {
          dispatch({
            type: TRENDING.GET_TRENDING_ASSET_SUCCESS,
            payload: res.data.result,
          });
          resolve(res.data.result);
          return res.data?.result;
        })
        .catch(err => {
          console.log('erro', err);
          dispatch({type: TRENDING.GET_TRENDING_ASSET_FAILED, payload: err});
        });
    });
  };
