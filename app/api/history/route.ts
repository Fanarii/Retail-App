import db from '@/lib/db'
import { NextResponse } from 'next/server'

const prisma = db

// create history
export const POST = async (req: Request, { params }: { params: { id: number } }): Promise<NextResponse> => {
  const body = await req.json()
  try {
    for (const item of body.items) {
      const product = await prisma.product.findUnique({ where: { name: item.name } })
      if (product == null) {
        return NextResponse.json({ msg: `Product '${item.name}' not found.` }, { status: 404 })
      }

      if (product.stock < item.quantity) {
        return NextResponse.json({ msg: `Insufficient stock for product '${item.name}'.` }, { status: 400 })
      }
    }

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

    for (const item of body.items) {
      await prisma.product.update({
        where: { name: item.name },
        data: { stock: { decrement: item.quantity } }
      })
    }

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
