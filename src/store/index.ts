import {createStore, combineReducers} from 'redux';
import {AppState} from './types';
import {userReducer} from './user/reducer';
import {onboarding} from './onboarding/reducer';
import {tradier} from './tradier/reducer';

const rootReducer = combineReducers<AppState>({
  userReducer,
  onboarding,
  tradier,
});

const store = createStore(rootReducer);

export default store;
