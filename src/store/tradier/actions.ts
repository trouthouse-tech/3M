import {TradierCredentialsAction} from './types';
import {TradierCredentials} from '../../model';

export enum TRADIER_ACTION_TYPES {
  UPDATE_CREDENTIALS = 'UPDATE_CREDENTIALS',
}

export const updateCredentials = (
  credentials: TradierCredentials,
): TradierCredentialsAction => ({
  type: TRADIER_ACTION_TYPES.UPDATE_CREDENTIALS,
  credentials,
});
