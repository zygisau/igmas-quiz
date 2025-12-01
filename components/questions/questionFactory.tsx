import { ClientQuestion, QuestionType } from "@/types/quiz";
import { QuestionRendererComponent } from "./QuestionRenderer";
import { MultipleChoiceQuestion } from "./MultipleChoiceQuestion";
import { TrueFalseQuestion } from "./TrueFalseQuestion";
import { ImageMultipleChoiceQuestion } from "./ImageMultipleChoiceQuestion";
import { VolumeSliderQuestion } from "./VolumeSliderQuestion";

const questionRenderers: Record<QuestionType, QuestionRendererComponent> = {
  'multiple-choice': MultipleChoiceQuestion as QuestionRendererComponent,
  'true-false': TrueFalseQuestion as QuestionRendererComponent,
  'image-multiple-choice': ImageMultipleChoiceQuestion as QuestionRendererComponent,
  'volume-slider': VolumeSliderQuestion as QuestionRendererComponent,
};

export function getQuestionRenderer(question: ClientQuestion): QuestionRendererComponent {
  return questionRenderers[question.type];
}
