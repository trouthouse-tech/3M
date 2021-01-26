import React, {useState} from 'react';
import {StyleSheet, View, Text, SafeAreaView, TextInput} from 'react-native';
import ProgressBar from '../ProgressBar';
import {Colors, Fonts} from '../../styles';
import {LargeSquareOnPress} from '../buttons';
import Header from '../Header';
import {OnboardingStackProps} from '../../navigation/onboarding/types';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '../../styles/util';
import {BackArrow} from '../Header/HeaderItems';

type Props = {
  onFinish(answer: string): void;
  numOfSteps: number;
  currentStep: number;
  question: string;
  buttonText?: string;
} & OnboardingStackProps;

export default function OpenEndedCollector({
  onFinish,
  numOfSteps,
  currentStep,
  question,
  navigation,
  buttonText,
}: Props) {
  const [answer, setAnswer] = useState('');

  function handleContinue() {
    onFinish(answer);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header
        leftButton={{
          child: BackArrow,
          onclick: () => navigation.goBack(),
        }}
      />
      <ProgressBar steps={numOfSteps} currentStep={currentStep} />
      <Text style={styles.title}>{question}</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          numberOfLines={5}
          editable
          multiline
          value={answer}
          onChangeText={(text) => setAnswer(text)}
        />
        <LargeSquareOnPress
          onPress={() => handleContinue()}
          text={buttonText ? buttonText : 'Continue'}
          textColor={Colors.white}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    ...Fonts.h1,
    alignSelf: 'center',
    marginTop: 20,
    width: DEVICE_WIDTH / 1.2,
    textAlign: 'center',
  },

  form: {
    flex: 1,
    alignItems: 'center',
  },

  input: {
    borderWidth: 1,
    borderRadius: 10,
    width: DEVICE_WIDTH / 1.2,
    height: DEVICE_HEIGHT / 5,
    padding: 10,
    margin: 10,
    fontSize: Fonts.large,
  },
});
