import { NextRequest, NextResponse } from 'next/server';
import { supabaseBrowser } from '@/lib/supabase/browser';
import { setCorsHeaders } from '@/lib/utils';

export async function POST(req: NextRequest) {
  const supabase = supabaseBrowser();

  if (req.method !== 'POST') {
    return setCorsHeaders(
      NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
    );
  }

  const { domain, visitorId, type, referrer } = await req.json();

  try {
    const { data, error } = await supabase
      .from('websites')
      .select('*')
      .eq('url', domain);

    if (error) {
      throw error;
    }

    if (data.length === 0) {
      return setCorsHeaders(
        NextResponse.json({ error: 'Website not found' }, { status: 404 })
      );
    }

    return setCorsHeaders(
      NextResponse.json({ message: 'Success' }, { status: 200 })
    );
  } catch (error) {
    return setCorsHeaders(NextResponse.json({ error }, { status: 500 }));
  }
}

export async function OPTIONS() {
  return setCorsHeaders(NextResponse.json({}, { status: 200 }));
}
