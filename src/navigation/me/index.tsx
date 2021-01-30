import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ROUTES } from '../../util/routes';
import { MeStackParamList } from './types';
import { Me } from '../../screens/me';
import { Orders } from '../../screens/me/Orders';
import { SpreadView } from '../../screens/trade/Spread';
import MyAccount from '../../screens/myAccount';
import Support from '../../screens/support';
import SettingsScreen from '../../screens/Settings';
import FollowUs from '../../screens/followus';
import DisclaimerScreen from '../../screens/disclaimer';
import Account from '../../screens/myAccount/Account';
const MeStackNavigator = createStackNavigator<MeStackParamList>();

export const MeStack = () => {
  return (
    <MeStackNavigator.Navigator screenOptions={screenOptions}>
      {/* <MeStackNavigator.Screen name={ROUTES.Me} component={Me} />
      <MeStackNavigator.Screen name={ROUTES.Orders} component={Orders} />
      <MeStackNavigator.Screen name={ROUTES.Spread} component={SpreadView} /> */}
      <MeStackNavigator.Screen name={ROUTES.MyAccount} component={MyAccount} />
      <MeStackNavigator.Screen name={ROUTES.SupportAccount} component={Support} />
      <MeStackNavigator.Screen name={ROUTES.SettingScreen} component={SettingsScreen} />
      <MeStackNavigator.Screen name={ROUTES.FollowUs} component={FollowUs} />
      <MeStackNavigator.Screen name={ROUTES.DisclaimerScreen} component={DisclaimerScreen} />
      <MeStackNavigator.Screen name={ROUTES.Account} component={Account} />

    </MeStackNavigator.Navigator>
  );
};

const screenOptions = {
  headerShown: false, // We will create our own header
};
