export default class Endpoints {
  // auth
  static auth = {
    loginPhone: '/auth/v1/login/phone-number',
    loginOauth: '/auth/v1/login',
    register: '/auth/v1/create',
  };
  // circle
  static circle = {
    all: '/circle/get-circle',
  };
  // user
  static user = {
    changePassword: '/user/v1/change-password',
    profile: '/user/v1/',
  };
  // email
  static email = {
    forgotPasswordEmail: '/email/v1/forgot-password',
  };
  static avatar = {
    male: '/auth/v1/avatars?gender=male',
    female: '/auth/v1/avatars?gender=female',
  };
  static validate = {
    phone: '/auth/v1/validate/phone',
    email: '/auth/v1/validate/email',
    seedsTag: '/auth/v1/validate/seeds-tag',
    refCode: '/auth/v1/validate/ref-code',
  };
  static otp = {
    sendOTP: '/auth/v1/otp',
    verify: `/auth/v1/otp/verify`,
  };
  static news = {
    hotNews: '/news/v1/hot',
    youMayLike: '/news/v1/related',
  };
  static earn = {
    activity: '/earn-exp/v1/activity',
    tier: '/earn-exp/v1/tiers',
    completedTask: '/earn-exp/v1/today-completed-task',
    uncompletedTask: '/earn-exp/v1/today-uncompleted-task',
    activitySummary: '/earn-exp/v1/activity-summary',
    treasureActive: '/earn-exp/v1/active-treasure',
    treasureExpired: '/earn-exp/v1/expired-treasure',
  };
  static ads = {
    adsBanner: '/discover/v1/ads/banner',
  };
  static promo = {
    merchantPromo: '/discover/v1/merchant/banner',
  };
  static search = {
    search: '/v1/search',
    searchHashtag: '/social/v1/search/hashtag',
  };
  static trending = {
    circle: 'circle/v1/trending',
    asset: '/asset/v1/trending',
  };
}
