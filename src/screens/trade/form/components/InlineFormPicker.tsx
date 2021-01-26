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
  size: number;
};

export function InlineFormPicker(props: InlineFormPickerProps) {
  const {label, onChange, helpText, items, size} = props;

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
      {size === 0 ? (
        <RNPickerSelect
          onValueChange={(selectedItem) => onChange(selectedItem)}
          items={pickerItems}
          // @ts-ignore
          style={smallPickerSelectStyles}
        />
      ) : (
        <RNPickerSelect
          onValueChange={(selectedItem) => onChange(selectedItem)}
          items={pickerItems}
          // @ts-ignore
          style={largePickerSelectStyles}
        />
      )}
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

const pickerStyles = {
  fontSize: Fonts.large,
  paddingVertical: 5,
  // paddingHorizontal: 10,
  borderWidth: 1,
  borderColor: 'gray',
  borderRadius: 5,
  color: 'black',
  // paddingRight: 30, // to ensure the text is never behind the icon
  textAlign: 'center',
};

const smallPickerSelectStyles = StyleSheet.create({
  inputIOS: {
    ...pickerStyles,
    width: DEVICE_WIDTH / 3,
  },
  inputAndroid: {
    ...pickerStyles,
    width: DEVICE_WIDTH / 3,
  },
});

const largePickerSelectStyles = StyleSheet.create({
  inputIOS: {
    ...pickerStyles,
    width: DEVICE_WIDTH / 1.75,
    marginLeft: 10,
  },
  inputAndroid: {
    ...pickerStyles,
    width: DEVICE_WIDTH / 1.75,
    marginLeft: 10,
  },
});
