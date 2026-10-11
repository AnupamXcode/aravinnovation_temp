import { NextResponse } from 'next/server';
import { getSubmissionsAsync } from '@/lib/submissions';
import { getAdminSession } from '@/lib/admin-auth';

export async function GET() {
  try {
    // 1. Enforce server-side administrator authorization
    const session = await getAdminSession();
    if (!session.isAuthenticated) {
      return NextResponse.json(
        { error: 'Unauthorized: Admin authentication required.' },
        { status: 401 }
      );
    }

    // 2. Fetch submissions from persistent store (Supabase with fallback)
    const submissions = await getSubmissionsAsync();
    return NextResponse.json(submissions, { status: 200 });
  } catch (error) {
    console.error('Error fetching submissions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch submissions' },
      { status: 500 }
    );
  }
}
