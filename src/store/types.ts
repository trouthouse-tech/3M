import {UserState} from './user/types';
import {OnboardingQuestionState} from './onboarding/types';

export type AppState = {
  userReducer: UserState;
  onboarding: OnboardingQuestionState;
};
