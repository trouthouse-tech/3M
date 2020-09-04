import {TradierCredentialsAction, TradierCredentialsState} from './types';
import {TRADIER_ACTION_TYPES} from './actions';

export const TradierCredentialsInitialState: TradierCredentialsState = {
  authCode: '',
  accessToken: '',
  tokenExpiration: '',
  secondsUntilTokenExpire: -1,
  clientId: 'hSPco1otJoZXyfBiR3tFMPg0WPXPaTuI',
  isAuthenticated: false,
};

export const tradier = (
  state: TradierCredentialsState = TradierCredentialsInitialState,
  action: TradierCredentialsAction,
) => {
  switch (action.type) {
    case TRADIER_ACTION_TYPES.UPDATE_CREDENTIALS:
      return Object.assign({}, state, action.credentials);
    default:
      return state;
  }
};
