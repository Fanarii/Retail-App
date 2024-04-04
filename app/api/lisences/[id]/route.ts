import { NextResponse } from 'next/server'
import db from '@/lib/db'

const prisma = db

// get lisence by id
export const GET = async (req: Request, { params }: { params: { id: string } }): Promise<NextResponse> => {
  const response = await prisma.lisence.findUnique({
    where: { id: Number(params.id) }
  })

  return NextResponse.json(response)
}

// update lisence
export const PATCH = async (req: Request, { params }: { params: { id: string } }): Promise<NextResponse> => {
  const body = await req.json()

  const response = await prisma.lisence.update({
    where: { id: Number(params.id) },
    data: {
      name: body.name,
      price: body.price
    }
  })

  return NextResponse.json(response)
}

// delete lisence
export const DELETE = async (req: Request, { params }: { params: { id: string } }): Promise<NextResponse> => {
  try {
    const response = await prisma.lisence.delete({ where: { id: Number(params.id) } })
    return NextResponse.json(response)
  } catch (error) {
    console.log(error)
    return NextResponse.json(error)
  }
}
