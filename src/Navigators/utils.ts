/**
 * Used to navigating without the navigation prop
 * @see https://reactnavigation.org/docs/navigating-without-navigation-prop/
 *
 * You can add other navigation functions that you need and export them
 */
import {
  CommonActions,
  createNavigationContainerRef,
} from '@react-navigation/native';

export type RootStackParamList = {
  LoginScreen: undefined;
  RegisterScreen: {email: string; name: string} | undefined;
  ForgotPasswordScreen: {step: number; email: string} | undefined;
  OnboardingScreen: undefined;
  LegalScreen: undefined;
  TermScreen: undefined;
  DisclosureScreen: undefined;
  HomeScreen: undefined;
  MerchantPromoList: undefined;
  MerchantPromoDetail: undefined;
  AdsBannerDetail: undefined;
  MyProfileScreen: undefined;
  SettingScreen: undefined;
  EarnScreen: undefined;
  TreasureScreen: undefined;
  RewardsScreen: undefined;
  SearchScreen: undefined;
  DetailNews: undefined;
  ProfileUserScreen: undefined;
  EditProfileScreen: undefined;
  ActivityScreen: undefined;
  AllNews: undefined;
  ReferralScreen: undefined;
  CircleListScreen: undefined;
  AssetListScreen: undefined;
  PlayListScreen: undefined;
  EnterPinScreen: {type: string};
  CircleDetails: undefined;
  SearchCircle: undefined;
  CircleMembershipForm: {isLifetime: boolean};
};

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export function navigate(
  name: keyof RootStackParamList,
  params?: any,
  key?: string,
) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, {
      ...params,
      key,
    });
  }
}

export function navigateAndReset(routes: any = [], index = 0) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index,
        routes, //TODO: check multiple navigation
      }),
    );
  }
}

export function navigateAndSimpleReset(name: string, index = 0) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index,
        routes: [{name}],
      }),
    );
  }
}

export function navigateBack() {
  navigationRef.dispatch(CommonActions.goBack());
}
