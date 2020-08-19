import {LoginAction} from './types';
import {Investor} from '../../model';

export enum USER_ACTION_TYPES {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
}

// login
export const loginInvestor = (email: string, user: Investor): LoginAction => ({
  type: USER_ACTION_TYPES.LOGIN,
  email,
  user,
});
