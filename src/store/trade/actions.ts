import {AddOptionsAction, AddQuoteAction} from './types';
import {Option, Quote} from '../../model';

export enum TRADE_ACTION_TYPES {
  ADD_OPTIONS = 'ADD_OPTIONS',
  ADD_QUOTE = 'ADD_QUOTE',
}

export const addOptions = (options: Option[]): AddOptionsAction => ({
  type: TRADE_ACTION_TYPES.ADD_OPTIONS,
  options,
});

export const addQuote = (quote: Quote): AddQuoteAction => ({
  type: TRADE_ACTION_TYPES.ADD_QUOTE,
  quote,
});
