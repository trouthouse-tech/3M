import {Investor} from '../../model';

export type UserState = Investor;

type Action = {
  type: string;
};

export type LoginAction = Action & {
  email: string;
  user: Investor;
};

export type UserAction = LoginAction;
