import {ROUTES} from '../../util/routes';

export const ONBOARDING_QUESTIONS = [
  {
    route: ROUTES.MultipleChoiceCollector,
    type: 'multipleChoice',
    instructions: {
      question: 'What is your trading experience?',
      answers: [
        'New to trading',
        'I only have experience with stocks',
        'Beginning options trader (calls & puts)',
        'Intermediate (option spreads)',
        'Advanced (1-3 years)',
      ],
    },
  },
  {
    route: ROUTES.MultipleChoiceCollector,
    type: 'multipleChoice',
    instructions: {
      question: "What's your money management approach?",
      answers: ['Conservative', 'Balanced', 'Aggressive'],
    },
  },
  {
    route: ROUTES.MultipleChoiceCollector,
    type: 'multipleChoice',
    instructions: {
      question: "What's your time horizon for holding a position?",
      answers: [
        'Up to 3 weeks (day / swing trader)',
        '1-3 months (position trader)',
        '6+ months (long term investor',
      ],
    },
  },
  // {
  //   route: ROUTES.MultipleChoiceCollector,
  //   type: 'question',
  //   instructions: {
  //     type: 'openEnded',
  //     question:
  //       'What do you expect to gain from being a member of The 3M Club?',
  //   },
  // },
];
