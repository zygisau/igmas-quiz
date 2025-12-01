import { NextResponse } from 'next/server';
import quizData from '@/data/quiz-questions.json';

export async function GET() {
  // Return only metadata about the quiz, not the questions themselves
  return NextResponse.json({
    totalQuestions: quizData.questions.length,
    questionIds: quizData.questions.map(q => q.id),
  });
}
