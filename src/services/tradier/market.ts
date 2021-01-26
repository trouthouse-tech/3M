import axios from 'axios';

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

export async function lookupOptionSymbol(query: string, token: string) {
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
    .catch((err) => console.log(err));
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
