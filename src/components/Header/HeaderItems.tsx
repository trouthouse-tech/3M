// @ts-ignore
import Icon from 'react-native-vector-icons/Entypo';
Icon.loadFont();
import React from 'react';
import {Text} from 'react-native';

export const BackButton = (
  <Icon name="chevron-thin-left" size={25} color="black" />
);

export const LogoutButton = <Icon name="log-out" size={25} color="black" />;

export const ChatButton = <Text>Chat</Text>;
