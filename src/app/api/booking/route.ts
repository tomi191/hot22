import { NextRequest, NextResponse } from 'next/server';
import { bookingSchema } from '@/lib/booking-schema';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = bookingSchema.parse(body);

    // TODO: Insert into Supabase when configured
    // const supabase = createServerSupabaseClient();
    // const { error } = await supabase.from('bookings').insert(data);

    // TODO: Send email notification

    return NextResponse.json({ success: true, data });
  } catch (error) {
    if (error instanceof Error && 'issues' in error) {
      return NextResponse.json({ success: false, error: 'Invalid data' }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
