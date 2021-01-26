import React from 'react';
import BaseButton from '../BaseButton';
import {StyleSheet} from 'react-native';
import {Utils} from '../../../styles';

type ButtonProps = {
  onPress(): void;
  primaryColor: string;
  secondaryColor: string;
  child: Element;
};

export default function SmallHallowButton(props: ButtonProps) {
  const {onPress, primaryColor, secondaryColor, child} = props;
  const customStyles = {
    backgroundColor: primaryColor,
    borderColor: secondaryColor,
    borderWidth: 1,
  };

  return (
    <BaseButton
      onPress={() => onPress()}
      buttonStyle={[styles.button, customStyles]}
      child={child}
    />
  );
}

const styles = StyleSheet.create({
  button: {
    width: Utils.DEVICE_WIDTH / 2,
    height: Utils.DEVICE_HEIGHT / 20,
    borderRadius: 20,
  },
});
