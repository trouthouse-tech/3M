import {Investor, RecentlyViewedCompany} from '../../model';

export type UserState = Investor;

type Action = {
  type: string;
};

export type LoginAction = Action & {
  email: string;
  user: Investor;
};

export type EditProfileAction = Action & {
  user: Investor;
};

export type UpdateRecentlyViewedSymbolsAction = Action & {
  company: RecentlyViewedCompany;
};

export type UserAction =
  | LoginAction
  | EditProfileAction
  | UpdateRecentlyViewedSymbolsAction;
