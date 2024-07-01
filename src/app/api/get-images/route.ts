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

  const { website_id } = await req.json();

  try {
    const { data, error } = await supabase
      .from('website_images')
      .select('name, image_url')
      .eq('website_id', website_id);

    if (error) {
      throw error;
    }

    const imageUrls: { [key: string]: string } = {};
    data.forEach((item: { name: string; image_url: string }) => {
      imageUrls[item.name] = item.image_url;
    });

    return setCorsHeaders(NextResponse.json({ imageUrls }, { status: 200 }));
  } catch (error) {
    return setCorsHeaders(NextResponse.json({ error: error }, { status: 500 }));
  }
}

export async function OPTIONS() {
  return setCorsHeaders(NextResponse.json({}, { status: 200 }));
}
