import {UserState} from './user/types';
import {OnboardingQuestionState} from './onboarding/types';

export type AppState = {
  user: UserState;
  onboarding: OnboardingQuestionState;
};
