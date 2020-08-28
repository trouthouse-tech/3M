import {createStore, combineReducers} from 'redux';
import {AppState} from './types';
import {user} from './user/reducer';
import {onboarding} from './onboarding/reducer';

const rootReducer = combineReducers<AppState>({
  user,
  onboarding,
});

const store = createStore(rootReducer);

export default store;
