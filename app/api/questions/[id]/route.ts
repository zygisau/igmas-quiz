import { NextResponse } from 'next/server';
import quizData from '@/data/quiz-questions.json';
import type { Question } from '@/types/quiz';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const questionId = parseInt(id);

  const question = quizData.questions.find((q) => q.id === questionId) as Question | undefined;

  if (!question) {
    return NextResponse.json(
      { error: 'Question not found' },
      { status: 404 }
    );
  }

  // Remove correct answer from response to prevent cheating
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { correctAnswer, ...questionWithoutAnswer } = question;

  return NextResponse.json(questionWithoutAnswer);
}
