import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ROUTES} from '../../util/routes';
import {MeStackParamList} from './types';
import {Me} from '../../screens/me';
import {Orders} from '../../screens/me/Orders';
import {SpreadView} from '../../screens/trade/Spread';

const MeStackNavigator = createStackNavigator<MeStackParamList>();

export const MeStack = () => {
  return (
    <MeStackNavigator.Navigator screenOptions={screenOptions}>
      <MeStackNavigator.Screen name={ROUTES.Me} component={Me} />
      <MeStackNavigator.Screen name={ROUTES.Orders} component={Orders} />
      <MeStackNavigator.Screen name={ROUTES.Spread} component={SpreadView} />
    </MeStackNavigator.Navigator>
  );
};

const screenOptions = {
  headerShown: false, // We will create our own header
};
