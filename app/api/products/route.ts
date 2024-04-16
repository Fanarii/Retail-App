import { NextResponse } from 'next/server'
import db from '@/lib/db'

const prisma = db

// get all product
export const GET = async (): Promise<NextResponse> => {
  const response = await prisma.product.findMany()
  return NextResponse.json(response)
}

// create a product
export const POST = async (req: Request): Promise<NextResponse> => {
  const body = await req.json()
  try {
    const response = await prisma.product.create({
      data: {
        name: body.name,
        price: body.price,
        marketPrice: body.marketPrice,
        quantity: body.quantity,
        stock: body.stock
      }
    })

    return NextResponse.json(response)
  } catch (error) {
    return NextResponse.json({ msg: error }, { status: 500 })
  }
}
