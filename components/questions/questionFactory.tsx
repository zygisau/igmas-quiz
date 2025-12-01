import { Question, QuestionType } from "@/types/quiz";
import { QuestionRendererComponent } from "./QuestionRenderer";
import { MultipleChoiceQuestion } from "./MultipleChoiceQuestion";
import { TrueFalseQuestion } from "./TrueFalseQuestion";

const questionRenderers: Record<QuestionType, QuestionRendererComponent> = {
  'multiple-choice': MultipleChoiceQuestion,
  'true-false': TrueFalseQuestion,
};

export function getQuestionRenderer(question: Question): QuestionRendererComponent {
  return questionRenderers[question.type];
}
