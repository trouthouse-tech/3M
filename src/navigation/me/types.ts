import {StackNavigationProp} from '@react-navigation/stack';
import {ROUTES} from '../../util/routes';
import {RouteProp} from '@react-navigation/native';
import {Investor} from '../../model';

export type MeStackParamList = {
  Me: undefined;
};

/*
 * Configure navigation prop for the application's Me tab
 */
export type MeStackNavigationProp = StackNavigationProp<
  MeStackParamList,
  ROUTES.Me
>;

/*
 * Configure route prop for the application's Me screens
 */
export type MeStackRouteProp = RouteProp<
  MeStackParamList,
  ROUTES.Me
>;

export type MeStackProps = {
  navigation: MeStackNavigationProp;
  route: MeStackRouteProp;
  user?: Investor;
};
