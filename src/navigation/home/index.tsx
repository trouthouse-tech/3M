import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ROUTES } from '../../util/routes';
import { HomeStackParamList } from './types';
import { Home } from '../../screens/home';
import { TradierView } from '../../screens/tradier';
import Portfolio from '../../screens/portfolio';
import PortfoliSummary from '../../screens/portfolio/PortfolioSummary';
import PortfolioSummary from '../../screens/portfolio/PortfolioSummary';
import TradeHistory from '../../screens/tradeHistory';

const HomeStackNavigator = createStackNavigator<HomeStackParamList>();

export const HomeStack = () => {
  return (
    <HomeStackNavigator.Navigator screenOptions={screenOptions}>
      <HomeStackNavigator.Screen name={ROUTES.Home} component={Home} />
      <HomeStackNavigator.Screen name={ROUTES.Portfolio} component={Portfolio} />
      <HomeStackNavigator.Screen name={ROUTES.PortfoliSummary} component={PortfolioSummary} />
      <HomeStackNavigator.Screen
        name={ROUTES.Tradier}
        component={TradierView}
      />
      <HomeStackNavigator.Screen
        name={ROUTES.TradeHistory}
        component={TradeHistory}
      />
    </HomeStackNavigator.Navigator>
  );
};

const screenOptions = {
  headerShown: false, // We will create our own header
};
