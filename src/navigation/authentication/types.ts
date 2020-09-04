import {StackNavigationProp} from '@react-navigation/stack';
import {ROUTES} from '../../util/routes';
import {RouteProp} from '@react-navigation/native';

export type AuthenticationStackParamList = {
  Splash: undefined;
  Login: undefined;
  CredentialCollector: undefined;
  InvestorInfoCollector: {isSignedIn?: boolean};
  Main: undefined;
  Onboarding: undefined;
};

export type AuthenticationStackNavigationProp = StackNavigationProp<
  AuthenticationStackParamList
>;

export type AuthenticationStackRouteProp = RouteProp<
  AuthenticationStackParamList,
  ROUTES.Main
>;

export type AuthenticationStackProps = {
  navigation: AuthenticationStackNavigationProp;
  route: AuthenticationStackRouteProp;
};
