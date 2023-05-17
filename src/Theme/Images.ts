import { ThemeVariables } from './theme';

export default function ({ }: ThemeVariables) {
  return {
    logo: require('@Assets/Images/seeds.png'),
    text_logo: require('@Assets/Images/seeds_brand.png'),
    workInProgress: require('@Assets/Images/work-in-progress.png'),
    loginScreen: {
      welcome: require('@Assets/Images/LoginScreen/login-welcome.png'),
      apple: require('@Assets/Images/LoginScreen/apple.png'),
      facebook: require('@Assets/Images/LoginScreen/facebook.png'),
      google: require('@Assets/Images/LoginScreen/google.png'),
    },
    langSwitch: {
      id: require('@Assets/Images/LanguageSwitcher/id.png'),
      en: require('@Assets/Images/LanguageSwitcher/en.png'),
    },
    discover: {
      user: require('@Assets/Images/user.png'),
      kenangan: require('@Assets/Images/kenangan.png'),
      // banner: require('@Assets/Images/banner.png'),
      logoExample: require('@Assets/Images/LogoExample.png'),
      one: require('@Assets/Images/one.png'),
      defaultAvatar: require('@Assets/Images/DiscoverScreen/default-avatar.png'),
      ethereum: require('@Assets/Images/ethereum.png'),
      assetUp: require('@Assets/Images/assetUp.png'),
    },
    earn: {
      background: require('@Assets/Images/EarnScreen/background.png'),
      treasureOn: require('@Assets/Images/EarnScreen/treasureOn.png'),
      treasureOff: require('@Assets/Images/EarnScreen/treasureOff.png'),
      padlock: require('@Assets/Images/EarnScreen/padlock.png'),
      award: require('@Assets/Images/EarnScreen/award.png'),
      empty: require('@Assets/Images/EarnScreen/empty.png'),
      seeds: require('@Assets/Images/EarnScreen/seeds.png'),
      sprout: require('@Assets/Images/EarnScreen/sprout.png'),
      seedling: require('@Assets/Images/EarnScreen/seedling.png'),
      sapling: require('@Assets/Images/EarnScreen/sapling.png'),
      tree: require('@Assets/Images/EarnScreen/tree.png'),
      userWithCoin: require('@Assets/Images/EarnScreen/userWithCoin.png'),
    },
    trending: {
      trending1: require('@Assets/Images/Trending/trending1.png'),
      trending2: require('@Assets/Images/Trending/trending2.png'),
    },
    profile: {
      example: require('@Assets/Images/example.png'),
      leaf: require('@Assets/Images/leaf.png'),
      user: require('@Assets/Images/user.png'),
      achievement: require('@Assets/Images/ProfileScreen/achievement.png'),
      sprout: require('@Assets/Images/ProfileScreen/sprout.png'),
      sampleStock1: require('@Assets/Images/ProfileScreen/sample-stock-1.png'),
      sampleStock2: require('@Assets/Images/ProfileScreen/sample-stock-2.png'),
      sampleStock3: require('@Assets/Images/ProfileScreen/sample-stock-3.png'),
      deleteAccount: require('@Assets/Images/ProfileScreen/delete-account.png'),
      emptyPost: require('@Assets/Images/ProfileScreen/empty-post.png'),
    },
    forgotPasswordScreen: {
      forgotPassword: require('@Assets/Images/ForgotPasswordScreen/forgot-password.png'),
      otpWhatsApp: require('@Assets/Images/ForgotPasswordScreen/otp-wa.png'),
      otpSms: require('@Assets/Images/ForgotPasswordScreen/otp-sms.png'),
      createNewPassword: require('@Assets/Images/ForgotPasswordScreen/create-new-password.png'),
      successResetPassword: require('@Assets/Images/ForgotPasswordScreen/success-reset-password.png'),
      emailSent: require('@Assets/Images/ForgotPasswordScreen/email-sent.png'),
    },
    onboardingScreen: {
      onboardingOne: require('@Assets/Images/OnboardingScreen/onboarding-1.png'),
      onboardingTwo: require('@Assets/Images/OnboardingScreen/onboarding-2.png'),
      onboardingThree: require('@Assets/Images/OnboardingScreen/onboarding-3.png'),
      onboardingFour: require('@Assets/Images/OnboardingScreen/onboarding-4.png'),
    },
    registerScreen: {
      inputDataOne: require('@Assets/Images/RegisterScreen/just-for-you.png'),
      inputDataTwo: require('@Assets/Images/RegisterScreen/input-data-user.png'),
      inputNewPassword: require('@Assets/Images/RegisterScreen/new-password.png'),
      successRegister: require('@Assets/Images/RegisterScreen/success.png'),
      otpSMS: require('@Assets/Images/RegisterScreen/otp-sms.png'),
    },
    legalScreen: {
      legal: require('@Assets/Images/LegalScreen/legal.png'),
    },
    circleScreen: {
      defaultIcon: require('@Assets/Images/Circle/default-icon.png'),
      defaultBackground: require('@Assets/Images/Circle/default-background.png'),
      createCircle: require('@Assets/Images/Circle/create-circle-banner.png'),
    },
    circleJoin: {
      lockedAccount: require('@Assets/Images/Circle/locked-account.png'),
      membershipFeeAvatar: require('@Assets/Images/Circle/membership-fee-avatar.png'),
    },
    referralScreen: {
      earnMoreExp: require('@Assets/Images/ReferralScreen/earn-more-exp.png'),
    },
  };
}
