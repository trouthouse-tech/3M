import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ROUTES} from '../../util/routes';
import {MeStackParamList} from './types';
import {Me} from '../../screens/me';

const MeStackNavigator = createStackNavigator<MeStackParamList>();

export const MeStack = () => {
  return (
    <MeStackNavigator.Navigator screenOptions={screenOptions}>
      <MeStackNavigator.Screen name={ROUTES.Me} component={Me} />
    </MeStackNavigator.Navigator>
  );
};

const screenOptions = {
  headerShown: false, // We will create our own header
};
