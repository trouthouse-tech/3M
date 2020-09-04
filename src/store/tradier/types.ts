import {TradierCredentials} from '../../model';

export type TradierCredentialsState = TradierCredentials;

type Action = {
  type: string;
};

export type UpdateCredentialAction = Action & {
  credentials: TradierCredentials;
};

export type TradierCredentialsAction = UpdateCredentialAction;
