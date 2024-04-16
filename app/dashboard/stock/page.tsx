/* eslint-disable @typescript-eslint/no-misused-promises */
'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { fetchHistory } from '@/features/historySlice'
import { fetchProducts } from '@/features/productSlice'
import { type RootState } from '@/features/store'
import { type ProductInterface, type HistoryInterface } from '@/interfaces'
import toRupiah from '@/lib/toRupiah'
import axios from 'axios'
import { PlusCircle } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Stock = (): React.JSX.Element => {
  const dispatch = useDispatch()
  const history = useSelector((state: RootState) => state.history.history)
  const products = useSelector((state: RootState) => state.products.products)
  const [totalSales, setTotalSales] = useState<number>(0)
  const [stockToAdd, setStockToAdd] = useState<number>(0)

  useEffect(() => {
    dispatch(fetchHistory() as any)
    calculateTotalSales()
  }, [dispatch])

  const calculateTotalSales = (): void => {
    if (history.length > 0) {
      const total = history.reduce((acc: number, curr: HistoryInterface) => {
        return acc + curr.totalAmount
      }, 0)
      setTotalSales(total)
    } else {
      setTotalSales(0)
    }
  }

  const handleAddStock = async (product: ProductInterface): Promise<void> => {
    await axios.patch(`/api/products/${product.id}`, { stock: stockToAdd })
    dispatch(fetchProducts() as any)
    setStockToAdd(0)
  }

  return (
    <div className='dark:bg-gray-800'>
      <div className='flex justify-center items-center h-[100vh] bg-gray-200 dark:bg-gray-800 dark:text-white'>
        <div className='grid md:grid-cols-3 gap-5 p-5 w-full max-w-6xl'>
          <div className='bg-white rounded-md shadow-md p-5 flex flex-col items-center dark:bg-gray-700'>
            <div className='flex items-center justify-center'>
              <p className='text-lg font-semibold'>Income</p>
            </div>
            <div className='p-3'>
              <p className='text-xl font-bold'>{toRupiah(totalSales)}</p>
              <p className='text-sm text-gray-500'>Total Sales Income</p>
            </div>
          </div>
          <div className='bg-white rounded-md shadow-md p-5 dark:bg-gray-700'>
            <div className='flex flex-col justify-between items-center mb-3'>
              <p className='text-lg font-semibold'>Product Stock</p>
            </div>
            <div className='flex flex-col'>
              {products.map((product) => (
                <div key={product.id} className='border border-gray-300 rounded-md p-3 flex justify-between'>
                  <div>
                    <p className='text-sm font-semibold'>{product.name}</p>
                    <p className='text-xs text-gray-500'>Stock: {product.stock}</p>
                  </div>
                  <div className='flex items-center space-x-2 w-40'>
                    <Input className='bg-white dark:bg-gray-600' type="number" placeholder="Stock" defaultValue={product.stock} onChange={(e) => { setStockToAdd(parseInt(e.target.value, 10)) }} />
                    <Button type="submit" onClick={async () => { await handleAddStock(product) }}><PlusCircle /></Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className='bg-white rounded-md shadow-md p-5 dark:bg-gray-700'>
            <div className='flex items-center justify-center'>
              <p className='text-lg font-semibold'>Analytics</p>
            </div>
            <div className='p-3'>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Stock
