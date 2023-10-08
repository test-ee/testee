import { NextResponse } from 'next/server'
import { verifyJWT } from '@/lib/token'

export async function middleware(request: Request) {
  const requestHeaders = new Headers(request.headers)

  if (request.method !== 'GET') {
    const [_, token] = (requestHeaders.get('Authorization') || '').split(' ')

    try {
      await verifyJWT(token)
    } catch (e) {
      return NextResponse.json({ message: 'invalid token error' }, { status: 401 })
    }
  }
}

export const config = {
  matcher: ['/api/workbook', '/api/question'],
}
