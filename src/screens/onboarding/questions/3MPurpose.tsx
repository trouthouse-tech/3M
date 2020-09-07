import React from 'react';
import {OnboardingStackProps} from '../../../navigation/onboarding/types';
import {AppState} from '../../../store/types';
import {connect} from 'react-redux';
import store from '../../../store';
import {answerOpenEnded} from '../../../store/onboarding/actions';
import {ROUTES} from '../../../util/routes';
import OpenEndedCollector from '../../../components/OpenEndedCollector';
import {OnboardingQuestionState} from '../../../store/onboarding/types';
import {updateInvestorDocument} from '../../../services/investor';
import {UserState} from '../../../store/user/types';
import {updateInvestor} from '../../../store/user/actions';

const question = 'What are your goals as a member of the 3M club?';

type Props = OnboardingStackProps & {
  onboarding: OnboardingQuestionState;
  user: UserState;
};

function ThreeMPurposeBase(props: Props) {
  console.log('props: ', props);

  function handleSubmission(answer: string) {
    // Update answer to question in store
    store.dispatch(answerOpenEnded(3, answer));

    updateInvestorDocument(props.user.email, {
      onboardingQuestions: props.onboarding,
      hasAnsweredOnboardingQuestions: true,
    });
    // Update store to indicate that the user has completed the onboarding process
    const updatedUser = props.user;
    updatedUser.hasAnsweredOnboardingQuestions = true;
    store.dispatch(updateInvestor(updatedUser));

    enterMainApplication();
  }

  function enterMainApplication() {
    props.navigation.navigate(ROUTES.Main);
  }

  return (
    <OpenEndedCollector
      numOfSteps={4}
      currentStep={3}
      onFinish={(answer) => handleSubmission(answer)}
      question={question}
      navigation={props.navigation}
      route={props.route}
      buttonText="Finish"
    />
  );
}

const mapStateToProps = (state: AppState) => ({
  user: state.userReducer,
  onboarding: state.onboarding,
});

const mapDispatchToProps = () => ({});

export const ThreeMPurpose = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ThreeMPurposeBase);
