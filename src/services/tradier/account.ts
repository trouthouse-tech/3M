import axios from 'axios';
import {SANDBOX} from './index';
import {Order} from '../../model';

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
      // console.log('positions: ', resp.data);
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
      // console.log('history: ', resp.data);
      return resp.data.history.event;
    })
    .catch((err) => console.log('err: ', err));
}
