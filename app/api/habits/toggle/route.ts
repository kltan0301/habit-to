import { toggleHabit } from '../../../../lib/habitService';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { habitId } = await request.json();
  try {
    const result = toggleHabit(habitId);
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}