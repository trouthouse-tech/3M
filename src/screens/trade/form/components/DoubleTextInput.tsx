import {Fonts} from '../../../../styles';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {DEVICE_WIDTH} from '../../../../styles/util';
// @ts-ignore
import Icon from 'react-native-vector-icons/Ionicons';
import {TextInputProps} from './types';
Icon.loadFont();

type DoubleTextInputInputProps = {
  label: string;
  inputs: TextInputProps[];
};

export function DoubleTextInput(props: DoubleTextInputInputProps) {
  function showHelpText(title: string, subtitle: string) {
    Alert.alert(title, subtitle, [
      {
        text: 'OK',
        onPress: () => {},
      },
    ]);
  }

  const inputComponents = props.inputs.map((input) => {
    const {helpText, isMutable, onChange, label, value, isNumber} = input;

    return (
      <View style={styles.inputItem} key={label}>
        <Text style={styles.inputLabel}>{label}</Text>
        {helpText && (
          <TouchableOpacity
            onPress={() => showHelpText(helpText?.title, helpText?.subtitle)}
            style={styles.helpText}
            activeOpacity={0}>
            <Icon
              style={styles.helpIcon}
              name="help-circle-outline"
              size={20}
              color="black"
            />
          </TouchableOpacity>
        )}
        <TextInput
          style={[isMutable ? styles.inputBox : null, styles.inputText]}
          onChangeText={(text) => onChange(text)}
          value={value}
          editable={isMutable}
          keyboardType={isNumber ? 'number-pad' : 'default'}
        />
      </View>
    );
  });

  return (
    <View style={styles.row}>
      <Text style={styles.label}>{props.label}:</Text>
      <View style={styles.inputComponents}>{inputComponents}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: Fonts.larger,
  },

  row: {
    marginLeft: 10,
    margin: 5,
  },

  helpIcon: {
    width: 25,
    textAlign: 'center',
    marginRight: 10,
  },

  helpText: {},

  inputItem: {
    flexDirection: 'row',
    marginRight: 10,
  },

  inputLabel: {
    fontSize: Fonts.normal,
  },

  inputBox: {
    fontSize: Fonts.large,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    color: 'black',
    width: DEVICE_WIDTH / 5,
    textAlign: 'center',
  },

  inputText: {
    fontSize: Fonts.normal,
    fontWeight: 'bold',
    marginLeft: 10,
  },

  inputComponents: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
});
