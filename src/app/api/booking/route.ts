import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { bookingSchema } from '@/lib/booking-schema';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = bookingSchema.parse(body);

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );

    const { error } = await supabase.from('bookings').insert({
      service: data.service,
      date: data.date,
      time: data.time,
      name: data.name,
      phone: data.phone,
      email: data.email || null,
      car_model: data.car_model,
      notes: data.notes || null,
    });

    if (error) {
      console.error('Supabase booking insert error:', error);
      return NextResponse.json({ success: false, error: 'Failed to save booking' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Error && 'issues' in error) {
      return NextResponse.json({ success: false, error: 'Invalid data' }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
