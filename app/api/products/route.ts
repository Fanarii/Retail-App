import { NextResponse } from 'next/server'
import db from '@/lib/db'

const prisma = db

export const GET = async (): Promise<NextResponse> => {
  const response = await prisma.product.findMany()
  return NextResponse.json(response)
}
