import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ROUTES} from '../../util/routes';
import {DashboardStackParamList} from './types';
import {Dashboard} from '../../screens/dashboard';

const DashboardStackNavigator = createStackNavigator<DashboardStackParamList>();

export const DashboardStack = () => {
  return (
    <DashboardStackNavigator.Navigator screenOptions={screenOptions}>
      <DashboardStackNavigator.Screen
        name={ROUTES.Dashboard}
        component={Dashboard}
      />
    </DashboardStackNavigator.Navigator>
  );
};

const screenOptions = {
  headerShown: false, // We will create our own header
};
