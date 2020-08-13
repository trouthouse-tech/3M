import React from 'react';
// import 'react-native-gesture-handler';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {ROUTES} from './src/util/routes';
import {OnboardingStack} from './src/navigation/onboarding';
import MainTabNavigator from './src/navigation/main';
import {SafeAreaView, StatusBar} from 'react-native';

type RootStackParamList = {
  Onboarding: undefined;
  Main: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

// React Navigation defaults to a gray background - we want white
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
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{flex: 1}}>
        <RootStack.Navigator headerMode="none">
          <RootStack.Screen
            name={ROUTES.Onboarding}
            component={OnboardingStack}
          />
          <RootStack.Screen name={ROUTES.Main} component={MainTabNavigator} />
        </RootStack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default App;
