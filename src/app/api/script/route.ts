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

  const { domain, image } = await req.json();

  try {
    const { data, error } = await supabase.from('websites').select('*').eq('domain', domain);

    if (error) {
      throw error;
    }

    if (data.length === 0) {
      return setCorsHeaders(NextResponse.json({ error: 'Website not found' }, { status: 404 }));
    }

    let imageUrl = null;
    if (image) {
      const { data: imageData, error: imageError } = await supabase
        .from('website_images')
        .select('image_url')
        .eq('website_domain', domain)
        .eq('name', image)
        .single();

      if (imageError) {
        throw imageError;
      }

      imageUrl = imageData?.image_url || null;
    }

    return setCorsHeaders(NextResponse.json({ message: 'Success', imageUrl }, { status: 200 }));
  } catch (error) {
    return setCorsHeaders(NextResponse.json({ error }, { status: 500 }));
  }
}

export async function OPTIONS() {
  return setCorsHeaders(NextResponse.json({}, { status: 200 }));
}
