import React from 'react';

import {StyleSheet, TextInput} from 'react-native';
import {Fonts, Utils} from '../../../styles';

type InputProps = {
  placeholder: string;
  onChangeText(text: string): void;
  value: string;
  autoFocus: boolean;
  secureTextEntry: boolean;
};

export function StandardTextInput(props: InputProps) {
  const {placeholder, onChangeText, value, autoFocus, secureTextEntry} = props;

  return (
    <TextInput
      placeholder={placeholder}
      autoCapitalize="none"
      autoFocus={autoFocus || false}
      secureTextEntry={secureTextEntry || false}
      style={styles.textInput}
      onChangeText={(username) => onChangeText(username)}
      value={value}
    />
  );
}

const styles = StyleSheet.create({
  textInput: {
    ...Fonts.large,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    marginVertical: 10,
    width: Utils.DEVICE_WIDTH / 1.3,
    height: 60,
  },
});
