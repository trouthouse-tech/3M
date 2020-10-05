import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ROUTES} from '../../util/routes';
import {TradeStackParamList} from './types';
import {Trade} from '../../screens/trade';
import {TradeForm} from '../../screens/trade/form';

const TradeStackNavigator = createStackNavigator<TradeStackParamList>();

export const TradeStack = () => {
  return (
    <TradeStackNavigator.Navigator screenOptions={screenOptions}>
      <TradeStackNavigator.Screen name={ROUTES.Trade} component={Trade} />
      <TradeStackNavigator.Screen
        name={ROUTES.TradeForm}
        component={TradeForm}
      />
    </TradeStackNavigator.Navigator>
  );
};

const screenOptions = {
  headerShown: false, // We will create our own header
};
