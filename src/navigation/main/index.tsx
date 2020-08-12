import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ROUTES} from '../../util/routes';
import {TabParamList} from './types';
import {DashboardStack} from '../dashboard';

const Tab = createBottomTabNavigator<TabParamList>();

export default function MainTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name={ROUTES.Dashboard} component={DashboardStack} />
    </Tab.Navigator>
  );
}
