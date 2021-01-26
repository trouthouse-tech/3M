import React from 'react';

import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';

import {ActionListItemProps} from '../types';
import {Colors, Fonts} from '../../../styles';
// @ts-ignore
import {sanFranciscoWeights} from 'react-native-typography';
import IonIcon from 'react-native-vector-icons/Ionicons';
IonIcon.loadFont();

const ListItem: React.FC<ActionListItemProps> = ({title, route, onPress}) => {
  const bottomStyles = title === 'Support' ? null : styles.bottomBorder;
  return (
    <View style={[styles.listItemStyle, bottomStyles]}>
      <TouchableOpacity
        onPress={() => onPress!(route)}
        style={styles.touchStyle}>
        <View>
          <Text style={styles.textStyle}>{title}</Text>
        </View>
        <IonIcon name="ios-arrow-forward" size={25} color={Colors.gray} />
      </TouchableOpacity>
    </View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  listItemStyle: {
    // borderBottomWidth: StyleSheet.hairlineWidth,
    padding: 20,
    paddingVertical: 20,
    borderRadius: 15,
  },
  touchStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  textStyle: {
    fontSize: Fonts.small,
    fontWeight: '600',
    color: Colors.black,
    ...sanFranciscoWeights.medium,
  },

  bottomBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.gray,
  },
});
