import React from 'react';
import LargeButton from '../LargeButton';
import {Colors} from '../../../styles';
import {ButtonProps} from '../types';

export default function LargeHallowSquareOnPress(props: ButtonProps) {
  return <LargeButton {...props} buttonColor={Colors.white} />;
}
