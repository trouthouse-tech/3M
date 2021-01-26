import axios from 'axios';
import {SANDBOX} from './utils';
import {Order} from '../../model';

export async function getAccount(token: string) {
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

export async function getOrder(
  accountId: string,
  orderId: string,
  token: string,
) {
  const url = `https://sandbox.tradier.com/v1/accounts/${accountId}/orders/${orderId}`;
  return await axios
    .get(url, {
      params: {
        account_id: accountId,
        id: orderId,
        includeTags: 'true',
      },
      headers: {
        Authorization: `Bearer ${SANDBOX.access_token}`,
        Accept: 'application/json',
      },
    })
    .then((resp) => {
      // console.log('order: ', resp.data);
      return resp.data.order;
    })
    .catch((err) => console.log('err: ', err));
}

export async function getOrders(accountId: string, token: string) {
  const url = `https://sandbox.tradier.com/v1/accounts/${accountId}/orders`;
  return await axios
    .get(url, {
      params: {
        account_id: accountId,
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

export async function getPositions(accountId: string, token: string) {
  const url = `https://sandbox.tradier.com/v1/accounts/${accountId}/positions`;
  return await axios
    .get(url, {
      params: {
        account_id: accountId,
      },
      headers: {
        Authorization: `Bearer ${SANDBOX.access_token}`,
        Accept: 'application/json',
      },
    })
    .then((resp) => {
      // console.log('positions: ', resp.data);
      return resp.data.positions.position;
    })
    .catch((err) => console.log('err: ', err));
}

export async function getHistory(accountId: string, token: string) {
  const url = `https://sandbox.tradier.com/v1/accounts/${accountId}/history`;
  return await axios
    .get(url, {
      params: {
        account_id: accountId,
        type: 'option',
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
