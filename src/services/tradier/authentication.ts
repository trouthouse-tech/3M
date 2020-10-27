import {AccessTokenResponse} from '../../model';
import axios from 'axios';
import base64 from 'react-native-base64';

const clientId = 'hSPco1otJoZXyfBiR3tFMPg0WPXPaTuI';
const secret = '2C7LPsmlTruicFt4';

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
