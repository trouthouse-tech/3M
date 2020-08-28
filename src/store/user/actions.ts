import {EditProfileAction, LoginAction} from './types';
import {Investor} from '../../model';

export enum USER_ACTION_TYPES {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  EDIT_PROFILE = 'EDIT_PROFILE',
}

// login
export const loginInvestor = (email: string, user: Investor): LoginAction => ({
  type: USER_ACTION_TYPES.LOGIN,
  email,
  user,
});

export const updateStudent = (user: Investor): EditProfileAction => ({
  type: USER_ACTION_TYPES.EDIT_PROFILE,
  user,
});
