import React from 'react';
import BaseButton from '../BaseButton';
import {StyleSheet, Text} from 'react-native';
import {Utils} from '../../../styles';

type ButtonProps = {
  onPress(): void;
  primaryColor: string;
  secondaryColor: string;
  text: string;
  selected?: boolean;
};

export default function LargeHallowButton(props: ButtonProps) {
  const {onPress, primaryColor, secondaryColor, text, selected} = props;
  const buttonStyles = {
    backgroundColor: selected ? secondaryColor : primaryColor,
    borderColor: selected ? primaryColor : secondaryColor,
    borderWidth: 1,
  };

  const textStyles = {
    color: selected ? 'white' : 'black',
  };

  const child = <Text style={textStyles}>{text}</Text>;

  return (
    <BaseButton
      onPress={() => onPress()}
      buttonStyle={[styles.button, buttonStyles]}
      child={child}
    />
  );
}

const styles = StyleSheet.create({
  button: {
    width: Utils.DEVICE_WIDTH / 1.2,
    height: Utils.DEVICE_HEIGHT / 20,
    borderRadius: 20,
  },
});
