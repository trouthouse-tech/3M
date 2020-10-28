import {
  AddAccountIdAction,
  AddExpirationDatesAction,
  AddOptionsAction,
  AddOrderAction,
  AddOrdersAction,
  AddPotentialTrades,
  AddQuoteAction,
  AddTradeAction,
  AddTradesAction,
  TradeAction,
  TradeState,
} from './types';
import {TRADE_ACTION_TYPES} from './actions';
import {Option, Order, Quote} from '../../model';

const InitialState: TradeState = {
  options: {
    calls: [],
    puts: [],
    expirationDates: [],
  },
  quotes: {},
  potentialTrades: [],
  accountId: '',
  orders: [],
  trades: [],
};

export const tradeReducer = (
  state: TradeState = InitialState,
  action: TradeAction,
) => {
  switch (action.type) {
    case TRADE_ACTION_TYPES.ADD_OPTIONS:
      // return handleAddOptions((<AddOptionsAction>action).options);}
      return Object.assign(
        {},
        state,
        handleAddOptions(state, (<AddOptionsAction>action).options),
      );
    case TRADE_ACTION_TYPES.ADD_QUOTE:
      return Object.assign(
        {},
        state,
        handleAddQuote(state, (<AddQuoteAction>action).quote),
      );
    case TRADE_ACTION_TYPES.ADD_POTENTIAL_TRADES:
      const {potentialTrades} = <AddPotentialTrades>action;
      return Object.assign({}, state, {potentialTrades});
    case TRADE_ACTION_TYPES.RESET_OPTIONS:
      return Object.assign({}, state, {
        options: {calls: [], puts: [], expirationDates: []},
      });
    case TRADE_ACTION_TYPES.ADD_EXP_DATES:
      const {expirationDates} = <AddExpirationDatesAction>action;
      return Object.assign({}, state, {
        options: handleAddExpirationDates(state, expirationDates),
      });
    case TRADE_ACTION_TYPES.ADD_ACCOUNT_ID:
      const {accountId} = <AddAccountIdAction>action;
      return Object.assign({}, state, {accountId});
    case TRADE_ACTION_TYPES.ADD_ORDER:
      const {order} = <AddOrderAction>action;
      return handleOrderAdded(state, order);
    case TRADE_ACTION_TYPES.ADD_ORDERS:
      const {orders} = <AddOrdersAction>action;
      return Object.assign({}, state, {orders});
    case TRADE_ACTION_TYPES.ADD_TRADE:
      const {trade} = <AddTradeAction>action;
      return handleTradeAdded(state, trade);
    case TRADE_ACTION_TYPES.ADD_TRADES:
      const {trades} = <AddTradesAction>action;
      return Object.assign({}, state, {trades});
    default:
      return state;
  }
};

function handleAddOptions(oldState: TradeState, options: Option[]) {
  const oldPuts = oldState.options.puts;
  const oldCalls = oldState.options.calls;

  const highOpenInterestOptions = [
    ...options.filter((option) => option.open_interest > 100),
  ];

  const puts = highOpenInterestOptions.filter(
    (option) => option.option_type === 'put',
  );
  const calls = highOpenInterestOptions.filter(
    (option) => option.option_type === 'call',
  );

  return {
    options: {
      puts: [...oldPuts, ...puts],
      calls: [...oldCalls, ...calls],
      expirationDates: oldState.options.expirationDates,
    },
  };
}

function handleAddQuote(oldState: TradeState, quote: Quote) {
  const calls = oldState.options.calls.filter(
    (option) =>
      (quote.last - option.strike) / option.strike > -0.25 &&
      (quote.last - option.strike) / option.strike < 0.05,
  );

  const puts = oldState.options.puts.filter(
    (option) =>
      (option.strike - quote.last) / option.strike > -0.25 &&
      (option.strike - quote.last) / option.strike < 0.05,
  );

  const options = {
    puts: [...puts],
    calls: [...calls],
    expirationDates: oldState.options.expirationDates,
  };

  const quotes = Object.assign({}, oldState.quotes);
  if (!quotes[quote.symbol]) {
    quotes[quote.symbol] = quote;
  }

  return {
    quotes,
    options,
  };
}

function handleAddExpirationDates(
  oldState: TradeState,
  expirationDates: string[],
) {
  return Object.assign({}, oldState.options, {expirationDates});
}

function handleTradeAdded(oldState: TradeState, trade: string) {
  const trades = [...oldState.trades];
  trades.push(trade);
  return Object.assign({}, oldState, {trades});
}

function handleOrderAdded(oldState: TradeState, order: Order) {
  const orders = [...oldState.orders];
  orders.push(order);
  return Object.assign({}, oldState, {orders});
}
