import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ROUTES} from '../../util/routes';
import {SettingsStackParamList} from './types';
import {Settings} from '../../screens/settings';

const SettingsStackNavigator = createStackNavigator<SettingsStackParamList>();

export const SettingsStack = () => {
  return (
    <SettingsStackNavigator.Navigator screenOptions={screenOptions}>
      <SettingsStackNavigator.Screen
        name={ROUTES.Settings}
        component={Settings}
      />
    </SettingsStackNavigator.Navigator>
  );
};

const screenOptions = {
  headerShown: false, // We will create our own header
};
