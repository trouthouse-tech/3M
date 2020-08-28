import {StackNavigationProp} from '@react-navigation/stack';
import {ROUTES} from '../../util/routes';
import {RouteProp} from '@react-navigation/native';

export type OnboardingStackParamList = {
  Onboarding: undefined;
  TradingExperience: undefined;
  MoneyManagement: undefined;
  TradingHorizon: undefined;
  ThreeMPurpose: undefined;
  Main: undefined;
};

/*
 * Configure navigation prop for the application's Onboarding tab
 */
export type OnboardingStackNavigationProp = StackNavigationProp<
  OnboardingStackParamList,
  ROUTES.Onboarding
>;

/*
 * Configure route prop for the application's Onboarding screens
 */
export type OnboardingStackRouteProp = RouteProp<
  OnboardingStackParamList,
  ROUTES.Onboarding
>;

export type OnboardingStackProps = {
  navigation: OnboardingStackNavigationProp;
  route: OnboardingStackRouteProp;
};
