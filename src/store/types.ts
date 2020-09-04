import {UserState} from './user/types';
import {OnboardingQuestionState} from './onboarding/types';
import {TradierCredentialsState} from './tradier/types';

export type AppState = {
  userReducer: UserState;
  onboarding: OnboardingQuestionState;
  tradier: TradierCredentialsState;
};
