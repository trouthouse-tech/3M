import {Picker} from '@react-native-community/picker';
import {Fonts} from '../../../../styles';
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  ItemValue,
  PickerItemProps,
} from '@react-native-community/picker/typings/Picker';

type FreeFormPickerProps = {
  label: string;
  onChange(text: ItemValue): void;
  value: string;
  items: PickerItemProps[];
};

export function FreeFormPicker(props: FreeFormPickerProps) {
  const {label, onChange, value, items} = props;

  const itemComponents = items.map((item) => {
    return (
      <Picker.Item value={item.value} label={item.label} key={item.value} />
    );
  });

  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Picker
        selectedValue={value}
        style={styles.picker}
        onValueChange={(itemValue) => onChange(itemValue)}>
        {itemComponents}
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: Fonts.larger,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },

  picker: {
    height: 50,
    width: 100,
  },
});
