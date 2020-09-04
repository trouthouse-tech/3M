export interface Investor {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  username?: string;
  email?: string;
  hasAnsweredOnboardingQuestions?: boolean;
  tradierAccessToken?: string;
  tradierAccessTokenExpiration?: number;
}
