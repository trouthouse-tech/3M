import {EditProfileAction, LoginAction, UserAction, UserState} from './types';
import {USER_ACTION_TYPES} from './actions';

export const InitialState: UserState = {};

export const userReducer = (
  state: UserState = InitialState,
  action: UserAction,
) => {
  switch (action.type) {
    case USER_ACTION_TYPES.LOGIN:
      let {email, user} = <LoginAction>action;
      return Object.assign({}, state, {email, ...user});
    case USER_ACTION_TYPES.EDIT_PROFILE:
      return Object.assign({}, state, (<EditProfileAction>action).user);
    default:
      return state;
  }
};
