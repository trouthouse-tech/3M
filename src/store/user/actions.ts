import {
  EditProfileAction,
  LoginAction,
  UpdateRecentlyViewedSymbolsAction,
} from './types';
import {Investor, RecentlyViewedCompany} from '../../model';

export enum USER_ACTION_TYPES {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  EDIT_PROFILE = 'EDIT_PROFILE',
  UPDATE_RECENTLY_VIEWED_COMPANIES = 'UPDATE_RECENTLY_VIEWED_COMPANIES',
}

// login
export const loginInvestor = (email: string, user: Investor): LoginAction => ({
  type: USER_ACTION_TYPES.LOGIN,
  email,
  user,
});

export const updateInvestor = (user: Investor): EditProfileAction => ({
  type: USER_ACTION_TYPES.EDIT_PROFILE,
  user,
});

export const updateRecentlyViewedSymbols = (
  company: RecentlyViewedCompany,
): UpdateRecentlyViewedSymbolsAction => ({
  type: USER_ACTION_TYPES.UPDATE_RECENTLY_VIEWED_COMPANIES,
  company,
});
