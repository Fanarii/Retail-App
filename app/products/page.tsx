'use client'
import React, { useEffect, useState } from 'react'
import type { Product } from '@prisma/client'
import axios from 'axios'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

const Products = (): React.JSX.Element => {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const data = await getProducts()
      setProducts(data)
    }

    void fetchData()
  }, [])

  const getProducts = async (): Promise<Product[]> => {
    const response = await axios.get<Product[]>('/api/products')
    return response.data
  }

  return (
        <div className='m-4'>
            <Table>
                <TableCaption>A list of your products.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">No</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Lisence</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {products.map((product, index) => (
                        <TableRow key={product.id}>
                            <TableCell className="font-medium">{index + 1}</TableCell>
                            <TableCell>{product.name}</TableCell>
                            <TableCell>{product.lisenceId}</TableCell>
                            <TableCell className="text-right">{product.price}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
  )
}

export default Products
