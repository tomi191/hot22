import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { contactSchema } from '@/lib/contact-schema';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = contactSchema.parse(body);

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );

    const { error } = await supabase.from('contact_messages').insert({
      name: data.name,
      phone: data.phone,
      email: data.email || null,
      message: data.message,
    });

    if (error) {
      console.error('Supabase contact insert error:', error);
      return NextResponse.json({ success: false, error: 'Failed to save message' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Error && 'issues' in error) {
      return NextResponse.json({ success: false, error: 'Invalid data' }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
