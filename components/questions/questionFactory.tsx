import { ClientQuestion, QuestionType } from "@/types/quiz";
import { QuestionRendererComponent } from "./QuestionRenderer";
import { MultipleChoiceQuestion } from "./MultipleChoiceQuestion";
import { TrueFalseQuestion } from "./TrueFalseQuestion";

const questionRenderers: Record<QuestionType, QuestionRendererComponent> = {
  'multiple-choice': MultipleChoiceQuestion as QuestionRendererComponent,
  'true-false': TrueFalseQuestion as QuestionRendererComponent,
};

export function getQuestionRenderer(question: ClientQuestion): QuestionRendererComponent {
  return questionRenderers[question.type];
}
