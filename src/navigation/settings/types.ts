import {StackNavigationProp} from '@react-navigation/stack';
import {ROUTES} from '../../util/routes';
import {RouteProp} from '@react-navigation/native';

export type SettingsStackParamList = {
  Settings: undefined;
};

/*
 * Configure navigation prop for the application's Settings tab
 */
export type SettingsStackNavigationProp = StackNavigationProp<
  SettingsStackParamList,
  ROUTES.Settings
>;

/*
 * Configure route prop for the application's Settings screens
 */
export type SettingsStackRouteProp = RouteProp<
  SettingsStackParamList,
  ROUTES.Settings
>;

export type SettingsStackProps = {
  navigation: SettingsStackNavigationProp;
  route: SettingsStackRouteProp;
};
