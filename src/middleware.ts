import { NextResponse } from 'next/server';
import verifyJWT from '@/lib/token';

export default async function middleware(request: Request) {
  const requestHeaders = new Headers(request.headers);

  if (request.method !== 'GET') {
    const token = (requestHeaders.get('Authorization') || '').split(' ')[1];

    try {
      await verifyJWT(token);
    } catch (e) {
      return NextResponse.json({ message: 'invalid token error' }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/workbook', '/api/question'],
};
