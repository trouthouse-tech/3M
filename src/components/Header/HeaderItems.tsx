import React from 'react';
import {Text} from 'react-native';
// @ts-ignore
import EntypoIcon from 'react-native-vector-icons/Entypo';
EntypoIcon.loadFont();
// @ts-ignore
import IonIcon from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../styles';
IonIcon.loadFont();

export const BackButton = (
  <EntypoIcon name="chevron-thin-left" size={25} color={Colors.gray} />
);

export const BackArrow = (
  <IonIcon name="ios-arrow-back-outline" size={25} color={Colors.gray} />
);

export const LogoutButton = (
  <EntypoIcon name="log-out" size={25} color={Colors.gray} />
);

export const ChatButton = <Text>Chat</Text>;

export const ClearButton = <Text>Clear</Text>;
