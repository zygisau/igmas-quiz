import { ClientQuestion } from "@/types/quiz";
import { ReactNode } from "react";

export interface QuestionRendererProps<T extends ClientQuestion = ClientQuestion> {
  question: T;
  selectedAnswer?: number | boolean;
  onSelectAnswer: (answer: number | boolean) => void;
}

export type QuestionRendererComponent = (props: QuestionRendererProps) => ReactNode;
