import { PrismaClient } from '@/generated/prisma'
import { PrismaClientKnownRequestError, PrismaClientValidationError } from '@/generated/prisma/runtime/library'
import jwt from 'jsonwebtoken'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const prisma = new PrismaClient()
  const data = await request.json()

  try {
    const response = await prisma.user.create({
      data,
    })

    return NextResponse.json({
      message: 'create success',
      data: {
        ...response,
        accessToken: jwt.sign({ ...response }, process.env.JWT_SECRET_KEY || '', { expiresIn: '1d' }),
        refreshToken: jwt.sign({}, process.env.JWT_SECRET_KEY || '', { expiresIn: '30d' }),
      },
    })
  } catch (e) {
    if (e instanceof PrismaClientValidationError || e instanceof PrismaClientKnownRequestError) {
      return NextResponse.json({ message: e.message.replaceAll('\n', '') }, { status: 500 })
    }
  }

  return NextResponse.json({ message: 'internal server error' }, { status: 500 })
}
