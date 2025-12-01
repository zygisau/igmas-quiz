export type QuestionType = 'multiple-choice' | 'true-false' | 'image-multiple-choice' | 'volume-slider';

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

export interface ImageMultipleChoiceQuestion extends BaseQuestion {
  type: 'image-multiple-choice';
  imageUrl: string;
  options: string[];
  correctAnswer: number;
}

export interface VolumeSliderQuestion extends BaseQuestion {
  type: 'volume-slider';
  correctAnswer: number;
}

export type Question = MultipleChoiceQuestion | TrueFalseQuestion | ImageMultipleChoiceQuestion | VolumeSliderQuestion;

export interface QuizData {
  questions: Question[];
}

// Client-side types (without correct answers)
export interface ClientMultipleChoiceQuestion extends BaseQuestion {
  type: 'multiple-choice';
  options: string[];
}

export interface ClientTrueFalseQuestion extends BaseQuestion {
  type: 'true-false';
}

export interface ClientImageMultipleChoiceQuestion extends BaseQuestion {
  type: 'image-multiple-choice';
  imageUrl: string;
  options: string[];
}

export interface ClientVolumeSliderQuestion extends BaseQuestion {
  type: 'volume-slider';
}

export type ClientQuestion = ClientMultipleChoiceQuestion | ClientTrueFalseQuestion | ClientImageMultipleChoiceQuestion | ClientVolumeSliderQuestion;

// Answer validation types
export interface AnswerValidationRequest {
  questionId: number;
  answer: number | boolean;
}

export interface AnswerValidationResponse {
  isCorrect: boolean;
  questionId: number;
}

export interface QuizMetadata {
  totalQuestions: number;
  questionIds: number[];
}
