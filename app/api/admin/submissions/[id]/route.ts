import { NextRequest, NextResponse } from 'next/server';
import { updateSubmissionStatusAsync, deleteSubmissionAsync } from '@/lib/submissions';
import { getAdminSession } from '@/lib/admin-auth';

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // 1. Enforce server-side administrator authorization
    const session = await getAdminSession();
    if (!session.isAuthenticated) {
      return NextResponse.json(
        { error: 'Unauthorized: Admin authentication required.' },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await req.json();
    const { status } = body;

    if (!status || !['new', 'contacted', 'in_progress', 'converted', 'closed', 'qualified', 'archived'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status value' },
        { status: 400 }
      );
    }

    const updated = await updateSubmissionStatusAsync(id, status);
    if (!updated) {
      return NextResponse.json(
        { error: 'Submission not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error('Error updating submission status:', error);
    return NextResponse.json(
      { error: 'Failed to update submission' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // 1. Enforce server-side administrator authorization
    const session = await getAdminSession();
    if (!session.isAuthenticated) {
      return NextResponse.json(
        { error: 'Unauthorized: Admin authentication required.' },
        { status: 401 }
      );
    }

    const { id } = await params;
    const success = await deleteSubmissionAsync(id);
    if (!success) {
      return NextResponse.json(
        { error: 'Submission not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error deleting submission:', error);
    return NextResponse.json(
      { error: 'Failed to delete submission' },
      { status: 500 }
    );
  }
}
