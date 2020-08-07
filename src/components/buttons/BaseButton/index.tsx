import React from 'react';
import {TouchableHighlight, StyleSheet} from 'react-native';

interface BaseButtonProps {
  onPress(): void;
  buttonStyle: {};
  child: React.ReactNode;
}

export default function BaseButton(props: BaseButtonProps) {
  const {onPress, buttonStyle, child} = props;
  return (
    <TouchableHighlight
      style={[styles.button, buttonStyle]}
      onPress={() => onPress()}
      testID="basebutton">
      {child}
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
