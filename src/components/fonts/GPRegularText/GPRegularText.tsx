import React from 'react';
import {Text, TextProps, StyleSheet} from 'react-native';
import {Fonts} from '../../../styles/fonts';

type GPTextProps = {
  style?: TextProps;
  text: string;
};

export const GPRegularText = (props: GPTextProps) => {
  const {style, text} = props;
  return <Text style={[styles.main, style]}>{text}</Text>;
};

const styles = StyleSheet.create({
  main: {
    fontFamily: Fonts.MAIN_REGULAR,
  },
});
