import {Option, Quote} from '../../model';

export type TradeState = {
  options: Option[];
  quote: Quote | null;
};

type Action = {
  type: string;
};

export type AddOptionsAction = Action & {
  options: Option[];
};

export type AddQuoteAction = Action & {
  quote: Quote;
};

export type TradeAction = AddOptionsAction | AddQuoteAction;
