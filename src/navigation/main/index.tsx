import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ROUTES} from '../../util/routes';
import {TabParamList} from './types';
import {HomeStack} from '../home';
import {TradeStack} from '../trade';
import {MeStack} from '../me';
// @ts-ignore
import Icon from 'react-native-vector-icons/Entypo';
import {Colors} from '../../styles';
Icon.loadFont();
// @ts-ignore
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
MaterialIcon.loadFont();
// @ts-ignore
import IonIcon from 'react-native-vector-icons/Ionicons';
IonIcon.loadFont();
// @ts-ignore
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';

const Tab = createBottomTabNavigator<TabParamList>();

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName={ROUTES.Trade}
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          let icon;

          if (route.name === ROUTES.Home) {
            icon = <IonIcon name="home" size={size} color={color} />;
          } else if (route.name === ROUTES.Trade) {
            icon = (
              <FontAwesomeIcon name="exchange-alt" size={size} color={color} />
            );
          } else {
            icon = <MaterialIcon name="person" size={size} color={color} />;
          }
          return icon;
        },
      })}
      tabBarOptions={{
        activeTintColor: Colors.main_green,
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen name={ROUTES.Home} component={HomeStack} />
      <Tab.Screen name={ROUTES.Trade} component={TradeStack} />
      <Tab.Screen name={ROUTES.Me} component={MeStack} />
    </Tab.Navigator>
  );
}
