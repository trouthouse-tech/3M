import {StackNavigationProp} from '@react-navigation/stack';
import {ROUTES} from '../../util/routes';
import {RouteProp} from '@react-navigation/native';

export type HomeStackParamList = {
  Home: undefined;
};

/*
 * Configure navigation prop for the application's Home tab
 */
export type HomeStackNavigationProp = StackNavigationProp<
  HomeStackParamList,
  ROUTES.Home
>;

/*
 * Configure route prop for the application's main screens
 */
export type MainStackRouteProp = RouteProp<HomeStackParamList, ROUTES.Home>;

export type MainStackProps = {
  navigation: HomeStackNavigationProp;
  route: MainStackRouteProp;
};
