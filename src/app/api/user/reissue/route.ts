import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const { accessToken, refreshToken } = body

    if (!accessToken || !refreshToken) throw new Error('no accessToken or refreshToken')

    const decodedAccessToken = jwt.verify(accessToken, process.env.JWT_SECRET_KEY || '')
    const decodedRefreshToken = jwt.verify(refreshToken, process.env.JWT_SECRET_KEY || '')

    const newAccessToken = jwt.sign(decodedAccessToken, process.env.JWT_SECRET_KEY || '', { expiresIn: '1d' })
    const newRefreshToken = jwt.sign(decodedRefreshToken, process.env.JWT_SECRET_KEY || '', { expiresIn: '30d' })

    return NextResponse.json({ accessToken: newAccessToken, refreshToken: newRefreshToken }, { status: 200 })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ message: 'reissue failed' }, { status: 400 })
  }

  return NextResponse.json({ message: 'internal server error' }, { status: 500 })
}
