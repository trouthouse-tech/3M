import {createStore, combineReducers} from 'redux';
import {AppState} from './types';
import {user} from './user/reducer';
import {onboarding} from './onboarding/reducer';
import {tradeReducer} from './trade/reducer';

const rootReducer = combineReducers<AppState>({
  user,
  onboarding,
  tradeReducer,
});

const store = createStore(rootReducer);

export default store;
