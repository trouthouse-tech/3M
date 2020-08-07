import React from 'react';
import LargeButton from '../LargeButton';
import {Colors} from '../../../styles';
import {ButtonProps} from '../types';

export const LargeHallowSquareOnPress = (props: ButtonProps) => {
  return <LargeButton {...props} buttonColor={Colors.white} />;
};
