import { NextResponse } from 'next/server';
import { loadData, generateChecklist } from '../../../lib/habitService';

export async function GET() {
  try {
    const data = await loadData();
    if (!data) {
      return NextResponse.json({ habits: [], checklist: [] });
    }

    const habits = data.habits;
    const checklist = generateChecklist(habits);

    return NextResponse.json({ habits, checklist });
  } catch (error) {
    console.error('Error fetching checklist:', error);
    return NextResponse.json({ error: 'Failed to fetch checklist' }, { status: 500 });
  }
}