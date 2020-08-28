import {StackNavigationProp} from '@react-navigation/stack';
import {ROUTES} from '../../util/routes';
import {RouteProp} from '@react-navigation/native';

export type OnboardingStackParamList = {
  Splash: undefined;
  Login: undefined;
  CredentialCollector: undefined;
  InvestorInfoCollector: {email: string; isSignedIn?: boolean};
  Main: undefined;
};

export type OnboardingStackNavigationProp = StackNavigationProp<
  OnboardingStackParamList
>;

export type OnboardingStackRouteProp = RouteProp<
  OnboardingStackParamList,
  ROUTES.Main
>;

export type OnboardingStackProps = {
  navigation: OnboardingStackNavigationProp;
  route: OnboardingStackRouteProp;
};
