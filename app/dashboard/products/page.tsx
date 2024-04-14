/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/no-misused-promises */
'use client'

import React, { useEffect } from 'react'
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
// import { AddProduct } from './addProduct'
import { DeleteButton } from '@/components/buttons/delete-button'
// import { EditProduct } from './editProduct'
import toRupiah from '@/lib/toRupiah'
import { useDispatch, useSelector } from 'react-redux'
import { type RootState } from '@/features/store'
import { fetchProducts } from '@/features/productSlice'

const Products = (): React.JSX.Element => {
  const dispatch = useDispatch()
  const products = useSelector((state: RootState) => state.products)

  useEffect(() => {
    dispatch(fetchProducts() as any)
  }, [dispatch])

  const deleteProduct = async (id: number): Promise<void> => {
    await axios.delete(`/api/products/${id}`)
  }

  return (
        <div className='m-4'>
            {/* <AddProduct /> */}
            <Table>
                <TableCaption>A list of your products.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">No</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Market Price</TableHead>
                        <TableHead>Qty.</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {products.products.map((product, index) => (
                        <TableRow key={product.id}>
                            <TableCell className="font-medium">{index + 1}</TableCell>
                            <TableCell>{product.name}</TableCell>
                            <TableCell>{toRupiah(product.price)}</TableCell>
                            <TableCell>{toRupiah(product.marketPrice ?? 0)}</TableCell>
                            <TableCell>{product.quantity}</TableCell>
                            <TableCell className='text-right'>
                              <DeleteButton onClick={() => deleteProduct(product.id)} />
                              {/* <EditProduct fetchData={fetchData} id={product.id}/> */}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
  )
}

export default Products
