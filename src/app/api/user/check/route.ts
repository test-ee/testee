import { PrismaClient } from '@/generated/prisma';
import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from '@/generated/prisma/runtime/library';
import { NextResponse } from 'next/server';

export default async function GET(request: Request) {
  const prisma = new PrismaClient();
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId') || '';

  try {
    if (!userId) throw new Error('no userId');

    const response = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!response)
      return NextResponse.json(
        {
          message: 'check success',
          data: {
            hasAccount: false,
          },
        },
        { status: 200 }
      );

    return NextResponse.json(
      {
        message: 'check success',
        data: {
          hasAccount: true,
          user: response,
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
