import React, {useState} from 'react';
import {StyleSheet, View, Text, SafeAreaView} from 'react-native';
import ProgressBar from '../ProgressBar';
import {Colors, Fonts} from '../../styles';
import {LargeSquareOnPress} from '../buttons';
import Header from '../Header';
import LargeHallowButton from '../buttons/LargeHallow';
import {OnboardingStackProps} from '../../navigation/onboarding/types';
import {DEVICE_WIDTH} from '../../styles/util';

type Props = {
  onSelect(answer: number): void;
  numOfSteps: number;
  currentStep: number;
  question: string;
  answers: string[];
} & OnboardingStackProps;

export default function MultipleChoiceCollector({
  onSelect,
  numOfSteps,
  currentStep,
  question,
  answers,
  navigation,
}: Props) {
  const [selectedAnswer, setSelectedAnswer] = useState(-1);

  function handleContinue() {
    if (selectedAnswer !== -1) {
      onSelect(selectedAnswer);
    }
  }

  function handleSelectedAnswer(num: number) {
    setSelectedAnswer(num);
  }

  const answerComponents = answers.map((value, index) => (
    <View style={styles.answerComponent} key={index}>
      <LargeHallowButton
        onPress={() => handleSelectedAnswer(index)}
        primaryColor={Colors.white}
        secondaryColor={Colors.main_green}
        selected={selectedAnswer === index}
        text={value}
        key={index}
      />
    </View>
  ));

  return (
    <SafeAreaView style={styles.container}>
      <Header goBack={() => navigation.goBack()} />
      <ProgressBar steps={numOfSteps} currentStep={currentStep} />
      <Text style={styles.title}>{question}</Text>
      <View style={styles.form}>
        <View style={styles.answers}>{answerComponents}</View>
        <LargeSquareOnPress
          onPress={() => handleContinue()}
          text="Continue"
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

  answers: {
    // flex: 1,
    margin: 10,
    justifyContent: 'space-around',
  },

  answerComponent: {
    marginVertical: 10,
  },

  answer: {
    ...Fonts.large,
  },
});
