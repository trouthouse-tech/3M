import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Colors} from '../../styles';

type Props = {
  steps: number;
  currentStep: number;
};

export default function ProgressBar({steps, currentStep}: Props) {
  const stepComponents = [];
  for (let i = 0; i < steps; i++) {
    let isFilled = i <= currentStep;
    let isLastStep = i === steps - 1;
    stepComponents.push(
      <View
        style={[
          styles.step,
          isFilled ? styles.filledStep : null,
          isLastStep ? styles.lastStep : null,
        ]}
        key={i}
      />,
    );
  }
  return <View style={styles.bar}>{stepComponents}</View>;
}

const styles = StyleSheet.create({
  bar: {
    height: 10,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.main_green,
  },

  step: {
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: Colors.main_green,
  },

  filledStep: {
    backgroundColor: Colors.main_green,
  },

  lastStep: {
    borderRightWidth: 0,
  },
});
