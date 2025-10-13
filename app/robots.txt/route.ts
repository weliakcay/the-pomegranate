import { NextResponse } from 'next/server';

export const runtime = 'edge';

export function GET() {
  const body = `User-agent: *
Allow: /

Sitemap: https://the-pomegranate.com/sitemap.xml
`;
  return new NextResponse(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
