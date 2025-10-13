import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(request: Request) {
  const acceptLanguage = request.headers.get('accept-language') ?? '';
  const primary = acceptLanguage.split(',')[0]?.split('-')[0]?.toLowerCase() ?? 'en';

  return NextResponse.json({
    locale: primary,
    detectedAt: new Date().toISOString(),
  });
}
