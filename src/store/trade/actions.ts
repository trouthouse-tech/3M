import {
  AddAccountIdAction,
  AddExpirationDatesAction,
  AddOptionsAction,
  AddOrdersAction,
  AddPotentialTrades,
  AddQuoteAction,
  ResetOptionsAction,
} from './types';
import {Option, Quote} from '../../model';
import {Order, Trade} from '../../screens/trade/results/types';

export enum TRADE_ACTION_TYPES {
  ADD_OPTIONS = 'ADD_OPTIONS',
  ADD_QUOTE = 'ADD_QUOTE',
  ADD_POTENTIAL_TRADES = 'ADD_POTENTIAL_TRADES',
  RESET_OPTIONS = 'RESET_OPTIONS',
  ADD_EXP_DATES = 'ADD_EXP_DATES',
  ADD_ACCOUNT_ID = 'ADD_ACCOUNT_ID',
  ADD_ORDERS = 'ADD_ORDERS',
}

export const addOptions = (options: Option[]): AddOptionsAction => ({
  type: TRADE_ACTION_TYPES.ADD_OPTIONS,
  options,
});

export const addQuote = (quote: Quote): AddQuoteAction => ({
  type: TRADE_ACTION_TYPES.ADD_QUOTE,
  quote,
});

export const addPotentialTrades = (
  potentialTrades: Trade[],
): AddPotentialTrades => ({
  type: TRADE_ACTION_TYPES.ADD_POTENTIAL_TRADES,
  potentialTrades,
});

export const resetOptions = (): ResetOptionsAction => ({
  type: TRADE_ACTION_TYPES.RESET_OPTIONS,
});

export const addExpirationDates = (
  expirationDates: string[],
): AddExpirationDatesAction => ({
  type: TRADE_ACTION_TYPES.ADD_EXP_DATES,
  expirationDates,
});

export const addAccountId = (accountId: string): AddAccountIdAction => ({
  type: TRADE_ACTION_TYPES.ADD_ACCOUNT_ID,
  accountId,
});

export const addOrders = (orders: Order[]): AddOrdersAction => ({
  type: TRADE_ACTION_TYPES.ADD_ORDERS,
  orders,
});
