import MultipleChoiceCollector from '../../../components/MultipleChoiceCollector';
import React from 'react';
import {AppState} from '../../../store/types';
import {connect} from 'react-redux';
import {OnboardingStackProps} from '../../../navigation/onboarding/types';
import {ROUTES} from '../../../util/routes';
import store from '../../../store';
import {answerMultipleChoice} from '../../../store/onboarding/actions';

const question = 'What is your trading experience?';
const answers = [
  'New to trading',
  'I only have experience with stocks',
  'Beginning options trader (calls & puts)',
  'Intermediate (option spreads)',
  'Advanced (1-3 years)',
];

function TradingExperienceBase(props: OnboardingStackProps) {
  console.log('props: ', props);

  function handleOnSelect(answer: number) {
    store.dispatch(answerMultipleChoice(0, answer));
    props.navigation.push(ROUTES.MoneyManagement);
  }

  return (
    <MultipleChoiceCollector
      numOfSteps={4}
      currentStep={0}
      onSelect={(answer) => handleOnSelect(answer)}
      question={question}
      answers={answers}
      navigation={props.navigation}
      route={props.route}
    />
  );
}

const mapStateToProps = (state: AppState) => ({
  user: state.user,
  onboarding: state.onboarding,
});

const mapDispatchToProps = () => ({});

export const TradingExperience = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TradingExperienceBase);
