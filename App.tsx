import React, { useEffect } from 'react';
// import 'react-native-gesture-handler';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ROUTES } from './src/util/routes';
import { AuthenticationStack } from './src/navigation/authentication';
import MainTabNavigator from './src/navigation/main';
import { SafeAreaView, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/store';
import { OnboardingStack } from './src/navigation/onboarding';
import SplashScreen from 'react-native-splash-screen'
import { MenuProvider } from 'react-native-popup-menu';

type RootStackParamList = {
  Authentication: undefined;
  Main: undefined;
  Onboarding: undefined;
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

  useEffect(() => {
    SplashScreen.hide();
  });

  return (
    <Provider store={store}>
      <MenuProvider>
        <NavigationContainer theme={MyTheme}>
          <StatusBar barStyle="dark-content" />
          <SafeAreaView style={{ flex: 1 }}>
            <RootStack.Navigator headerMode="none">
              <RootStack.Screen
                name={ROUTES.Authentication}
                component={AuthenticationStack}
              />
              <RootStack.Screen name={ROUTES.Main} component={MainTabNavigator} />
              <RootStack.Screen
                name={ROUTES.Onboarding}
                component={OnboardingStack}
              />
            </RootStack.Navigator>
          </SafeAreaView>
        </NavigationContainer>
      </MenuProvider>
    </Provider>
  );
};

export default App;
