import { NextResponse } from 'next/server'
import db from '../../../../lib/db'

const prisma = db

// get product by id
export const GET = async (req: Request, { params }: { params: { id: string } }): Promise<NextResponse> => {
  const response = await prisma.product.findUnique({
    where: { id: Number(params.id) }
  })

  return NextResponse.json(response)
}

// edit product by id
export const PATCH = async (req: Request, { params }: { params: { id: string } }): Promise<NextResponse> => {
  const body = await req.json()
  try {
    const product = await prisma.product.findUnique({
      where: { id: Number(params.id) }
    })

    if (product == null) return NextResponse.json({ msg: 'Product not found' }, { status: 404 })

    const updatedProduct = await prisma.product.update({
      where: { id: Number(product.id) },
      data: {
        name: body.name,
        price: body.price,
        quantity: body.quantity,
        stock: body.stock
      }
    })

    return NextResponse.json(updatedProduct)
  } catch (error) {
    return NextResponse.json({ msg: error }, { status: 505 })
  }
}

// delete product
export const DELETE = async (req: Request, { params }: { params: { id: string } }): Promise<NextResponse> => {
  try {
    const response = await prisma.product.delete({
      where: { id: Number(params.id) }
    })
    return NextResponse.json(response, { status: 200 })
  } catch (error) {
    return NextResponse.json({ msg: error }, { status: 500 })
  }
}
