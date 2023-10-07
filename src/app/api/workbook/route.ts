import { PrismaClientKnownRequestError, PrismaClientValidationError } from '@/generated/prisma/runtime/library'
import { PrismaClient } from '@prisma'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const prisma = new PrismaClient()
  const { searchParams } = new URL(request.url)
  const { userId, workbookId, keyword, take = 10, cursorId } = Object.fromEntries(searchParams.entries())

  try {
    if (workbookId) {
      const data = await prisma.workbook.findUnique({
        where: {
          id: workbookId,
        },
        include: {
          questions: {
            select: {
              id: true,
              title: true,
              answer: true,
            },
          },
        },
      })

      return NextResponse.json({ data }, { status: 200 })
    }

    const data = await prisma.workbook.findMany({
      take: Number(take),
      skip: cursorId ? 1 : 0,
      ...(cursorId && { cursor: { id: cursorId } }),
      where: {
        userId,
        ...(keyword && {
          title: {
            contains: keyword,
          },
        }),
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json({ data }, { status: 200 })
  } catch (e) {
    if (e instanceof PrismaClientValidationError || e instanceof PrismaClientKnownRequestError) {
      return NextResponse.json({ message: e.message.replaceAll('\n', '') }, { status: 500 })
    }
  }

  return NextResponse.json({ message: 'internal server error' }, { status: 500 })
}

export async function POST(request: Request) {
  const prisma = new PrismaClient()
  const data = await request.json()

  try {
    await prisma.workbook.create({
      data,
    })

    return NextResponse.json({ message: 'workbook create success' }, { status: 200 })
  } catch (e) {
    if (e instanceof PrismaClientValidationError || e instanceof PrismaClientKnownRequestError) {
      return NextResponse.json({ message: e.message.replaceAll('\n', '') }, { status: 500 })
    }
  }

  return NextResponse.json({ message: 'internal server error' }, { status: 500 })
}

export async function PUT(request: Request) {
  const prisma = new PrismaClient()
  const { id, title } = await request.json()

  try {
    await prisma.workbook.update({
      where: {
        id,
      },
      data: {
        title,
      },
    })

    return NextResponse.json({ message: 'workbook change success' }, { status: 200 })
  } catch (e) {
    if (e instanceof PrismaClientValidationError || e instanceof PrismaClientKnownRequestError) {
      return NextResponse.json({ message: e.message.replaceAll('\n', '') }, { status: 500 })
    }
  }

  return NextResponse.json({ message: 'internal server error' }, { status: 500 })
}

export async function DELETE(request: Request) {
  const prisma = new PrismaClient()
  const { id } = await request.json()

  try {
    await prisma.workbook.delete({
      where: {
        id,
      },
    })

    return NextResponse.json({ message: 'workbook delete success' }, { status: 200 })
  } catch (e) {
    if (e instanceof PrismaClientValidationError || e instanceof PrismaClientKnownRequestError) {
      return NextResponse.json({ message: e.message.replaceAll('\n', '') }, { status: 500 })
    }
  }

  return NextResponse.json({ message: 'internal server error' }, { status: 500 })
}
