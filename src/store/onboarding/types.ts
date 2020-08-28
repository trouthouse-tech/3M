export type OnboardingQuestionState = {};

type Action = {
  type: string;
};

export type MultipleChoiceAnswerAction = Action & {
  index: number;
  answer: number;
};

export type OpenEndedAnswerAction = Action & {
  index: number;
  answer: string;
};

export type OnboardingQuestionAction =
  | MultipleChoiceAnswerAction
  | OpenEndedAnswerAction;
