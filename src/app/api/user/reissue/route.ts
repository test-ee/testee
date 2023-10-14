import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export default async function POST(request: Request) {
  try {
    const body = await request.json();

    const { accessToken, refreshToken } = body;

    if (!accessToken || !refreshToken) throw new Error('no accessToken or refreshToken');

    const decodedAccessToken = jwt.verify(accessToken, process.env.JWT_SECRET_KEY || '');
    const decodedRefreshToken = jwt.verify(refreshToken, process.env.JWT_SECRET_KEY || '');
    if (typeof decodedAccessToken === 'string' || typeof decodedRefreshToken === 'string')
      throw new Error('token error');

    const now = Math.floor(Date.now() / 1000);
    if (decodedRefreshToken.exp! < now) throw new Error('refreshToken expired');

    const { exp: accessExp, ...accessTokenPayloads } = decodedAccessToken;
    const { exp: refreshExp, ...refreshTokenPayloads } = decodedRefreshToken;

    const newAccessToken = jwt.sign(accessTokenPayloads, process.env.JWT_SECRET_KEY || '', { expiresIn: '1h' });
    const newRefreshToken = jwt.sign(refreshTokenPayloads, process.env.JWT_SECRET_KEY || '', { expiresIn: '30d' });

    return NextResponse.json({ accessToken: newAccessToken, refreshToken: newRefreshToken }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: 'reissue failed' }, { status: 400 });
  }

  return NextResponse.json({ message: 'internal server error' }, { status: 500 });
}
