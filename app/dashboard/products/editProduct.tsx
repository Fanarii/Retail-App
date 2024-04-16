/* eslint-disable @typescript-eslint/no-misused-promises */
'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import DialogForm from '@/components/dialog/dialog-form'
import DialogField from '@/components/dialog/dialog-field'
import DialogSubmit from '@/components/dialog/dialog-submit'
import { useDispatch, useSelector } from 'react-redux'
import { type RootState } from '@/features/store'

interface addProductProps {
  id: number
}

export function EditProduct ({ id }: addProductProps): React.JSX.Element {
  const [name, setName] = useState<string>('')
  const [price, setPrice] = useState<number>(0)
  const [quantity, setQuantity] = useState<number>(0)
  const [marketPrice, setMarketPrice] = useState<number>(0)
  const [stock, setStock] = useState<number>(0)

  const dispatch = useDispatch()
  const products = useSelector((state: RootState) => state.products.products)

  const initialData = (): void => {
    const response = products.find((product => product.id === id))
    if (response != null) {
      const { name, price, marketPrice, quantity, stock } = response
      setName(name)
      setPrice(price)
      setMarketPrice(marketPrice ?? 0)
      setQuantity(quantity)
      setStock(stock)
    }
  }

  const handlePriceChange = (value: string): void => {
    setPrice(Number(value))
  }

  const handleQuantityChange = (value: string): void => {
    setQuantity(Number(value))
  }

  const handleMarketPriceChange = (value: string): void => {
    setMarketPrice(Number(value))
  }

  const handleStockChange = (value: string): void => {
    setStock(Number(value))
  }

  const postData = async (): Promise<void> => {
    try {
      await axios.patch(`/api/products/${id}`, {
        name,
        price,
        marketPrice,
        quantity,
        stock
      })
    } catch (error) {
      console.error('Failed to add product:', error)
      throw error
    }
  }

  useEffect(() => {
    initialData()
  }, [dispatch])

  return (
    <DialogForm
      title='Edit Product'
      buttonText='Edit'
      description='Edit your product on your table. Click save when you&apos;re done.'
      saveButton={postData}
    >
      <DialogField label='name' placeholder='Indomie' onChange={setName} isNumber={false} defaultValue={name} />
      <DialogField label='price' placeholder='66000' onChange={handlePriceChange} isNumber={true} defaultValue={price} />
      <DialogField label='marketPrice' placeholder='2400' onChange={handleMarketPriceChange} isNumber={true} defaultValue={marketPrice} />
      <DialogField label='quantity' placeholder='1' onChange={handleQuantityChange} isNumber={true} defaultValue={quantity} />
      <DialogField label='stock' placeholder='1' onChange={handleStockChange} isNumber={true} defaultValue={stock} />
      <DialogSubmit text='Save' onClick={postData} />
    </DialogForm>
  )
}
