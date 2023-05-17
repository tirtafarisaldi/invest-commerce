import {EnterPin} from '@Container/EnterPin';
import {
  ForgotPassword,
  LoginContainer,
  OnboardingScreen,
  RegisterContainer,
  SearchScreen,
  ProfileUserScreen,
  LegalContainer,
  TermContainer,
  HomeContainer,
  MerchantPromoList,
  MerchantPromoDetail,
  AdsBannerDetail,
  MyProfileScreen,
  EarnScreen,
  TreasureScreen,
  RewardsScreen,
  DetailNews,
  ActivityScreen,
  AllNewsList,
  CircleList,
  AssetList,
  PlayList,
  CircleDetailPage,
  CreateCircle,
  SearchCircle,
  CircleMembershipForm,
} from '@Container/index';
import CircleContainer from '@Container/Legal/CircleContainer';
import DisclosureContainer from '@Container/Legal/DisclosureContainer';
import PrivacyContainer from '@Container/Legal/PrivacyContainer';
import SocialContainer from '@Container/Legal/SocialContainer';
import {Referral} from '@Container/Referral';
import {Setting} from '@Container/Setting';
import {EditProfileScreen} from '@Container/Setting/EditProfile';
import {
  CardStyleInterpolators,
  StackNavigationOptions,
} from '@react-navigation/stack';

interface INavigationOption {
  name: string;
  component: React.ComponentType<any>;
  options: StackNavigationOptions;
}

export const UnauthorizedScreen: Array<INavigationOption> = [
  {
    name: 'LoginScreen',
    component: LoginContainer,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'RegisterScreen',
    component: RegisterContainer,
    options: {
      headerShown: false,
      gestureEnabled: false,
    },
  },
  {
    name: 'ForgotPasswordScreen',
    component: ForgotPassword,
    options: {
      headerShown: false,
      gestureEnabled: false,
    },
  },
];

export const AuthorizedScreen: Array<INavigationOption> = [
  {
    name: 'MyProfileScreen',
    component: MyProfileScreen,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'SettingScreen',
    component: Setting,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'EditProfileScreen',
    component: EditProfileScreen,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'ReferralScreen',
    component: Referral,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'EnterPinScreen',
    component: EnterPin,
    options: {
      headerShown: false,
    },
  },
];

export const LoginOptional: Array<INavigationOption> = [
  {
    name: 'OnboardingScreen',
    component: OnboardingScreen,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'HomeScreen',
    component: HomeContainer,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'CircleDetails',
    component: CircleDetailPage,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'CreateCircle',
    component: CreateCircle,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'SearchCircle',
    component: SearchCircle,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'CircleMembershipForm',
    component: CircleMembershipForm,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'TermScreen',
    component: TermContainer,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'DisclosureScreen',
    component: DisclosureContainer,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'PrivacyScreen',
    component: PrivacyContainer,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'SocialScreen',
    component: SocialContainer,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'CircleScreen',
    component: CircleContainer,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'MerchantPromoList',
    component: MerchantPromoList,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'MerchantPromoDetail',
    component: MerchantPromoDetail,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'AdsBannerDetail',
    component: AdsBannerDetail,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'LegalScreen',
    component: LegalContainer,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'SearchScreen',
    component: SearchScreen,
    options: {
      headerShown: false,
      // cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
    },
  },
  {
    name: 'ProfileUserScreen',
    component: ProfileUserScreen,
    options: {
      headerShown: false,
      // cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
    },
  },
  {
    name: 'EarnScreen',
    component: EarnScreen,
    options: {
      headerShown: false,
      // cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
    },
  },
  {
    name: 'TreasureScreen',
    component: TreasureScreen,
    options: {
      headerShown: false,
      // cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
    },
  },
  {
    name: 'RewardsScreen',
    component: RewardsScreen,
    options: {
      headerShown: false,
      // cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
    },
  },
  {
    name: 'DetailNews',
    component: DetailNews,
    options: {
      headerShown: false,
      cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
    },
  },
  {
    name: 'ActivityScreen',
    component: ActivityScreen,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'AllNews',
    component: AllNewsList,
    options: {
      headerShown: false,
      // cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
    },
  },
  {
    name: 'CircleListScreen',
    component: CircleList,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'AssetListScreen',
    component: AssetList,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'PlayListScreen',
    component: PlayList,
    options: {
      headerShown: false,
    },
  },
];
