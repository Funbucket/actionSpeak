import { NextRequest, NextResponse } from 'next/server';

import { supabaseBrowser } from '@/lib/supabase/browser';

const setCorsHeaders = (response: NextResponse) => {
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  return response;
};

export async function POST(req: NextRequest) {
  const supabase = supabaseBrowser();

  if (req.method !== 'POST') {
    return setCorsHeaders(NextResponse.json({ error: 'Method not allowed' }, { status: 405 }));
  }

  const { domain, img } = await req.json();

  try {
    const { data, error } = await supabase
      .from('website_images')
      .select('image_url')
      .eq('website_domain', domain)
      .eq('name', img)
      .single();

    if (error) {
      throw error;
    }

    const imageUrl = data?.image_url || null;

    return setCorsHeaders(NextResponse.json({ imageUrl }, { status: 200 }));
  } catch (error) {
    return setCorsHeaders(NextResponse.json({ error }, { status: 500 }));
  }
}

export async function OPTIONS() {
  return setCorsHeaders(NextResponse.json({}, { status: 200 }));
}
