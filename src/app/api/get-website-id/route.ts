import { NextRequest, NextResponse } from 'next/server';

import { supabaseBrowser } from '@/lib/supabase/browser';

const setCorsHeaders = (response: NextResponse) => {
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  response.headers.set('Access-Control-Allow-Credentials', 'true');
  return response;
};

export async function POST(req: NextRequest) {
  const supabase = supabaseBrowser();

  if (req.method !== 'POST') {
    return setCorsHeaders(NextResponse.json({ error: 'Method not allowed' }, { status: 405 }));
  }

  const { domain } = await req.json();

  try {
    const { data, error } = await supabase
      .from('websites')
      .select('id')
      .eq('domain', domain)
      .single();

    if (error) {
      throw error;
    }

    return setCorsHeaders(NextResponse.json({ website_id: data.id }, { status: 200 }));
  } catch (error) {
    return setCorsHeaders(NextResponse.json({ error: error }, { status: 500 }));
  }
}

export async function OPTIONS() {
  return setCorsHeaders(NextResponse.json({}, { status: 200 }));
}
