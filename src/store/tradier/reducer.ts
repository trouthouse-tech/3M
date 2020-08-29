import {TradierCredentialsAction, TradierCredentialsState} from './types';
import {TRADIER_ACTION_TYPES} from './actions';

export const InitialState: TradierCredentialsState = {};

export const tradier = (
  state: TradierCredentialsState = InitialState,
  action: TradierCredentialsAction,
) => {
  switch (action.type) {
    case TRADIER_ACTION_TYPES.UPDATE_CREDENTIALS:
      return Object.assign({}, state, action.credentials);
    default:
      return state;
  }
};
