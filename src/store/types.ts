import {UserState} from './user/types';
import {OnboardingQuestionState} from './onboarding/types';
import {TradeState} from './trade/types';

export type AppState = {
  user: UserState;
  onboarding: OnboardingQuestionState;
  tradeReducer: TradeState;
};
