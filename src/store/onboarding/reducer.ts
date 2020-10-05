import {OnboardingQuestionAction, OnboardingQuestionState} from './types';
import {ONBOARDING_QUESTION_ACTION_TYPES} from './actions';

const InitialState: OnboardingQuestionState = {};

export const onboarding = (
  state: OnboardingQuestionState = InitialState,
  action: OnboardingQuestionAction,
) => {
  switch (action.type) {
    case ONBOARDING_QUESTION_ACTION_TYPES.MULTIPLE_CHOICE:
      return Object.assign({}, state, createNewObj(state, action));
    case ONBOARDING_QUESTION_ACTION_TYPES.OPEN_ENDED:
      return Object.assign({}, state, createNewObj(state, action));
    default:
      return state;
  }
};

function createNewObj(
  state: OnboardingQuestionState,
  action: OnboardingQuestionAction,
) {
  const {index, answer} = action;
  const newState = state;
  newState[index] = answer;
  return newState;
}
