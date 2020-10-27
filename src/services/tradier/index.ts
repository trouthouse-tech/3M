import axios from 'axios';
import base64 from 'react-native-base64';
import {AccessTokenResponse} from '../../model';
import {
  MultiLegOrder,
  OptionOrder,
  Order,
} from '../../screens/trade/results/types';

const clientId = 'hSPco1otJoZXyfBiR3tFMPg0WPXPaTuI';
const secret = '2C7LPsmlTruicFt4';

const SANDBOX = {
  account_id: 'VA17211781',
  access_token: '5bFvbpGQINEqQGPEk4G0RRKkXbcG',
};

export async function getAccessToken(
  authCode: string,
): Promise<AccessTokenResponse> {
  console.log('getAccessToken authCode: ', authCode);
  return await axios({
    method: 'post',
    url: 'https://api.tradier.com/v1/oauth/accesstoken',
    data: {
      grant_type: 'authorization_code',
      code: authCode,
    },
    headers: {
      Authorization: `${base64.encode(clientId + ':' + secret)}`,
      Accept: 'application/json',
    },
  })
    .then((resp) => {
      console.log('user token: ', resp.data);
      return resp.data;
    })
    .catch((err) => console.log('errrrrrr: ', err));
}

export async function lookupSymbol(query: string, token: string) {
  return await axios
    .get('https://api.tradier.com/v1/markets/lookup', {
      params: {
        q: query,
      },
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    })
    .then((resp) => {
      return resp.data;
    })
    .catch((err) => console.log('errr: ', err));
}

export async function getOptionChain(
  query: string,
  expirationDate: string,
  token: string,
) {
  // console.log('token: ', token);
  return await axios
    .get('https://api.tradier.com/v1/markets/options/chains', {
      params: {
        symbol: query.toUpperCase(),
        expiration: expirationDate,
        greeks: 'true',
      },
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    })
    .then((resp) => {
      // console.log('options: ', resp.data);
      return resp.data;
    })
    .catch((err) => console.log('errr: ', err));
}

export async function getQuotes(query: string, token: string) {
  return await axios
    .get('https://api.tradier.com/v1/markets/quotes', {
      params: {
        symbols: query.toUpperCase(),
      },
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    })
    .then((resp) => {
      // console.log('options: ', resp.data);
      return resp.data;
    })
    .catch((err) => console.log('errr: ', err));
}

export async function previewOptionOrder(order: OptionOrder) {
  // console.log('accountId: ', order.account_id);
  const url = `https://api.tradier.com/v1/accounts/${SANDBOX.account_id}/orders`;
  // console.log('order: ', order);
  return await axios
    .post(url, null, {
      params: order,
      headers: {
        Authorization: `Bearer ${SANDBOX.access_token}`,
        Accept: 'application/json',
      },
    })
    .then((resp) => {
      console.log('preview order: ', resp.data.order);
    })
    .catch((err) => console.log('err: ', err.message));
}

export async function getOrders(token: string) {
  const url = `https://sandbox.tradier.com/v1/accounts/${SANDBOX.account_id}/orders`;
  return await axios
    .get(url, {
      params: {
        account_id: SANDBOX.account_id,
      },
      headers: {
        Authorization: `Bearer ${SANDBOX.access_token}`,
        Accept: 'application/json',
      },
    })
    .then((resp) => {
      console.log('Orders: ', resp.data);
      return resp.data.orders.order as Order[];
    })
    .catch((err) => console.log('err: ', err));
}

export async function getPositions(token: string) {
  const url = `https://sandbox.tradier.com/v1/accounts/${SANDBOX.account_id}/positions`;
  return await axios
    .get(url, {
      params: {
        account_id: SANDBOX.account_id,
      },
      headers: {
        Authorization: `Bearer ${SANDBOX.access_token}`,
        Accept: 'application/json',
      },
    })
    .then((resp) => {
      console.log('positions: ', resp.data);
      return resp.data.positions.position;
    })
    .catch((err) => console.log('err: ', err));
}

export async function getHistory(token: string) {
  const url = `https://sandbox.tradier.com/v1/accounts/${SANDBOX.account_id}/history`;
  return await axios
    .get(url, {
      params: {
        account_id: SANDBOX.account_id,
      },
      headers: {
        Authorization: `Bearer ${SANDBOX.access_token}`,
        Accept: 'application/json',
      },
    })
    .then((resp) => {
      console.log('history: ', resp.data);
      return resp.data.history.event;
    })
    .catch((err) => console.log('err: ', err));
}

export async function multiLegOrder(order: MultiLegOrder) {
  const url = `https://sandbox.tradier.com/v1/accounts/${SANDBOX.account_id}/orders`;
  // console.log('order: ', order);
  return await axios
    .post(url, null, {
      params: order,
      headers: {
        Authorization: `Bearer ${SANDBOX.access_token}`,
        Accept: 'application/json',
      },
    })
    .then((resp) => {
      return resp.data.order;
      // console.log('multiLegOrder: ', resp.data.order);
    })
    .catch((err) => console.log('err: ', err.message));
}

export async function getExpirationDates(symbol: string, token: string) {
  const url = 'https://api.tradier.com/v1/markets/options/expirations';
  return await axios
    .get(url, {
      params: {
        symbol: symbol,
      },
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    })
    .then((resp) => {
      return resp.data.expirations.date;
      // console.log('expiration dates: ', resp.data);
    })
    .catch((err) => console.log('errr: ', err));
}

export async function getHistoricalPrices(symbol: string, token: string) {
  console.log('symbol: ', symbol);
  const url = 'https://api.tradier.com/v1/markets/history';
  return await axios
    .get(url, {
      params: {
        symbol: symbol,
        interval: 'weekly',
        start: '2019-10-22',
        end: '2020-10-22',
      },
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    })
    .then((resp) => {
      console.log('historical prices weekly: ', resp.data);
      return resp.data.history.day;
    })
    .catch((err) => console.log('err: ', err));
}

export async function getAccount(token: string) {
  console.log('getAccount: ');
  const url = 'https://sandbox.tradier.com/v1/user/profile';
  return await axios
    .get(url, {
      params: {},
      headers: {
        Authorization: `Bearer ${SANDBOX.access_token}`,
        Accept: 'application/json',
      },
    })
    .then((resp) => {
      console.log('Tradier Account: ', resp.data.profile.account);
      return resp.data.profile.account;
    })
    .catch((err) => console.log('err: ', err));
}
