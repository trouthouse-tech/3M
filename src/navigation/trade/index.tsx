import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ROUTES } from '../../util/routes';
import { TradeStackParamList } from './types';
import { Trade } from '../../screens/trade';
import { TradeForm } from '../../screens/trade/form';
import { FormResults } from '../../screens/trade/results';
import { SpreadView } from '../../screens/trade/Spread';
import ThinkTank from '../../screens/thinkThank';
import SimpleTrade from '../../screens/simpleTrade';
const TradeStackNavigator = createStackNavigator<TradeStackParamList>();

export const TradeStack = () => {
  return (
    <TradeStackNavigator.Navigator screenOptions={screenOptions}>
      {/* <TradeStackNavigator.Screen name={ROUTES.Trade} component={Trade} />
      <TradeStackNavigator.Screen
        name={ROUTES.TradeForm}
        component={TradeForm}
      />
      <TradeStackNavigator.Screen
        name={ROUTES.FormResults}
        component={FormResults}
      />
      <TradeStackNavigator.Screen
        name={ROUTES.Spread}
        component={SpreadView}
      /> */}

      <TradeStackNavigator.Screen
        name={ROUTES.ThinkThank}
        component={ThinkTank}
      />
      <TradeStackNavigator.Screen
        name={ROUTES.SimpleTrade}
        component={SimpleTrade}
      />

    </TradeStackNavigator.Navigator>
  );
};

const screenOptions = {
  headerShown: false, // We will create our own header
};
