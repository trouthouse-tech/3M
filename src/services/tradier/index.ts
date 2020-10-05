import axios from 'axios';
import base64 from 'react-native-base64';
import {AccessTokenResponse} from '../../model';

const clientId = 'hSPco1otJoZXyfBiR3tFMPg0WPXPaTuI';
const secret = '2C7LPsmlTruicFt4';

export async function getAccessToken(
  authCode: string,
): Promise<AccessTokenResponse> {
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
      console.log('resp.data: ', resp.data);
      return resp.data;
    })
    .catch((err) => console.log('errr: ', err));
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

export async function getOptionChain(query: string, token: string) {
  console.log('token: ', token);
  return await axios
    .get('https://api.tradier.com/v1/markets/options/chains', {
      params: {
        symbol: query.toUpperCase(),
        expiration: '2020-10-23',
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
