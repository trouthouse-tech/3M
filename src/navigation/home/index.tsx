import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ROUTES} from '../../util/routes';
import {HomeStackParamList} from './types';
import {Home} from '../../screens/home';
import TradierView from '../../screens/tradier';

const HomeStackNavigator = createStackNavigator<HomeStackParamList>();

export const HomeStack = () => {
  return (
    <HomeStackNavigator.Navigator screenOptions={screenOptions}>
      <HomeStackNavigator.Screen name={ROUTES.Home} component={Home} />
      <HomeStackNavigator.Screen
        name={ROUTES.Tradier}
        component={TradierView}
      />
    </HomeStackNavigator.Navigator>
  );
};

const screenOptions = {
  headerShown: false, // We will create our own header
};
