import { NextResponse } from 'next/server'
import db from '@/lib/db'

const prisma = db

// get all lisences
export const GET = async (): Promise<NextResponse> => {
  const response = await prisma.lisence.findMany()
  return NextResponse.json(response)
}

// create lisence
export const POST = async (req: Request): Promise<NextResponse> => {
  const body = await req.json()
  try {
    const response = await prisma.lisence.create({
      data: {
        name: body.name,
        price: body.price
      }
    })

    return NextResponse.json(response)
  } catch (error) {
    return NextResponse.json(error)
  }
}
