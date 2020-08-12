import React from 'react';
// import 'react-native-gesture-handler';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {ROUTES} from './src/util/routes';
import {OnboardingStack} from './src/navigation/onboarding';
import MainTabNavigator from './src/navigation/main';

type RootStackParamList = {
  Onboarding: undefined;
  Main: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
  },
};

const App = () => {
  return (
    <NavigationContainer theme={MyTheme}>
      <RootStack.Navigator headerMode="none">
        <RootStack.Screen
          name={ROUTES.Onboarding}
          component={OnboardingStack}
        />
        <RootStack.Screen name={ROUTES.Main} component={MainTabNavigator} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
