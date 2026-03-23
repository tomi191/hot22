import { NextRequest, NextResponse } from 'next/server';
import { contactSchema } from '@/lib/contact-schema';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = contactSchema.parse(body);

    // TODO: Insert into Supabase when configured
    // TODO: Send email notification

    return NextResponse.json({ success: true, data });
  } catch (error) {
    if (error instanceof Error && 'issues' in error) {
      return NextResponse.json({ success: false, error: 'Invalid data' }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
