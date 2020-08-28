import * as React from 'react';
import {ROUTES} from '../../util/routes';
import {Splash} from '../../screens/splash';
import {AuthenticationStackParamList, AuthenticationStackProps} from './types';
import {createStackNavigator} from '@react-navigation/stack';
import CredentialCollector from '../../components/CredentialCollector';
import InvestorInfoSelector from '../../components/InvestorInfoCollector';
import {Login} from '../../screens/login';

const AuthenticationStackNavigator = createStackNavigator<
  AuthenticationStackParamList
>();

export const AuthenticationStack: React.FC<AuthenticationStackProps> = () => {
  return (
    <AuthenticationStackNavigator.Navigator
      screenOptions={{headerShown: false}}>
      <AuthenticationStackNavigator.Screen
        name={ROUTES.Splash}
        component={Splash}
      />
      <AuthenticationStackNavigator.Screen
        name={ROUTES.Login}
        component={Login}
      />
      <AuthenticationStackNavigator.Screen
        name={ROUTES.CredentialCollector}
        component={CredentialCollector}
      />
      <AuthenticationStackNavigator.Screen
        name={ROUTES.InvestorInfoCollector}
        component={InvestorInfoSelector}
      />
    </AuthenticationStackNavigator.Navigator>
  );
};
