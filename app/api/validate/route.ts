import { NextResponse } from 'next/server';
import quizData from '@/data/quiz-questions.json';
import type { Question } from '@/types/quiz';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { questionId, answer } = body;

    if (questionId === undefined || answer === undefined) {
      return NextResponse.json(
        { error: 'Missing questionId or answer' },
        { status: 400 }
      );
    }

    const question = quizData.questions.find(
      (q) => q.id === questionId
    ) as Question | undefined;

    if (!question) {
      return NextResponse.json(
        { error: 'Question not found' },
        { status: 404 }
      );
    }

    // Validate answer based on question type
    const isCorrect = answer === question.correctAnswer;

    // Return only whether the answer is correct, not the correct answer itself
    return NextResponse.json({
      isCorrect,
      questionId,
    });
  } catch {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    );
  }
}
