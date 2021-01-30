import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import { ROUTES } from '../../util/routes';
import { TabParamList } from './types';
import { HomeStack } from '../home';
import { TradeStack } from '../trade';
import { MeStack } from '../me';
// @ts-ignore
import Icon from 'react-native-vector-icons/Entypo';
import { Colors } from '../../styles';
Icon.loadFont();
// @ts-ignore
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
MaterialIcon.loadFont();
// @ts-ignore
import IonIcon from 'react-native-vector-icons/Ionicons';
IonIcon.loadFont();
// @ts-ignore
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

// const Tab = createBottomTabNavigator<TabParamList>();
const Tab = createMaterialBottomTabNavigator<TabParamList>();
export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      shifting={true}
      activeColor={Colors.main_green}
      inactiveColor={Colors.light_gray}
      barStyle={{ backgroundColor: '#f8f8f8' }}
      initialRouteName={ROUTES.Home}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, }) => {
          let icon;

          if (route.name === ROUTES.Home) {

            icon = <IonIcon name="home" size={26} color={color} style={{}} />;
          } else if (route.name === ROUTES.Trade) {
            icon = (
              <FontAwesomeIcon name="exchange" size={26} color={color} />
            );
          } else {
            icon = <MaterialIcon name="person" size={26} color={color} />;
          }
          return icon;
        },
      })}
    // tabBarOptions={{
    //   activeTintColor: Colors.main_green,
    //   inactiveTintColor: Colors.light_gray,
    //   showLabel: false,

    // }}
    >
      <Tab.Screen name={ROUTES.Trade} component={TradeStack} />
      <Tab.Screen name={ROUTES.Home} component={HomeStack} />
      {/* <Tab.Screen name={ROUTES.Trade} component={TradeStack} /> */}
      <Tab.Screen name={ROUTES.Me} component={MeStack} />
    </Tab.Navigator>
  );
}
