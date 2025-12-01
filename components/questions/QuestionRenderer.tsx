import { Question } from "@/types/quiz";
import { ReactNode } from "react";

export interface QuestionRendererProps<T extends Question = Question> {
  question: T;
  selectedAnswer?: any;
  onSelectAnswer: (answer: any) => void;
}

export type QuestionRendererComponent = (props: QuestionRendererProps) => ReactNode;
