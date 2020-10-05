import {
  EditProfileAction,
  LoginAction,
  UpdateRecentlyViewedSymbolsAction,
  UserAction,
  UserState,
} from './types';
import {USER_ACTION_TYPES} from './actions';
import {RecentlyViewedCompany} from '../../model';

const InitialState: UserState = {
  recentlyViewed: [],
};

export const user = (state: UserState = InitialState, action: UserAction) => {
  switch (action.type) {
    case USER_ACTION_TYPES.LOGIN:
      let {email, user} = <LoginAction>action;
      return Object.assign({}, state, {email, ...user});
    case USER_ACTION_TYPES.EDIT_PROFILE:
      return Object.assign({}, state, (<EditProfileAction>action).user);
    case USER_ACTION_TYPES.UPDATE_RECENTLY_VIEWED_COMPANIES:
      return handleNewSymbolAddedToRecentlyViewed(
        state,
        (<UpdateRecentlyViewedSymbolsAction>action).company,
      );
    default:
      return state;
  }
};

function handleNewSymbolAddedToRecentlyViewed(
  prevUser: UserState,
  company: RecentlyViewedCompany,
) {
  if (prevUser.recentlyViewed!.some((o) => o.symbol === company.symbol)) {
    return prevUser;
  } else {
    prevUser.recentlyViewed?.push(company);
    return prevUser;
  }
}
