import { PrismaClientKnownRequestError, PrismaClientValidationError } from '@/generated/prisma/runtime/library'
import { PrismaClient } from '@prisma'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const prisma = new PrismaClient()
  const data = await request.json()

  try {
    await prisma.question.create({
      data,
    })
  } catch (e) {
    if (e instanceof PrismaClientValidationError || e instanceof PrismaClientKnownRequestError) {
      return NextResponse.json({ message: e.message.replaceAll('\n', '') }, { status: 500 })
    }
  }

  return NextResponse.json({ message: 'create success' }, { status: 200 })
}

export async function PATCH(request: Request) {
  const prisma = new PrismaClient()
  const { id, title, answer } = await request.json()

  try {
    await prisma.question.update({
      where: {
        id,
      },
      data: {
        title,
        answer,
      },
    })
  } catch (e) {
    if (e instanceof PrismaClientValidationError || e instanceof PrismaClientKnownRequestError) {
      return NextResponse.json({ message: e.message.replaceAll('\n', '') }, { status: 500 })
    }
  }

  return NextResponse.json({ message: 'update success' }, { status: 200 })
}

export async function DELETE(request: Request) {
  const prisma = new PrismaClient()
  const { id } = await request.json()

  try {
    await prisma.question.delete({
      where: {
        id,
      },
    })
  } catch (e) {
    if (e instanceof PrismaClientValidationError || e instanceof PrismaClientKnownRequestError) {
      return NextResponse.json({ message: e.message.replaceAll('\n', '') }, { status: 500 })
    }
  }

  return NextResponse.json({ message: 'delete success' }, { status: 200 })
}
