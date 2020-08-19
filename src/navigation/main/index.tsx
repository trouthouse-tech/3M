import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ROUTES} from '../../util/routes';
import {TabParamList} from './types';
import {HomeStack} from '../home';
import {TradeStack} from '../trade';
import {SettingsStack} from '../settings';

const Tab = createBottomTabNavigator<TabParamList>();

export default function MainTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name={ROUTES.Home} component={HomeStack} />
      <Tab.Screen name={ROUTES.Trade} component={TradeStack} />
      <Tab.Screen name={ROUTES.Settings} component={SettingsStack} />
    </Tab.Navigator>
  );
}
