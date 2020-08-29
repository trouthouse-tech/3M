import {TradierCredentials} from '../../model';

export type TradierCredentialsState = {};

type Action = {
  type: string;
};

export type UpdateCredentialAction = Action & {
  credentials: TradierCredentials;
};

export type TradierCredentialsAction = UpdateCredentialAction;
