import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {Fonts, Utils, Colors} from '../../../styles';
import BaseButton from '../BaseButton';
import {ButtonProps} from '../types';

export default function LargeButton({
  onPress,
  text,
  buttonColor,
  textColor,
  borderColor,
}: ButtonProps) {
  const child = (
    <Text style={[styles.buttonText, {color: textColor || Colors.white}]}>
      {text}
    </Text>
  );
  return (
    <BaseButton
      onPress={() => onPress()}
      buttonStyle={[
        styles.largeSquare,
        // eslint-disable-next-line react-native/no-inline-styles
        {
          backgroundColor: buttonColor || Colors.main_green,
          borderColor: borderColor || Colors.main_green,
          borderWidth: 1,
        },
      ]}
      child={child}
    />
  );
}

const styles = StyleSheet.create({
  largeSquare: {
    width: Utils.DEVICE_WIDTH / 1.2,
    height: Utils.DEVICE_HEIGHT / 12,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },

  buttonText: {
    fontSize: Fonts.normal,
    fontWeight: 'bold',
  },

  button: {
    width: Utils.DEVICE_WIDTH / 1.2,
    height: Utils.DEVICE_HEIGHT / 15,
    borderRadius: 10,
  },
});
