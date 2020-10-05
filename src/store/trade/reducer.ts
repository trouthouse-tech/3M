import {
  AddOptionsAction,
  AddQuoteAction,
  TradeAction,
  TradeState,
} from './types';
import {TRADE_ACTION_TYPES} from './actions';

const InitialState: TradeState = {
  options: [],
  quote: null,
};

export const tradeReducer = (
  state: TradeState = InitialState,
  action: TradeAction,
) => {
  switch (action.type) {
    case TRADE_ACTION_TYPES.ADD_OPTIONS:
      return Object.assign({}, state, {
        options: (<AddOptionsAction>action).options.filter(
          (option) => option.volume > 0,
        ),
      });
    case TRADE_ACTION_TYPES.ADD_QUOTE:
      return Object.assign({}, state, {quote: (<AddQuoteAction>action).quote});
    default:
      return state;
  }
};
