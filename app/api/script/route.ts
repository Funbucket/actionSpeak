import { NextRequest, NextResponse } from 'next/server';
import { supabaseBrowser } from '@/lib/supabase/browser';

export async function POST(req: NextRequest) {
  const supabase = supabaseBrowser();

  // POST 메서드만 허용
  if (req.method !== 'POST') {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
  }

  const { domain, visitorId, type, referrer } = await req.json();

  try {
    // 해당 도메인이 데이터베이스에 있는지 확인
    const { data, error } = await supabase
      .from('websites')
      .select('*')
      .eq('url', domain);

    if (error) {
      throw error;
    }

    if (data.length === 0) {
      return NextResponse.json({ error: 'Website not found' }, { status: 404 });
    }

    const response = NextResponse.json({ message: 'Success' }, { status: 200 });
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'POST');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type');

    return response;
  } catch (error) {
    const response = NextResponse.json({ error }, { status: 500 });
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'POST');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type');

    return response;
  }
}

// OPTIONS 메서드도 처리하여 CORS 사전 검사를 통과하도록 합니다.
export async function OPTIONS() {
  const response = NextResponse.json({}, { status: 200 });
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');

  return response;
}
