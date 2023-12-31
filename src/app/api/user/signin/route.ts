import { PrismaClient } from '@/generated/prisma';
import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from '@/generated/prisma/runtime/library';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export default async function POST(request: Request) {
  const prisma = new PrismaClient();
  const data = await request.json();

  try {
    const { userId } = data;

    if (!userId) throw new Error('no email');

    const response = await prisma.user.findUniqueOrThrow({
      where: {
        id: userId,
      },
    });

    return NextResponse.json(
      {
        message: 'signin success',
        data: {
          ...response,
          accessToken: jwt.sign({ ...response }, process.env.JWT_SECRET_KEY || '', { expiresIn: '1h' }),
          refreshToken: jwt.sign({}, process.env.JWT_SECRET_KEY || '', { expiresIn: '30d' }),
        },
      },
      { status: 200 }
    );
  } catch (e) {
    if (
      e instanceof PrismaClientValidationError ||
      e instanceof PrismaClientKnownRequestError ||
      e instanceof PrismaClientInitializationError
    ) {
      return NextResponse.json({ message: e.message.replaceAll('\n', '') }, { status: 500 });
    }
  }

  return NextResponse.json({ message: 'internal server error' }, { status: 500 });
}
