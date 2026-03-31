import { initApp } from '../../../lib/habitService';
import { NextResponse } from 'next/server';

export async function GET() {
  const data = initApp();
  return NextResponse.json(data.checklist);
}
