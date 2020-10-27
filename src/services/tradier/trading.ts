import {MultiLegOrder, OptionOrder} from '../../model';
import axios from 'axios';
import {SANDBOX} from './index';

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
