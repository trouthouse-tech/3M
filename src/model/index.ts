export interface Investor {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  username?: string;
  email?: string;
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
  root_symbols: string;
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

