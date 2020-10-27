import {Option, Quote} from '../../model';
import {Order, Trade} from '../../model';

export type TradeState = {
  options: {
    calls: Option[];
    puts: Option[];
    expirationDates: string[];
  };
  quote: Quote | null;
  potentialTrades: Trade[];
  accountId: string;
  orders: Order[];
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

export type AddPotentialTrades = Action & {
  potentialTrades: Trade[];
};

export type ResetOptionsAction = Action;

export type AddExpirationDatesAction = Action & {
  expirationDates: string[];
};

export type AddAccountIdAction = Action & {
  accountId: string;
};

export type AddOrdersAction = Action & {
  orders: Order[];
};

export type AddPositionsAction = Action & {
  positions: Order[];
};

export type TradeAction =
  | AddOptionsAction
  | AddQuoteAction
  | AddPotentialTrades
  | ResetOptionsAction
  | AddExpirationDatesAction
  | AddAccountIdAction
  | AddOrdersAction;
