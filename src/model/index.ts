export interface Investor {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  username?: string;
  email?: string;
  password?: string;
  hasAnsweredOnboardingQuestions?: boolean;
  tradierAccessToken?: string;
  tradierAccessTokenExpiration?: number;
  tradierIsWaitingForApproval?: boolean;
  recentlyViewed?: RecentlyViewedCompany[];
}

export interface RecentlyViewedCompany {
  symbol: string;
  name: string;
}

export interface AccessTokenResponse {
  access_token: string;
  expires_in: number;
  issued_at: string;
  scope: string;
  status: string;
}

export interface SearchCompaniesResponse {
  securities: SecurityList;
}

export interface SecurityList {
  security: Security[] | Security;
}

export interface Security {
  symbol: string;
  exchange: string;
  type: string;
  description: string;
}

export interface FindOptionChainResponse {
  options: OptionChain;
}

export interface OptionChain {
  option: Option[];
}

export interface Option {
  symbol: string;
  description: string;
  exch: string;
  type: string;
  last: number;
  change: number;
  volume: number;
  open: number;
  high: number;
  low: number;
  close: string;
  bid: string;
  ask: number;
  underlying: string;
  strike: number;
  greeks: Greeks;
  change_percentage: number;
  average_volume: string;
  last_volume: number;
  trade_date: number;
  prevclose: number;
  week_52_high: number;
  week_52_low: number;
  bidsize: number;
  bidexch: string;
  bid_date: number;
  asksize: number;
  askexch: string;
  ask_date: number;
  open_interest: number;
  contract_size: number;
  expiration_date: string;
  expiration_type: string;
  option_type: string;
  root_symbol: string;
}

export interface Greeks {
  delta: number;
  gamma: number;
  theta: number;
  vega: number;
  rho: number;
  phi: number;
  bid_iv: number;
  mid_iv: number;
  ask_iv: number;
  smv_vol: number;
  updated_at: string;
}

export interface GetQuoteResponse {
  quotes: {
    quote: Quote;
  };
}

export interface Quote {
  ask: number;
  ask_date: number;
  askexch: string;
  asksize: number;
  average_volume: string;
  bid: string;
  bid_date: number;
  bidexch: string;
  bidsize: number;
  change: number;
  change_percentage: number;
  close: string;
  contract_size?: number;
  description: string;
  exch: string;
  expiration_date?: string;
  expiration_type?: string;
  high: number;
  last: number;
  last_volume: number;
  low: number;
  open: number;
  open_interest?: number;
  option_type?: number;
  prevclose: number;
  root_symbols: string;
  strike?: number;
  symbol: string;
  trade_date: number;
  type: string;
  volume: number;
  week_52_high: number;
  week_52_low: number;
}

export enum HOLDING_PERIOD {
  DAILY,
  WEEKLY,
  MONTHLY,
  YEARLY,
}

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
  orderId: string;
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
  cost_basis: number;
  date_acquired: string;
  id: number;
  quantity: number;
  symbol: string;
}

export interface Spread {
  avg_fill_price: number;
  class: string;
  create_date: string;
  duration: string;
  exec_quantity: number;
  id: number;
  last_fill_price: number;
  last_fill_quantity: number;
  leg: SpreadLeg[];
  num_legs: number;
  quantity: number;
  remaining_quantity: number;
  side: string;
  status: string;
  strategy: string;
  symbol: string;
  transaction_date: string;
  type: string;
}

export interface SpreadLeg {
  avg_fill_price: number;
  class: string;
  create_date: string;
  duration: string;
  exec_quantity: number;
  id: number;
  last_fill_price: number;
  last_fill_quantity: number;
  option_symbol: string;
  quantity: number;
  remaining_quantity: number;
  side: string;
  status: string;
  symbol: string;
  transaction_date: string;
  type: string;
}

export interface OptionPreview {
  class: string;
  commission: number;
  cost: number;
  day_trades: number;
  duration: string;
  extended_hours: boolean;
  fees: number;
  margin_change: number;
  option_symbol: string;
  order_cost: number;
  quantity: number;
  request_date: string;
  result: boolean;
  side: string;
  status: string;
  strategy: string
  symbol: string;
  type: string;
}
