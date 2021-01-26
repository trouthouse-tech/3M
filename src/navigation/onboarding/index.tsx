import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ROUTES} from '../../util/routes';
import {OnboardingStackParamList} from './types';
import {TradingExperience} from '../../screens/onboarding/questions/TradingExperience';
import {OnboardingLanding} from '../../screens/onboarding';
import {MoneyManagement} from '../../screens/onboarding/questions/MoneyManagement';
import {TradingHorizon} from '../../screens/onboarding/questions/TradingHorizon';
import {ThreeMPurpose} from '../../screens/onboarding/questions/3MPurpose';

const OnboardingStackNavigator = createStackNavigator<
  OnboardingStackParamList
>();

export const OnboardingStack = () => {
  return (
    <OnboardingStackNavigator.Navigator screenOptions={screenOptions}>
      <OnboardingStackNavigator.Screen
        name={ROUTES.Onboarding}
        component={OnboardingLanding}
      />
      <OnboardingStackNavigator.Screen
        name={ROUTES.TradingExperience}
        component={TradingExperience}
      />
      <OnboardingStackNavigator.Screen
        name={ROUTES.MoneyManagement}
        component={MoneyManagement}
      />
      <OnboardingStackNavigator.Screen
        name={ROUTES.TradingHorizon}
        component={TradingHorizon}
      />
      <OnboardingStackNavigator.Screen
        name={ROUTES.ThreeMPurpose}
        component={ThreeMPurpose}
      />
    </OnboardingStackNavigator.Navigator>
  );
};

const screenOptions = {
  headerShown: false, // We will create our own header
};
