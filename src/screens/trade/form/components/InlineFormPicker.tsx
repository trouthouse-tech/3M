import {Fonts} from '../../../../styles';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {PickerItemProps} from '@react-native-community/picker/typings/Picker';
import RNPickerSelect from 'react-native-picker-select';
import {DEVICE_WIDTH} from '../../../../styles/util';
// @ts-ignore
import Icon from 'react-native-vector-icons/Ionicons';
import {HelpText} from './types';
Icon.loadFont();

type InlineFormPickerProps = {
  label: string;
  onChange(text: string): void;
  items: PickerItemProps[];
  helpText?: HelpText;
};

export function InlineFormPicker(props: InlineFormPickerProps) {
  const {label, onChange, helpText, items} = props;

  const pickerItems = items.map((item) => {
    return {label: item.label as string, value: item.value.toString()};
  });

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
      <RNPickerSelect
        onValueChange={(selectedItem) => onChange(selectedItem)}
        items={pickerItems}
        style={pickerSelectStyles}
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
    // justifyContent: 'center',
    marginLeft: 10,
    margin: 5,
  },

  picker: {
    flex: 2,
    height: 50,
    width: 100,
  },

  helpIcon: {
    width: 25,
    textAlign: 'center',
    marginRight: 10,
    // alignSelf: 'center',
    // backgroundColor: 'red',
  },

  helpText: {},
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: Fonts.large,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    color: 'black',
    // paddingRight: 30, // to ensure the text is never behind the icon
    width: DEVICE_WIDTH / 3.5,
    textAlign: 'center',
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 15,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    width: DEVICE_WIDTH / 3.5,
  },
});
