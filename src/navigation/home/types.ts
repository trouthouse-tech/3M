import {StackNavigationProp} from '@react-navigation/stack';
import {ROUTES} from '../../util/routes';
import {RouteProp} from '@react-navigation/native';

export type DashboardStackParamList = {
  Dashboard: undefined;
};

/*
 * Configure navigation prop for the application's Dashboard tab
 */
export type DashboardStackNavigationProp = StackNavigationProp<
  DashboardStackParamList,
  ROUTES.Dashboard
>;

/*
 * Configure route prop for the application's main screens
 */
export type MainStackRouteProp = RouteProp<
  DashboardStackParamList,
  ROUTES.Dashboard
>;

export type MainStackProps = {
  navigation: DashboardStackNavigationProp;
  route: MainStackRouteProp;
};
