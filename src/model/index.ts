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
