import db from '@/lib/db'
import { NextResponse } from 'next/server'

const prisma = db

// create history
export const POST = async (req: Request, { params }: { params: { id: number } }): Promise<NextResponse> => {
  const body = await req.json()
  try {
    const history = await prisma.history.create({
      data: {
        pay: body.pay,
        totalAmount: body.totalAmount,
        change: body.change,
        items: {
          create: body.items.map((item: { name: string, quantity: number, marketPrice: number }) => ({
            name: item.name,
            quantity: item.quantity,
            price: item.marketPrice
          }))
        }
      }
    })

    return NextResponse.json(history)
  } catch (error) {
    return NextResponse.json({ msg: error }, { status: 500 })
  }
}

// get all history
export const GET = async (): Promise<NextResponse> => {
  try {
    const response = await prisma.history.findMany({
      include: { items: true }
    })
    return NextResponse.json(response)
  } catch (error) {
    return NextResponse.json({ msg: error }, { status: 500 })
  }
}
