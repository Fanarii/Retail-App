/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
'use client'
import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import toRupiah from '@/lib/toRupiah'
import { CircleMinus } from 'lucide-react'

import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '@/features/productSlice'
import { type RootState } from '@/features/store'

interface ProductInterface {
  id: number
  name: string
  price: number
  marketPrice: number | null
  lisenceId: number | null
  quantity: number
  lisence: {
    id: number
    name: string
    price: number
  }
}

interface ItemInterface {
  name: string
  marketPrice: number
  quantity: number
}

const Home = (): React.JSX.Element => {
  const [items, setItems] = useState<ItemInterface[]>([])

  const dispatch = useDispatch()
  const products = useSelector((state: RootState) => state.products)

  useEffect(() => {
    dispatch(fetchProducts() as any)
  }, [dispatch])

  const addItem = (product: ProductInterface): void => {
    const existingItem = items.find((item) => item.name === product.name)
    if (existingItem != null) {
      const updatedItems = items.map((item) =>
        item.name === product.name ? { ...item, quantity: item.quantity + 1 } : item
      )
      setItems(updatedItems)
    } else {
      const newItem: ItemInterface = {
        name: product.name,
        marketPrice: product.marketPrice ?? 0,
        quantity: 1
      }
      setItems([...items, newItem])
    }
  }

  const getTotalAmount = (): number => {
    return items.reduce((total, item) => total + item.marketPrice * item.quantity, 0)
  }

  const removeItem = (itemName: string): void => {
    const updatedItems = items.map((item) =>
      item.name === itemName && item.quantity >= 1 ? { ...item, quantity: item.quantity - 1 } : item
    ).filter((item) => item.quantity > 0)
    setItems(updatedItems)
  }

  const handleCharge = (): void => {
    alert(`Total Amount: ${toRupiah(getTotalAmount())}`)
    setItems([])
  }

  return (
    <div className='m-3 flex justify-center'>
      <div className='w-[70%] bg-white'>
        <div className='m-3 grid grid-cols-4 overflow-y-scroll gap-4'>
          {products.loading && products.products.length < 1
            ? (
            <div className='text-black'>Loading....</div>
              )
            : ''}
          {products.products.map((product) => (
            <div key={product.id} className='h-32 w-44 flex flex-col justify-center items-center bg-blue-600 text-sm rounded-md'>
              <p>{product.name}</p>
              <p>{toRupiah(product.marketPrice ?? 0)}</p>
              <Button className='m-1' onClick={() => addItem(product)}>Add</Button>
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
              <Button onClick={() => removeItem(item.name)} className='m-2'><CircleMinus /></Button>
            </div>
          ))}
          {items.length > 0 ? <Button className='m-2' onClick={() => handleCharge()}>Charge</Button> : null}
      </div>
    </div>
  )
}

export default Home
