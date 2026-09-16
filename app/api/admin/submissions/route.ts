import { NextResponse } from 'next/server';
import { getSubmissions } from '@/lib/submissions';

export async function GET() {
  try {
    const submissions = getSubmissions();
    return NextResponse.json(submissions, { status: 200 });
  } catch (error) {
    console.error('Error fetching submissions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch submissions' },
      { status: 500 }
    );
  }
}
