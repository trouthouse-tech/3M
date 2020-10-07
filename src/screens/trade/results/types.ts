export interface Trade {
  legOne: Leg;
  legTwo: Leg;
  probability: number;
  maxProfitDollars: number;
  maxProfitPercentage: number;
  breakEven: number;
  expirationDate: number;
  totalPrice: number;
}

export interface Leg {
  strike: number;
  cost: number;
  expiration: number;
}
