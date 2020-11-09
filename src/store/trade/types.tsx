import {Option, Position, Quote, Spread} from '../../model';
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
  trades: {
    [key: string]: Trade;
  };
  positions: {
    [key: string]: Position,
  };
  orderIds: string[];
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

export type AddPositionAction = Action & {
  position: Position;
};

export type AddPositionsAction = Action & {
  positions: Position[];
};

export type RemovePositionAction = Action & {
  position: string;
};

export type RemovePositionsAction = Action & {
  positions: string[];
};

export type AddTradeAction = Action & {
  trade: Trade;
};

export type AddTradesAction = Action & {
  trades: Trade[];
};

export type AddOrderIdAction = Action & {
  orderId: string;
};

export type AddOrderIdsAction = Action & {
  orderIds: string[];
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
  | AddTradesAction
  | AddPositionAction
  | AddPositionsAction
  | AddOrderIdAction
  | AddOrderIdsAction
  | RemovePositionAction
  | RemovePositionsAction;
