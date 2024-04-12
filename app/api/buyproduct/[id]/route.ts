// import db from '@/lib/db'
// import { NextResponse } from 'next/server'

// const prisma = db

// export const PATCH = async ({ params }: { params: { id: string } }): Promise<NextResponse> => {
//   try {
//     const id = params.id
//     const lisence = await prisma.lisence.findUnique({
//       where: { id: Number(id) }
//     })

//     if (lisence == null) return NextResponse.json({ msg: 'Lisence not found' }, { status: 404 })

//     const response = await prisma.lisence.update({
//       where: { id: Number(id) },
//       data: {
//         users: { connect: }
//       }
//     })

//     return NextResponse.json(response)
//   } catch (error) {

//   }
// }
