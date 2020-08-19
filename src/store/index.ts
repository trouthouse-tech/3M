import {createStore, combineReducers} from 'redux';
import {AppState} from './types';
import {user} from './user/reducer';

const rootReducer = combineReducers<AppState>({
  user,
});

const store = createStore(rootReducer);

export default store;
