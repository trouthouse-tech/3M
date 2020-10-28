import {Option, Quote, Spread} from '../../model';
import {Order, Trade} from '../../model';

export type TradeState = {
  options: {
    calls: Option[];
    puts: Option[];
    expirationDates: string[];
  };
  quotes: {
    [key: string]: Quote;
  };
  potentialTrades: Trade[];
  accountId: string;
  orders: Order[] | Spread[];
  trades: string[];
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

export type AddOrderAction = Action & {
  order: Order | Spread;
};

export type AddOrdersAction = Action & {
  orders: Order[] | Spread[];
};

export type AddPositionsAction = Action & {
  positions: Order[] | Spread[];
};

export type AddTradeAction = Action & {
  trade: string;
};

export type AddTradesAction = Action & {
  trades: string[];
};

export type TradeAction =
  | AddOptionsAction
  | AddQuoteAction
  | AddPotentialTrades
  | ResetOptionsAction
  | AddExpirationDatesAction
  | AddAccountIdAction
  | AddOrdersAction
  | AddTradeAction
  | AddTradesAction;
