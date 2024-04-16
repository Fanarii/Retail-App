/* eslint-disable @typescript-eslint/no-misused-promises */

'use client'
import React, { useEffect, useState } from 'react'
import toRupiah from '@/lib/toRupiah'
import { CircleMinus } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { addItem, removeItem, removeAllItems } from '@/features/cartSlice'
import { fetchProducts } from '@/features/productSlice'
import { type RootState } from '@/features/store'
import type { ProductInterface } from '@/interfaces'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import axios from 'axios'

const Home = (): React.JSX.Element => {
  const [paymentAmount, setPaymentAmount] = useState<number>(0)
  const dispatch = useDispatch()
  const products = useSelector((state: RootState) => state.products)
  const items = useSelector((state: RootState) => state.cart.items)

  useEffect(() => {
    dispatch(fetchProducts() as any)
  }, [dispatch])

  const handleAdd = (product: ProductInterface): void => {
    dispatch(addItem(product))
  }

  const handleRemove = (itemName: string): void => {
    dispatch(removeItem(itemName))
  }

  const handleCharge = async (): Promise<void> => {
    const totalAmount = getTotalAmount()
    const change = paymentAmount - totalAmount

    if (paymentAmount >= totalAmount) {
      await axios.post('/api/history', {
        items,
        pay: paymentAmount,
        totalAmount,
        change
      })
      dispatch(removeAllItems())
      dispatch(fetchProducts() as any)
    } else {
      alert('Payment Failed')
    }
  }

  const getTotalAmount = (): number => {
    return items.reduce((total, item) => total + item.marketPrice * item.quantity, 0)
  }

  return (
    <div className='dark:bg-gray-800'>
      <div className='flex justify-center items-center h-[100vh] bg-gray-200 dark:bg-gray-800'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-5 md:p-5 w-full max-w-6xl'>
          <div className='bg-white rounded-md shadow-md p-5 md:col-span-2 items-center justify-center dark:bg-gray-700'>
            <div className='grid md:grid-cols-4 grid-cols-2 sm:grid-cols-4 gap-4'>
              {products.loading && products.products.length < 1
                ? (
                <div className='text-black dark:text-white'>Loading....</div>
                  )
                : (
                    products.products.map((product) => (
                  <div
                    key={product.id}
                    className='h-32 w-44 flex flex-col justify-center items-center bg-gray-200 text-sm rounded-md dark:bg-gray-600 dark:text-white'
                  >
                    <p>{product.name}</p>
                    <p>{toRupiah(product.marketPrice ?? 0)}</p>
                    <p>Stock: {product.stock}</p>
                    <Button onClick={() => { handleAdd(product) }}>Add</Button>
                  </div>
                    ))
                  )}
            </div>
          </div>
          <div className='bg-white rounded-md shadow-md p-5 dark:bg-gray-700'>
            <div className='flex items-center justify-center'>
              <p className='text-lg font-semibold dark:text-white'>Cashier</p>
            </div>
            <div className='p-3'>
              {items.length > 0
                ? (
                <>
                  {items.map((item, index) => (
                    <div key={index} className='flex justify-between items-center border-b border-gray-300 p-2'>
                      <div>
                        <p className='text-sm font-semibold text-slate-700 dark:text-white'>{item.name}</p>
                        <p className='text-xs text-gray-500 dark:text-gray-300'>Price: {toRupiah(item.marketPrice)}</p>
                        <p className='text-xs text-gray-500 dark:text-gray-300'>Quantity: {item.quantity}</p>
                      </div>
                      <Button onClick={() => { handleRemove(item.name) }}>
                        <CircleMinus />
                      </Button>
                    </div>
                  ))}
                  <div className='flex flex-col items-center space-x-2 mt-3 gap-2'>
                    <Input className='w-full' type='number' placeholder='Payment amount' onChange={(e) => { setPaymentAmount(Number(e.target.value)) }} />
                    <Button className='w-full' onClick={handleCharge}>Charge {toRupiah(getTotalAmount())}</Button>
                  </div>
                </>
                  )
                : (
                <p className='text-sm text-gray-500 dark:text-gray-300'>Your cart is empty.</p>
                  )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
