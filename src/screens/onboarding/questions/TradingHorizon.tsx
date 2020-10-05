import MultipleChoiceCollector from '../../../components/MultipleChoiceCollector';
import React from 'react';
import {AppState} from '../../../store/types';
import {connect} from 'react-redux';
import {OnboardingStackProps} from '../../../navigation/onboarding/types';
import {ROUTES} from '../../../util/routes';
import store from '../../../store';
import {answerMultipleChoice} from '../../../store/onboarding/actions';

const question = "What's your time horizon for holding a position?";
const answers = [
  'Up to 3 weeks (day / swing trader)',
  '1-3 months (position trader)',
  '6+ months (long term investor)',
];

function TradingHorizonBase(props: OnboardingStackProps) {
  console.log('props: ', props);

  function handleOnSelect(answer: number) {
    store.dispatch(answerMultipleChoice(2, answer));
    props.navigation.push(ROUTES.ThreeMPurpose);
  }

  return (
    <MultipleChoiceCollector
      numOfSteps={4}
      currentStep={2}
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

export const TradingHorizon = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TradingHorizonBase);
