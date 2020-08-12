import {StackNavigationProp} from '@react-navigation/stack';
import {ROUTES} from '../../util/routes';
import {RouteProp} from '@react-navigation/native';

export type TabParamList = {
  Dashboard: undefined;
};

/*
 * Configure navigation prop for the application's main screens
 */
export type MainStackNavigationProp = StackNavigationProp<
  TabParamList,
  ROUTES.Dashboard
>;

/*
 * Configure route prop for the application's main screens
 */
export type MainStackRouteProp = RouteProp<TabParamList, ROUTES.Dashboard>;

export type MainStackProps = {
  navigation: MainStackNavigationProp;
  route: MainStackRouteProp;
};
