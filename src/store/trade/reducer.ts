import {
  AddOptionsAction,
  AddQuoteAction,
  TradeAction,
  TradeState,
} from './types';
import {TRADE_ACTION_TYPES} from './actions';
import {Option} from '../../model';

const InitialState: TradeState = {
  options: {},
  quote: null,
};

export const tradeReducer = (
  state: TradeState = InitialState,
  action: TradeAction,
) => {
  switch (action.type) {
    case TRADE_ACTION_TYPES.ADD_OPTIONS:
      // return handleAddOptions((<AddOptionsAction>action).options);
      return Object.assign(
        {},
        state,
        handleAddOptions((<AddOptionsAction>action).options),
      );
    case TRADE_ACTION_TYPES.ADD_QUOTE:
      return Object.assign({}, state, {quote: (<AddQuoteAction>action).quote});
    default:
      return state;
  }
};

function handleAddOptions(options: Option[]) {
  const voluminousOptions = [...options.filter((option) => option.volume > 0)];
  const puts = voluminousOptions.filter(
    (option) => option.option_type === 'put',
  );
  const calls = voluminousOptions.filter(
    (option) => option.option_type === 'call',
  );
  return {options: {puts, calls}};
}
