import React from 'react';
import LargeButton from '../LargeButton';
import {ButtonProps} from '../types';

export const LargeSquareOnPress = (props: ButtonProps) => {
  return <LargeButton borderColor={props.buttonColor} {...props} />;
};
