export interface Investor {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  username?: string;
  email?: string;
  hasAnsweredOnboardingQuestions?: boolean;
  hasAuthenticatedTradier?: boolean;
}

export interface TradierCredentials {
  clientId: string;
  state: string;
  scope: string;
}
