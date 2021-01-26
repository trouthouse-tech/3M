import {MultiLegOrder, OptionOrder} from '../../model';
import axios from 'axios';
import {SANDBOX} from './utils';

export async function previewOptionOrder(
  accountId: string,
  order: OptionOrder,
) {
  // console.log('accountId: ', order.account_id);
  const url = `https://sandbox.tradier.com/v1/accounts/${accountId}/orders`;
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
      console.log('preview order: ', resp.data);
      return resp.data.order;
    })
    .catch((err) => console.log('err: ', err.message));
}

export async function multiLegOrder(accountId: string, order: MultiLegOrder) {
  const url = `https://sandbox.tradier.com/v1/accounts/${accountId}/orders`;
  console.log('order: ', order);
  return await axios
    .post(url, null, {
      params: order,
      headers: {
        Authorization: `Bearer ${SANDBOX.access_token}`,
        Accept: 'application/json',
      },
    })
    .then((resp) => {
      console.log('multiLegOrder: ', resp.data);
      return resp.data.order;
    })
    .catch((err) => console.log('err: ', err.message));
}
