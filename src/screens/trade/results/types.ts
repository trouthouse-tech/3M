export interface Trade {
  legOne: Leg;
  legTwo: Leg;
  probability: number;
  maxProfitDollars: number;
  maxProfitPercentage: number;
  breakEven: number;
  expirationDate: string;
  totalPrice: number;
  root_symbol: string;
}

export interface Leg {
  strike: number;
  cost: number;
  expiration: string;
  option_symbol: string;
}

export interface OptionOrder {
  account_id: string;
  class: string;
  symbol: string;
  option_symbol: string;
  side: string;
  quantity: string;
  type: string;
  duration: string;
  price?: string;
  stop?: string;
  preview?: string;
}

export interface MultiLegOrder {
  account_id: string;
  class: string;
  symbol: string;
  type: string;
  duration: string;
  price?: string;
  'option_symbol[0]': string;
  'side[0]': string;
  'quantity[0]': string;
  'option_symbol[1]': string;
  'side[1]': string;
  'quantity[1]': string;
  preview?: string;
}

export interface Order {
  id: number;
  type: string;
  symbol: string;
  side: string;
  quantity: number;
  status: string;
  duration: string;
  avg_fill_price: number;
  exec_quantity: number;
  last_fill_price: number;
  last_fill_quantity: number;
  remaining_quantity: number;
  create_date: string;
  transaction_date: string;
  class: string;
}

export interface Position {
  cost_basis: string;
  date_acquired: string;
  id: number;
  quantity: number;
  symbol: string;
}
