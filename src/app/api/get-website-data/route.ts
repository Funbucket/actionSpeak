import { NextRequest, NextResponse } from 'next/server';

import { supabaseBrowser } from '@/lib/supabase/browser';

const setCorsHeaders = (response: NextResponse) => {
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return response;
};

export async function POST(req: NextRequest) {
  const supabase = supabaseBrowser();

  if (req.method !== 'POST') {
    return setCorsHeaders(NextResponse.json({ error: 'Method not allowed' }, { status: 405 }));
  }

  const { domain } = await req.json();

  try {
    // First, get the website_id from the domain
    const { data: websiteData, error: websiteError } = await supabase
      .from('websites')
      .select('id')
      .eq('domain', domain)
      .single();

    if (websiteError) {
      throw websiteError;
    }

    const websiteId = websiteData.id;

    // Second, get the popup data for this website_id
    const { data: popupOption, error: popupError } = await supabase
      .from('website_popups')
      .select('popup_type, wait_for, frequency, duration, content, path')
      .eq('website_id', websiteId);

    if (popupError) {
      throw popupError;
    }

    // Then, get the images for this website_id
    const { data: imageData, error: imageError } = await supabase
      .from('website_images')
      .select('name, image_url')
      .eq('website_id', websiteId);

    if (imageError) {
      throw imageError;
    }

    const imageUrls: { [key: string]: string } = {};
    imageData.forEach((item: { name: string; image_url: string }) => {
      imageUrls[item.name] = item.image_url;
    });

    return setCorsHeaders(
      NextResponse.json(
        { website_id: websiteId, image_urls: imageUrls, popup_option: popupOption },
        { status: 200 }
      )
    );
  } catch (error) {
    return setCorsHeaders(NextResponse.json({ error: error }, { status: 500 }));
  }
}

export async function OPTIONS() {
  return setCorsHeaders(NextResponse.json({}, { status: 200 }));
}
