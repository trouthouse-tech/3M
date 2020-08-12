import {StackNavigationProp} from '@react-navigation/stack';
import {ROUTES} from '../../util/routes';
import {RouteProp} from '@react-navigation/native';

export type OnboardingStackParamList = {
  Splash: undefined;
  CredentialCollector: undefined;
  InvestorInfoCollector: undefined;
  Main: undefined;
};

export type OnboardingStackNavigationProp = StackNavigationProp<
  OnboardingStackParamList
>;

export type OnboardingStackRouteProp = RouteProp<
  MainStackParamList,
  ROUTES.Dashboard
>;

export type OnboardingStackProps = {
  navigation: OnboardingStackNavigationProp;
  route: OnboardingStackRouteProp;
};

export type MainStackParamList = {
  Dashboard: undefined;
};

export type MainStackNavigationProp = StackNavigationProp<MainStackParamList>;

export type MainStackRouteProp = RouteProp<
  MainStackParamList,
  ROUTES.Dashboard
>;

export type MainStackProps = {
  navigation: MainStackNavigationProp;
  route: MainStackRouteProp;
};
