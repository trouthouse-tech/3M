import MultipleChoiceCollector from '../../../components/MultipleChoiceCollector';
import React from 'react';
import {OnboardingStackProps} from '../../../navigation/onboarding/types';
import {AppState} from '../../../store/types';
import {connect} from 'react-redux';
import store from '../../../store';
import {answerMultipleChoice} from '../../../store/onboarding/actions';
import {ROUTES} from '../../../util/routes';

const question = "What's your money management approach?";
const answers = ['Conservative', 'Balanced', 'Aggressive'];

function MoneyManagementBase(props: OnboardingStackProps) {
  console.log('props: ', props);

  function handleSelection(number: number) {
    store.dispatch(answerMultipleChoice(1, number));
    props.navigation.push(ROUTES.TradingHorizon);
    console.log('MoneyManagementBase number: ', number);
  }

  return (
    <MultipleChoiceCollector
      numOfSteps={4}
      currentStep={1}
      onSelect={(number) => handleSelection(number)}
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

export const MoneyManagement = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MoneyManagementBase);
