export type QuestionType = 'multiple-choice' | 'true-false';

export interface BaseQuestion {
  id: number;
  question: string;
  type: QuestionType;
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: 'multiple-choice';
  options: string[];
  correctAnswer: number;
}

export interface TrueFalseQuestion extends BaseQuestion {
  type: 'true-false';
  correctAnswer: boolean;
}

export type Question = MultipleChoiceQuestion | TrueFalseQuestion;

export interface QuizData {
  questions: Question[];
}
