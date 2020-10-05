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
import {HelpText} from './types';
Icon.loadFont();

type InlineFormTextInputProps = {
  label: string;
  onChange(text: string): void;
  helpText?: HelpText;
  isMutable: boolean;
  value: string;
  isNumber?: boolean;
};

export function FormTextInput(props: InlineFormTextInputProps) {
  const {label, helpText, isMutable, onChange, value, isNumber} = props;

  function showHelpText() {
    Alert.alert(helpText?.title!, helpText?.subtitle!, [
      {
        text: 'OK',
        onPress: () => {},
      },
    ]);
  }

  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}:</Text>
      {helpText && (
        <TouchableOpacity
          onPress={() => showHelpText()}
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
}

const styles = StyleSheet.create({
  label: {
    fontSize: Fonts.larger,
    alignSelf: 'center',
  },

  row: {
    flexDirection: 'row',
    marginLeft: 10,
    margin: 2,
  },

  helpIcon: {
    width: 25,
    textAlign: 'center',
    marginRight: 10,
  },

  helpText: {},

  inputBox: {
    fontSize: Fonts.large,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    color: 'black',
    width: DEVICE_WIDTH / 3.5,
    textAlign: 'center',
  },

  inputText: {
    fontSize: Fonts.larger,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});
