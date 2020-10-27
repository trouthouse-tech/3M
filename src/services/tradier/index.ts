import {getAccount, getHistory, getPositions, getOrders} from './account';
import {getAccessToken} from './authentication';
import {
  getOptionChain,
  getHistoricalPrices,
  getExpirationDates,
  getQuotes,
  lookupSymbol,
} from './market';
import {previewOptionOrder, multiLegOrder} from './trading';

const SANDBOX = {
  account_id: 'VA17211781',
  access_token: '5bFvbpGQINEqQGPEk4G0RRKkXbcG',
};

export {
  getAccount,
  getHistory,
  getPositions,
  getOrders,
  getAccessToken,
  getOptionChain,
  getHistoricalPrices,
  getExpirationDates,
  getQuotes,
  lookupSymbol,
  previewOptionOrder,
  multiLegOrder,
  SANDBOX,
};
