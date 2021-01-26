import { StackNavigationProp } from '@react-navigation/stack';
import { ROUTES } from '../../util/routes';
import { RouteProp } from '@react-navigation/native';

export type HomeStackParamList = {
  Home: undefined;
  Tradier: undefined;
  Portfolio: undefined;
  PortfolioSummary: undefined
};

/*
 * Configure navigation prop for the application's Home tab
 */
export type HomeStackNavigationProp = StackNavigationProp<
  HomeStackParamList,
  ROUTES.Home

>;

/*
 * Configure route prop for the application's Home screens
 */
export type HomeStackRouteProp = RouteProp<HomeStackParamList, ROUTES.Home>;

export type HomeStackProps = {
  navigation: HomeStackNavigationProp;
  route: HomeStackRouteProp;
};
