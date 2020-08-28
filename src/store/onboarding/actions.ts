import {MultipleChoiceAnswerAction, OpenEndedAnswerAction} from './types';

export enum ONBOARDING_QUESTION_ACTION_TYPES {
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  OPEN_ENDED = 'OPEN_ENDED',
}

export const answerMultipleChoice = (
  index: number,
  answer: number,
): MultipleChoiceAnswerAction => ({
  type: ONBOARDING_QUESTION_ACTION_TYPES.MULTIPLE_CHOICE,
  index,
  answer,
});

export const answerOpenEnded = (
  index: number,
  answer: string,
): OpenEndedAnswerAction => ({
  type: ONBOARDING_QUESTION_ACTION_TYPES.OPEN_ENDED,
  index,
  answer,
});
