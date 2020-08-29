import {createStore, combineReducers} from 'redux';
import {AppState} from './types';
import {user} from './user/reducer';
import {onboarding} from './onboarding/reducer';
import {tradier} from './tradier/reducer';

const rootReducer = combineReducers<AppState>({
  user,
  onboarding,
  tradier,
});

const store = createStore(rootReducer);

export default store;
