import db from '@/lib/db'
import { NextResponse } from 'next/server'

const prisma = db

// get history by id
export const GET = async (req: Request, { params }: { params: { id: number } }): Promise<NextResponse> => {
  try {
    const response = await prisma.history.findUnique({
      where: { id: Number(params.id) },
      include: { items: true }
    })

    return NextResponse.json(response)
  } catch (error) {
    return NextResponse.json({ msg: error }, { status: 500 })
  }
}

// delete history
export const DELETE = async (req: Request, { params }: { params: { id: number } }): Promise<NextResponse> => {
  try {
    const response = await prisma.history.delete({
      where: { id: Number(params.id) }
    })

    return NextResponse.json(response)
  } catch (error) {
    return NextResponse.json({ msg: error }, { status: 500 })
  }
}
