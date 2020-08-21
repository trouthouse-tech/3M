import React from 'react';
import {Text} from 'react-native';
import BaseButton from '../BaseButton';

interface TextButtonProps {
  onPress(): void;
  buttonStyle: {};
  textStyle: {};
  text: string;
}

export default function TextButton(props: TextButtonProps) {
  const {onPress, buttonStyle, textStyle, text} = props;
  return (
    <BaseButton
      onPress={() => onPress()}
      buttonStyle={buttonStyle}
      child={<Text style={textStyle}>{text}</Text>}
    />
  );
}
