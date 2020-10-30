import {
  AddAccountIdAction,
  AddExpirationDatesAction,
  AddOptionsAction,
  AddOrderAction,
  AddOrderIdAction,
  AddOrderIdsAction,
  AddOrdersAction,
  AddPositionAction,
  AddPositionsAction,
  AddPotentialTrades,
  AddQuoteAction,
  AddTradeAction,
  AddTradesAction,
  RemovePositionAction,
  RemovePositionsAction,
  ResetOptionsAction,
} from './types';
import {Option, Position, Quote, Spread} from '../../model';
import {Order, Trade} from '../../model';

export enum TRADE_ACTION_TYPES {
  ADD_OPTIONS = 'ADD_OPTIONS',
  ADD_QUOTE = 'ADD_QUOTE',
  ADD_POTENTIAL_TRADES = 'ADD_POTENTIAL_TRADES',
  RESET_OPTIONS = 'RESET_OPTIONS',
  ADD_EXP_DATES = 'ADD_EXP_DATES',
  ADD_ACCOUNT_ID = 'ADD_ACCOUNT_ID',
  ADD_ORDER = 'ADD_ORDER',
  ADD_ORDERS = 'ADD_ORDERS',
  ADD_TRADE = 'ADD_TRADE',
  ADD_TRADES = 'ADD_TRADES',
  ADD_POSITION = 'ADD_POSITION',
  ADD_POSITIONS = 'ADD_POSITIONS',
  REMOVE_POSITION = 'REMOVE_POSITION',
  REMOVE_POSITIONS = 'REMOVE_POSITIONS',
  ADD_ORDER_ID = 'ADD_ORDER_ID',
  ADD_ORDER_IDS = 'ADD_ORDER_IDS',
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

export const addOrder = (order: Order | Spread): AddOrderAction => ({
  type: TRADE_ACTION_TYPES.ADD_ORDER,
  order,
});

export const addOrders = (orders: Order[] | Spread[]): AddOrdersAction => ({
  type: TRADE_ACTION_TYPES.ADD_ORDERS,
  orders,
});

export const addTrade = (trade: Trade): AddTradeAction => ({
  type: TRADE_ACTION_TYPES.ADD_TRADE,
  trade,
});

export const addTrades = (trades: Trade[]): AddTradesAction => ({
  type: TRADE_ACTION_TYPES.ADD_TRADES,
  trades,
});

export const addPosition = (position: Position): AddPositionAction => ({
  type: TRADE_ACTION_TYPES.ADD_POSITION,
  position,
});

export const addPositions = (positions: Position[]): AddPositionsAction => ({
  type: TRADE_ACTION_TYPES.ADD_POSITIONS,
  positions,
});

export const removePosition = (position: string): RemovePositionAction => ({
  type: TRADE_ACTION_TYPES.REMOVE_POSITION,
  position,
});

export const removePositions = (
  positions: string[],
): RemovePositionsAction => ({
  type: TRADE_ACTION_TYPES.REMOVE_POSITIONS,
  positions,
});

export const addOrderId = (orderId: string): AddOrderIdAction => ({
  type: TRADE_ACTION_TYPES.ADD_ORDER_ID,
  orderId,
});

export const addOrderIds = (orderIds: string[]): AddOrderIdsAction => ({
  type: TRADE_ACTION_TYPES.ADD_ORDER_IDS,
  orderIds,
});
