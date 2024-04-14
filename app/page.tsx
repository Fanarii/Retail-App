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
    } else {
      alert('Payment Failed')
    }
  }

  const getTotalAmount = (): number => {
    return items.reduce((total, item) => total + item.marketPrice * item.quantity, 0)
  }

  return (
    <div className='m-3 flex justify-center'>
      <div className='w-[70%] bg-white'>
        <div className='m-3 grid grid-cols-4 overflow-y-scroll gap-4'>
          {products.loading && products.products.length < 1
            ? (
            <div className='text-black'>Loading....</div>
              )
            : (
                ''
              )}
          {products.products.map((product) => (
            <div key={product.id} className='h-32 w-44 flex flex-col justify-center items-center bg-blue-600 text-sm rounded-md'>
              <p>{product.name}</p>
              <p>{toRupiah(product.marketPrice ?? 0)}</p>
              <Button className='m-1' onClick={() => { handleAdd(product) }}>
                Add
              </Button>
            </div>
          ))}
        </div>
      </div>
      <div className='bg-slate-400 w-72 ml-3 rounded-md'>
        {items.map((item, index) => (
          <div key={index} className='m-2 bg-black rounded-md justify-between flex gap-1 '>
            <div className='m-2 flex flex-col justify-center'>
              <p>{item.name}</p>
              <p>{toRupiah(item.marketPrice * item.quantity)}</p>
              <p>{item.quantity}</p>
            </div>
            <Button onClick={() => { handleRemove(item.name) }} className='m-2'>
              <CircleMinus />
            </Button>
          </div>
        ))}
        {items.length > 0
          ? (
          <div className='flex items-center space-x-2 m-2'>
            <Input type='number' placeholder='Payment amount' onChange={(e) => { setPaymentAmount(Number(e.target.value)) }} />
            <Button type='submit' onClick={async () => { await handleCharge() }}>
              Charge
            </Button>
          </div>
            )
          : null}
      </div>
    </div>
  )
}

export default Home
